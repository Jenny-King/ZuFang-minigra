param(
  [Parameter(Mandatory = $true)]
  [string[]]$FunctionName,
  [string]$EnvId = $env:CLOUDBASE_ENV_ID,
  [string]$CloudFunctionRoot = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Resolve-ProjectRoot {
  return (Split-Path -Parent $PSScriptRoot)
}

function Resolve-CloudFunctionRoot {
  param(
    [string]$ProjectRoot,
    [string]$ConfiguredRoot
  )

  $rootPath = $ConfiguredRoot
  if (-not $rootPath) {
    $projectConfigPath = Join-Path $ProjectRoot "project.config.json"
    if (Test-Path $projectConfigPath) {
      $projectConfig = Get-Content -Raw $projectConfigPath | ConvertFrom-Json
      $rootPath = [string]$projectConfig.cloudfunctionRoot
    }
  }

  if (-not $rootPath) {
    $rootPath = "cloudfunctions"
  }

  if (-not [System.IO.Path]::IsPathRooted($rootPath)) {
    $rootPath = Join-Path $ProjectRoot $rootPath
  }

  return [System.IO.Path]::GetFullPath($rootPath)
}

function Resolve-EnvId {
  param(
    [string]$ProjectRoot,
    [string]$ConfiguredEnvId
  )

  if ($ConfiguredEnvId) {
    return $ConfiguredEnvId.Trim()
  }

  $envConfigPath = Join-Path $ProjectRoot "config/env.js"
  if (-not (Test-Path $envConfigPath)) {
    return ""
  }

  $resolved = node -e "const cfg=require(process.argv[1]); const envId=cfg?.ENV_CONFIG_MAP?.dev?.cloudEnvId || ''; process.stdout.write(String(envId));" $envConfigPath
  return [string]::Join("", $resolved).Trim()
}

function Normalize-FunctionNames {
  param(
    [string[]]$Names
  )

  return @(
    $Names |
      ForEach-Object { [string]$_ } |
      ForEach-Object { $_.Split(",") } |
      ForEach-Object { $_.Trim() } |
      Where-Object { $_ } |
      Select-Object -Unique
  )
}

function New-TempCloudBaseConfig {
  param(
    [string]$EnvIdValue,
    [string]$CloudFunctionRootValue,
    [System.IO.DirectoryInfo[]]$FunctionDirectories
  )

  $tempPath = Join-Path $env:TEMP ("cloudbaserc." + [guid]::NewGuid().ToString("N") + ".json")
  $functionConfigs = @($FunctionDirectories | ForEach-Object {
    @{
      name = $_.Name
      runtime = "Nodejs16.13"
      handler = "index.main"
      installDependency = $true
    }
  })
  $config = @{
    envId = $EnvIdValue
    functionRoot = (Resolve-Path -Relative $CloudFunctionRootValue)
    functions = $functionConfigs
  }

  $json = $config | ConvertTo-Json -Depth 5
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($tempPath, $json, $utf8NoBom)
  return $tempPath
}

function Invoke-TcbCodeUpdateWithRetry {
  param(
    [string]$TcbCommandPath,
    [string[]]$CommandArgs,
    [string]$FunctionNameValue,
    [int]$MaxAttempts = 3
  )

  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
    if ($attempt -gt 1) {
      Write-Host "Retrying $FunctionNameValue ($attempt/$MaxAttempts) after transient failure..."
      Start-Sleep -Seconds 5
    }

    & $TcbCommandPath @CommandArgs
    if ($LASTEXITCODE -eq 0) {
      return
    }

    if ($attempt -eq $MaxAttempts) {
      throw "Cloud function code update failed: $FunctionNameValue"
    }
  }
}

$projectRoot = Resolve-ProjectRoot
$resolvedCloudFunctionRoot = Resolve-CloudFunctionRoot -ProjectRoot $projectRoot -ConfiguredRoot $CloudFunctionRoot
$resolvedEnvId = Resolve-EnvId -ProjectRoot $projectRoot -ConfiguredEnvId $EnvId
$requestedFunctionNames = Normalize-FunctionNames -Names $FunctionName

if (-not (Test-Path $resolvedCloudFunctionRoot)) {
  throw "Cloud function directory not found: $resolvedCloudFunctionRoot"
}

if (-not $resolvedEnvId) {
  throw "Env ID is required. Use -EnvId or set CLOUDBASE_ENV_ID."
}

if (-not $requestedFunctionNames.Count) {
  throw "At least one function name is required."
}

$tcbCommand = Get-Command tcb -ErrorAction SilentlyContinue
if (-not $tcbCommand) {
  throw "tcb CLI not found. Install and log in to CloudBase CLI first."
}

$allFunctionDirectories = Get-ChildItem $resolvedCloudFunctionRoot -Directory | Sort-Object Name
if (-not $allFunctionDirectories.Count) {
  throw "No cloud function directories found: $resolvedCloudFunctionRoot"
}

$functionDirectoryMap = @{}
foreach ($directory in $allFunctionDirectories) {
  $functionDirectoryMap[$directory.Name] = $directory
}

$selectedDirectories = @()
foreach ($name in $requestedFunctionNames) {
  if (-not $functionDirectoryMap.ContainsKey($name)) {
    throw "Cloud function not found: $name"
  }
  $selectedDirectories += $functionDirectoryMap[$name]
}

$tempConfigPath = ""

Write-Host "Project Root : $projectRoot"
Write-Host "Env ID       : $resolvedEnvId"
Write-Host "Function Root: $resolvedCloudFunctionRoot"
Write-Host "CLI          : $($tcbCommand.Source)"
Write-Host "Functions    : $($requestedFunctionNames -join ', ')"

Push-Location $projectRoot
try {
  $tempConfigPath = New-TempCloudBaseConfig -EnvIdValue $resolvedEnvId -CloudFunctionRootValue $resolvedCloudFunctionRoot -FunctionDirectories $selectedDirectories

  foreach ($functionDirectory in $selectedDirectories) {
    $commandArgs = @(
      "--config-file",
      $tempConfigPath,
      "fn",
      "code",
      "update",
      $functionDirectory.Name,
      "--envId",
      $resolvedEnvId
    )

    Write-Host ""
    Write-Host "==> Updating code for $($functionDirectory.Name)"
    Write-Host "tcb $($commandArgs -join ' ')"

    if ($DryRun) {
      continue
    }

    Invoke-TcbCodeUpdateWithRetry `
      -TcbCommandPath $tcbCommand.Source `
      -CommandArgs $commandArgs `
      -FunctionNameValue $functionDirectory.Name
  }
}
finally {
  Pop-Location
  if ($tempConfigPath -and (Test-Path $tempConfigPath)) {
    Remove-Item $tempConfigPath -Force -ErrorAction SilentlyContinue
  }
}

Write-Host ""
Write-Host "Selected cloud function code updates completed successfully."
