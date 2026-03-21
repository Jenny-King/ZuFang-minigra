const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { initAutomator } = require('./base');
const TEST_SCRIPTS_ROOT = path.resolve(__dirname, '..');

const WINDOW_CAPTURE_DELAY_MS = Number(process.env.WINDOW_CAPTURE_DELAY_MS || 1500);
const WINDOW_CAPTURE_TIMEOUT_MS = Number(process.env.WINDOW_CAPTURE_TIMEOUT_MS || 30000);
const SIMULATOR_TITLEBAR_CROP_PX = Number(process.env.SIMULATOR_TITLEBAR_CROP_PX || 24);

function escapeForPowerShell(value) {
  return String(value).replace(/'/g, "''");
}

function runPowerShell(command, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      command
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    });

    let stdout = '';
    let stderr = '';
    let settled = false;
    let timeoutId = null;

    function finish(error) {
      if (settled) {
        return;
      }
      settled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }

      resolve({ stdout, stderr });
    }

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', (error) => finish(error));
    child.on('close', (code) => {
      if (code === 0) {
        finish(null);
        return;
      }
      finish(new Error(`PowerShell command exited with code ${code}`));
    });

    timeoutId = setTimeout(() => {
      try {
        child.kill();
      } catch {
        // Ignore kill failures during timeout cleanup.
      }
      finish(new Error(`PowerShell command timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

function buildOutputPath(sceneName, shotLabel = '') {
  const outputsDir = path.join(TEST_SCRIPTS_ROOT, 'outputs', sceneName);
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const normalizedLabel = String(shotLabel || '').trim().replace(/[^\w-]+/g, '-');
  const screenshotName = normalizedLabel ? `${timestamp}-${normalizedLabel}.png` : `${timestamp}.png`;
  return path.join(outputsDir, screenshotName);
}

async function captureSimulatorWindow(options = {}) {
  const projectName = String(options.projectName || path.basename(process.cwd())).trim();
  const outputPath = options.outputPath;
  const captureDelayMs = Number(options.captureDelayMs || WINDOW_CAPTURE_DELAY_MS);
  const cropTop = Math.max(0, Number(options.cropTop ?? SIMULATOR_TITLEBAR_CROP_PX) || 0);
  const exactTitle = String(process.env.WECHAT_DEVTOOLS_SIMULATOR_TITLE || `${projectName}的模拟器`).trim();
  const titleFilter = exactTitle
    ? `($_.MainWindowTitle -eq '${escapeForPowerShell(exactTitle)}')`
    : `($_.MainWindowTitle -like '*${escapeForPowerShell(projectName)}*' -and $_.MainWindowTitle -like '*模拟器*')`;

  const command = `
Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public struct RECT {
  public int Left;
  public int Top;
  public int Right;
  public int Bottom;
}
public struct POINT {
  public int X;
  public int Y;
}
public static class Win32 {
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")]
  public static extern bool GetClientRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")]
  public static extern bool ClientToScreen(IntPtr hWnd, ref POINT point);
}
'@

$outputPath = '${escapeForPowerShell(outputPath)}'
$delayMs = ${captureDelayMs}
$cropTop = ${cropTop}
$window = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ${titleFilter}
} | Sort-Object StartTime -Descending | Select-Object -First 1

if (-not $window) {
  $window = Get-Process | Where-Object {
    $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like '*模拟器*'
  } | Sort-Object StartTime -Descending | Select-Object -First 1
}

if (-not $window) {
  throw '未找到独立模拟器窗口'
}

[void][Win32]::ShowWindowAsync($window.MainWindowHandle, 3)
[void][Win32]::SetForegroundWindow($window.MainWindowHandle)
Start-Sleep -Milliseconds $delayMs

$rect = New-Object RECT
$ok = [Win32]::GetClientRect($window.MainWindowHandle, [ref]$rect)
if (-not $ok) {
  throw "读取模拟器 client 区域失败: $($window.MainWindowTitle)"
}

$origin = New-Object POINT
$origin.X = 0
$origin.Y = 0
$ok = [Win32]::ClientToScreen($window.MainWindowHandle, [ref]$origin)
if (-not $ok) {
  throw "读取模拟器 client 原点失败: $($window.MainWindowTitle)"
}

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top
if ($cropTop -gt 0 -and $cropTop -lt $height) {
  $origin.Y = $origin.Y + $cropTop
  $height = $height - $cropTop
}
if ($width -le 0 -or $height -le 0) {
  throw "模拟器 client 尺寸异常: $($width)x$($height)"
}

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($origin.X, $origin.Y, 0, 0, $bitmap.Size)
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
`;

  await runPowerShell(command, WINDOW_CAPTURE_TIMEOUT_MS);
  const fileStat = fs.statSync(outputPath);
  if (!fileStat.size) {
    throw new Error(`模拟器截图写入失败: ${outputPath}`);
  }

  return outputPath;
}

async function takeSimulatorScreen(sceneName, shotLabel = '') {
  const outputPath = buildOutputPath(sceneName, shotLabel);
  const resultPath = await captureSimulatorWindow({
    projectName: path.basename(process.cwd()),
    outputPath
  });

  const fileStat = fs.statSync(resultPath);
  console.log(
    `[Simulator-Capture] [v] ${sceneName}/${path.basename(resultPath)} 模拟器截图完毕 (${fileStat.size} bytes)`
  );
  return resultPath;
}

module.exports = {
  initAutomator,
  takeSimulatorScreen
};
