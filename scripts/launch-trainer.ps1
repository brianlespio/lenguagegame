$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$port = 5173
$url = "http://127.0.0.1:$port/"
$env:Path = "C:\Program Files\nodejs;" + $env:Path
$env:npm_config_update_notifier = "false"

function Test-TrainerPort {
  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $async = $client.BeginConnect("127.0.0.1", $port, $null, $null)
    $ok = $async.AsyncWaitHandle.WaitOne(400)
    if ($ok -and $client.Connected) {
      $client.Close()
      return $true
    }
    $client.Close()
    return $false
  } catch {
    return $false
  }
}

if (-not (Test-TrainerPort)) {
  $npm = "C:\Program Files\nodejs\npm.cmd"
  if (-not (Test-Path $npm)) {
    throw "Node.js no esta instalado en Program Files."
  }
  Start-Process -FilePath "cmd.exe" -ArgumentList @(
    "/d", "/c",
    "npm.cmd run dev -- --host 127.0.0.1 --port $port --strictPort"
  ) -WorkingDirectory $root -WindowStyle Hidden | Out-Null

  $ready = $false
  for ($i = 0; $i -lt 80; $i++) {
    Start-Sleep -Milliseconds 250
    if (Test-TrainerPort) {
      $ready = $true
      break
    }
  }
  if (-not $ready) {
    throw "El servidor no arranco en $url"
  }
}

$chrome = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($chrome) {
  Start-Process -FilePath $chrome -ArgumentList @("--new-window", "--app=$url") | Out-Null
} else {
  Start-Process $url | Out-Null
}
