# Podman Compose Execution Wrapper for messaging-platform-v1
# Toolchain paths:
#   Python: D:\dev-tool\python\python.exe
#   Podman-Compose: D:\dev-tool\python\Scripts\podman-compose.exe

$PodmanComposeExe = "D:\dev-tool\python\Scripts\podman-compose.exe"

if (-not (Test-Path $PodmanComposeExe)) {
    Write-Error "[ERROR] podman-compose.exe not found at $PodmanComposeExe"
    exit 1
}

& $PodmanComposeExe @args
