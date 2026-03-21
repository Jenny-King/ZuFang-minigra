const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { initAutomator } = require('./base');

const WINDOW_CAPTURE_DELAY_MS = Number(process.env.WINDOW_CAPTURE_DELAY_MS || 1500);
const WINDOW_CAPTURE_TIMEOUT_MS = Number(process.env.WINDOW_CAPTURE_TIMEOUT_MS || 30000);
const SIMULATOR_TITLEBAR_CROP_PX = Number(process.env.SIMULATOR_TITLEBAR_CROP_PX || 24);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function buildOutputPath(sceneName, shotLabel) {
  const outputsDir = path.join(__dirname, 'outputs', sceneName);
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const normalizedLabel = String(shotLabel || '').trim().replace(/[^\w-]+/g, '-');
  const screenshotName = normalizedLabel ? `${timestamp}-${normalizedLabel}.png` : `${timestamp}.png`;
  return path.join(outputsDir, screenshotName);
}

async function cropImage(sourcePath, targetPath, cropBox) {
  const command = `
Add-Type -AssemblyName System.Drawing
$src = '${escapeForPowerShell(sourcePath)}'
$dst = '${escapeForPowerShell(targetPath)}'
$x = ${cropBox.x}
$y = ${cropBox.y}
$width = ${cropBox.width}
$height = ${cropBox.height}

$image = [System.Drawing.Image]::FromFile($src)
if ($x -lt 0 -or $y -lt 0 -or $width -le 0 -or $height -le 0) {
  $image.Dispose()
  throw '裁切区域非法'
}
if (($x + $width) -gt $image.Width -or ($y + $height) -gt $image.Height) {
  $image.Dispose()
  throw "裁切区域越界: image=$($image.Width)x$($image.Height), crop=$x,$y,$width,$height"
}

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.DrawImage(
  $image,
  (New-Object System.Drawing.Rectangle(0, 0, $width, $height)),
  (New-Object System.Drawing.Rectangle($x, $y, $width, $height)),
  [System.Drawing.GraphicsUnit]::Pixel
)
$bitmap.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
$image.Dispose()
`;

  await runPowerShell(command, WINDOW_CAPTURE_TIMEOUT_MS);
  const fileStat = fs.statSync(targetPath);
  if (!fileStat.size) {
    throw new Error(`裁切截图写入失败: ${targetPath}`);
  }

  return {
    outputPath: targetPath,
    bytes: fileStat.size
  };
}

async function captureDevtoolsWindow(options = {}) {
  const projectName = String(options.projectName || path.basename(process.cwd())).trim();
  const outputPath = options.outputPath;
  const captureDelayMs = Number(options.captureDelayMs || WINDOW_CAPTURE_DELAY_MS);
  const exactTitle = String(process.env.WECHAT_DEVTOOLS_WINDOW_TITLE || '').trim();

  const titleFilter = exactTitle
    ? `($_.MainWindowTitle -eq '${escapeForPowerShell(exactTitle)}')`
    : `($_.MainWindowTitle -like '*${escapeForPowerShell(projectName)}*' -and $_.MainWindowTitle -like '*微信开发者工具*')`;

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
public static class Win32 {
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")]
  public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
}
'@

$outputPath = '${escapeForPowerShell(outputPath)}'
$projectName = '${escapeForPowerShell(projectName)}'
$delayMs = ${captureDelayMs}

$window = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ${titleFilter}
} | Sort-Object StartTime -Descending | Select-Object -First 1

if (-not $window) {
  $window = Get-Process | Where-Object {
    $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like '*微信开发者工具*'
  } | Sort-Object StartTime -Descending | Select-Object -First 1
}

if (-not $window) {
  throw '未找到微信开发者工具可见窗口'
}

[void][Win32]::ShowWindowAsync($window.MainWindowHandle, 3)
[void][Win32]::SetForegroundWindow($window.MainWindowHandle)
Start-Sleep -Milliseconds $delayMs

$rect = New-Object RECT
$ok = [Win32]::GetWindowRect($window.MainWindowHandle, [ref]$rect)
if (-not $ok) {
  throw "读取窗口区域失败: $($window.MainWindowTitle)"
}

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top
if ($width -le 0 -or $height -le 0) {
  throw "窗口尺寸异常: $($width)x$($height)"
}

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "$width,$height"
Write-Output $window.MainWindowTitle
`;

  const result = await runPowerShell(command, WINDOW_CAPTURE_TIMEOUT_MS);
  const fileStat = fs.statSync(outputPath);
  if (!fileStat.size) {
    throw new Error(`窗口截图写入失败: ${outputPath}`);
  }

  const stdoutLines = (result.stdout || '').trim().split(/\r?\n/).filter(Boolean);
  const dimensionLine = stdoutLines.find((line) => /^\d+,\d+$/.test(line)) || '';
  const dimensions = dimensionLine ? dimensionLine.split(',').map((item) => Number(item)) : [0, 0];
  const windowTitle = stdoutLines.filter((line) => line !== dimensionLine).pop() || '';
  return {
    outputPath,
    bytes: fileStat.size,
    windowTitle,
    width: dimensions[0] || 0,
    height: dimensions[1] || 0
  };
}

async function captureSimulatorWindow(options = {}) {
  const projectName = String(options.projectName || path.basename(process.cwd())).trim();
  const outputPath = options.outputPath;
  const captureDelayMs = Number(options.captureDelayMs || WINDOW_CAPTURE_DELAY_MS);
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
  public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")]
  public static extern bool GetClientRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")]
  public static extern bool ClientToScreen(IntPtr hWnd, ref POINT point);
}
'@

$outputPath = '${escapeForPowerShell(outputPath)}'
$delayMs = ${captureDelayMs}
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
if ($width -le 0 -or $height -le 0) {
  throw "模拟器 client 尺寸异常: $($width)x$($height)"
}

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($origin.X, $origin.Y, 0, 0, $bitmap.Size)
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "$width,$height"
Write-Output $window.MainWindowTitle
`;

  const result = await runPowerShell(command, WINDOW_CAPTURE_TIMEOUT_MS);
  const fileStat = fs.statSync(outputPath);
  if (!fileStat.size) {
    throw new Error(`模拟器截图写入失败: ${outputPath}`);
  }

  const stdoutLines = (result.stdout || '').trim().split(/\r?\n/).filter(Boolean);
  const dimensionLine = stdoutLines.find((line) => /^\d+,\d+$/.test(line)) || '';
  const dimensions = dimensionLine ? dimensionLine.split(',').map((item) => Number(item)) : [0, 0];
  const windowTitle = stdoutLines.filter((line) => line !== dimensionLine).pop() || '';
  return {
    outputPath,
    bytes: fileStat.size,
    windowTitle,
    width: dimensions[0] || 0,
    height: dimensions[1] || 0
  };
}

