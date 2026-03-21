const fs = require("fs");
const path = require("path");

const {
  escapeForPowerShell,
  initAutomator,
  runPowerShell
} = require("./base");

const OUTPUT_ROOT = path.resolve(__dirname, "..", "outputs");

function buildOutputPath(sceneName, shotLabel = "", extension = "png") {
  const safeSceneName = String(sceneName || "ui-unknown").trim() || "ui-unknown";
  const safeShotLabel = String(shotLabel || "").trim();
  const sceneDir = path.join(OUTPUT_ROOT, safeSceneName);
  fs.mkdirSync(sceneDir, { recursive: true });

  const fileName = safeShotLabel
    ? `${Date.now()}-${safeShotLabel}.${extension}`
    : `${Date.now()}.${extension}`;

  return path.join(sceneDir, fileName);
}

async function captureSimulatorWindow(options = {}) {
  const projectName = path.basename(path.resolve(process.cwd()));
  const outputPath = options.outputPath || buildOutputPath(options.sceneName, options.shotLabel);
  const exactTitle = String(process.env.WECHAT_DEVTOOLS_SIMULATOR_TITLE || "").trim();
  const candidateTitles = [
    exactTitle,
    `${projectName}的模拟器`,
    projectName
  ].filter(Boolean);

  const titleLiterals = candidateTitles
    .map((item) => `'${escapeForPowerShell(item)}'`)
    .join(", ");

  const command = `
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class NativeMethods {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT {
    public int Left;
    public int Top;
    public int Right;
    public int Bottom;
  }

  [StructLayout(LayoutKind.Sequential)]
  public struct POINT {
    public int X;
    public int Y;
  }

  [DllImport("user32.dll")]
  public static extern bool GetClientRect(IntPtr hWnd, out RECT rect);

  [DllImport("user32.dll")]
  public static extern bool ClientToScreen(IntPtr hWnd, ref POINT point);
}
"@

$candidateTitles = @(${titleLiterals})
$processes = Get-Process | Where-Object { $_.MainWindowHandle -ne 0 -and -not [string]::IsNullOrWhiteSpace($_.MainWindowTitle) }
$window = $null

foreach ($title in $candidateTitles) {
  if ([string]::IsNullOrWhiteSpace($title)) { continue }
  $window = $processes | Where-Object { $_.MainWindowTitle -eq $title } | Select-Object -First 1
  if ($window) { break }
}

if (-not $window) {
  foreach ($title in $candidateTitles) {
    if ([string]::IsNullOrWhiteSpace($title)) { continue }
    $window = $processes | Where-Object { $_.MainWindowTitle -like "*$title*" -and $_.MainWindowTitle -like "*模拟器*" } | Select-Object -First 1
    if ($window) { break }
  }
}

if (-not $window) {
  $window = $processes |
    Where-Object { $_.MainWindowTitle -like "*模拟器*" } |
    Sort-Object @{ Expression = { $_.MainWindowTitle.Length } } -Descending |
    Select-Object -First 1
}

if (-not $window) {
  throw "未找到独立模拟器窗口，请先在微信开发者工具中开启独立模拟器窗口。"
}

$rect = New-Object NativeMethods+RECT
[void][NativeMethods]::GetClientRect($window.MainWindowHandle, [ref]$rect)
$origin = New-Object NativeMethods+POINT
[void][NativeMethods]::ClientToScreen($window.MainWindowHandle, [ref]$origin)

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top

if ($width -le 0 -or $height -le 0) {
  throw "独立模拟器窗口尺寸无效，无法截图。"
}

$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($origin.X, $origin.Y, 0, 0, $bitmap.Size)
$bitmap.Save('${escapeForPowerShell(outputPath)}', [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
Write-Output $window.MainWindowTitle
`;

  let result;
  try {
    result = await runPowerShell(command, Number(process.env.UI_WINDOW_CAPTURE_TIMEOUT_MS || 30000));
  } catch (error) {
    const titlesResult = await runPowerShell(
      "(Get-Process | Where-Object { $_.MainWindowHandle -ne 0 -and -not [string]::IsNullOrWhiteSpace($_.MainWindowTitle) } | Select-Object -ExpandProperty MainWindowTitle) -join \"`n\"",
      5000
    ).catch(() => ({ stdout: "" }));
    const windowTitles = String(titlesResult.stdout || "").trim();
    const details = windowTitles
      ? `当前可见窗口：${windowTitles.replace(/\r?\n/g, " | ")}`
      : "当前未识别到可用窗口标题。";
    throw new Error(`独立模拟器截图失败，请先在微信开发者工具中开启独立模拟器窗口。${details}`);
  }
  const windowTitle = String(result.stdout || "").trim();

  if (!fs.existsSync(outputPath)) {
    throw new Error(`模拟器截图未生成: ${outputPath}`);
  }

  console.log(`[ui-capture] ${windowTitle || "simulator"} -> ${outputPath}`);
  return {
    outputPath,
    windowTitle
  };
}

async function takeSimulatorScreen(sceneName, shotLabel = "") {
  return captureSimulatorWindow({ sceneName, shotLabel });
}

module.exports = {
  buildOutputPath,
  captureSimulatorWindow,
  initAutomator,
  takeSimulatorScreen
};