async function widenSimulatorPane(options = {}) {
  const projectName = String(options.projectName || path.basename(process.cwd())).trim();
  const exactTitle = String(process.env.WECHAT_DEVTOOLS_WINDOW_TITLE || '').trim();
  const titleFilter = exactTitle
    ? `($_.MainWindowTitle -eq '${escapeForPowerShell(exactTitle)}')`
    : `($_.MainWindowTitle -like '*${escapeForPowerShell(projectName)}*' -and $_.MainWindowTitle -like '*微信开发者工具*')`;

  const command = `
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public struct RECT {
  public int Left;
  public int Top;
  public int Right;
  public int Bottom;
}
public static class Win32 {
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")]
  public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")]
  public static extern bool SetCursorPos(int X, int Y);
  [DllImport("user32.dll")]
  public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
}
'@

$MOUSEEVENTF_LEFTDOWN = 0x0002
$MOUSEEVENTF_LEFTUP = 0x0004
$window = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ${titleFilter}
} | Sort-Object StartTime -Descending | Select-Object -First 1

if (-not $window) {
  throw '未找到微信开发者工具窗口，无法拉宽模拟器'
}

[void][Win32]::ShowWindowAsync($window.MainWindowHandle, 3)
[void][Win32]::SetForegroundWindow($window.MainWindowHandle)
Start-Sleep -Milliseconds 500

$rect = New-Object RECT
$ok = [Win32]::GetWindowRect($window.MainWindowHandle, [ref]$rect)
if (-not $ok) {
  throw '读取窗口区域失败，无法拉宽模拟器'
}

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top
$startX = $rect.Left + [int]($width * 0.935)
$startY = $rect.Top + [int]($height * 0.42)
$endX = $rect.Left + [int]($width * 0.58)

[void][Win32]::SetCursorPos($startX, $startY)
Start-Sleep -Milliseconds 120
[Win32]::mouse_event($MOUSEEVENTF_LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
for ($step = 1; $step -le 24; $step++) {
  $x = $startX + [int](($endX - $startX) * $step / 24)
  [void][Win32]::SetCursorPos($x, $startY)
  Start-Sleep -Milliseconds 18
}
[Win32]::mouse_event($MOUSEEVENTF_LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
`;

  await runPowerShell(command, WINDOW_CAPTURE_TIMEOUT_MS);
}

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入个人中心: /pages/profile/index');
    const page = await miniProgram.switchTab('/pages/profile/index');
    await page.waitFor(3000);

    const currentPage = await miniProgram.currentPage();
    if (!currentPage || currentPage.path !== 'pages/profile/index') {
      throw new Error(`当前页面不是个人中心，实际为: ${currentPage ? currentPage.path : 'unknown'}`);
    }

    console.log('等待个人中心与原生 tabBar 稳定渲染...');
    await sleep(1200);

    const rawOutputPath = buildOutputPath('ui-profile', 'native-tabbar-simulator-raw');
    const captureResult = await captureSimulatorWindow({
      projectName: path.basename(process.cwd()),
      outputPath: rawOutputPath
    });
    console.log(`[ui-profile-2] 独立模拟器原图完成: ${captureResult.outputPath} (${captureResult.bytes} bytes)`);

    if (captureResult.windowTitle) {
      console.log(`[ui-profile-2] 命中窗口: ${captureResult.windowTitle}`);
    }

    const finalOutputPath = buildOutputPath('ui-profile', 'native-tabbar-simulator');
    const cropTop = Math.max(0, Math.min(SIMULATOR_TITLEBAR_CROP_PX, captureResult.height - 1));
    const finalResult = await cropImage(captureResult.outputPath, finalOutputPath, {
      x: 0,
      y: cropTop,
      width: Math.max(1, captureResult.width),
      height: Math.max(1, captureResult.height - cropTop)
    });
    console.log(`[ui-profile-2] 最终裁切图完成: ${finalResult.outputPath} (${finalResult.bytes} bytes)`);
  } catch (e) {
    console.error('用例 ui-profile-2 执行异常:', e && e.stack ? e.stack : e);
    process.exitCode = 1;
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-profile-2 通信断开');
    }
  }
})();
