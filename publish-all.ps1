# ==============================================================================
# Messaging Platform - All Modules Build & Private Publish Automation Script
#
# 2-Level Packaging: com.ma.${module-name}
#   - Group: com.ma
#   - Output Artifact Directory: ~/.m2/repository/com/ma/${module-name}
#
# Execution Order (Dependency Chain):
#   1. messaging-payloader   : Core Messaging Envelope & Payload Validation Engine
#   2. messaging-dispatcher  : MOM/Direct Dispatcher Engine (Depends on com.ma:messaging-payloader)
#   3. file-processor        : Target Data Partitioning & Secure Storage
#   4. messaging-backend     : Portal REST API Backend
# ==============================================================================

param(
    [switch]$SkipTests = $false
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "   🚀 Messaging Platform 4-Module 2-Level Private Publish Pipeline" -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "Base Directory : $ScriptDir" -ForegroundColor Yellow
Write-Host "Target Group   : com.ma" -ForegroundColor Yellow
Write-Host "Skip Tests     : $SkipTests" -ForegroundColor Yellow
Write-Host "Local .m2 Repo : $HOME\.m2\repository" -ForegroundColor Yellow
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""

$Modules = @(
    @{
        Name = "messaging-payloader"
        Path = Join-Path $ScriptDir "messaging-payloader"
        Artifact = "com\ma\messaging-payloader\1.0-SNAPSHOT"
        Description = "Core Messaging Envelope & Payload Validation Engine"
    },
    @{
        Name = "messaging-dispatcher"
        Path = Join-Path $ScriptDir "messaging-dispatcher"
        Artifact = "com\ma\messaging-dispatcher\1.0-SNAPSHOT"
        Description = "Multi-channel MOM & Direct Dispatcher Engine"
    },
    @{
        Name = "file-processor"
        Path = Join-Path $ScriptDir "file-processor"
        Artifact = "com\ma\file-processor\1.0-SNAPSHOT"
        Description = "Target File Ingestion & Partitioning Processor"
    },
    @{
        Name = "messaging-backend"
        Path = Join-Path $ScriptDir "messaging-backend"
        Artifact = "com\ma\messaging-backend\1.0-SNAPSHOT"
        Description = "Integrated Messaging Portal Backend REST API"
    }
)

$Results = @()

foreach ($Module in $Modules) {
    Write-Host "------------------------------------------------------------------" -ForegroundColor DarkCyan
    Write-Host "📦 Processing [$($Module.Name)]" -ForegroundColor Green
    Write-Host "   Description : $($Module.Description)" -ForegroundColor Gray
    Write-Host "   Artifact    : $($Module.Artifact)" -ForegroundColor Gray
    Write-Host "------------------------------------------------------------------" -ForegroundColor DarkCyan

    if (-not (Test-Path $Module.Path)) {
        Write-Error "Directory not found: $($Module.Path)"
        exit 1
    }

    Push-Location $Module.Path
    try {
        $Stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        
        if ($SkipTests) {
            Write-Host "▶ Running: gradlew.bat publishToMavenLocal" -ForegroundColor Gray
            cmd.exe /c "gradlew.bat publishToMavenLocal"
        } else {
            Write-Host "▶ Running: gradlew.bat test publishToMavenLocal" -ForegroundColor Gray
            cmd.exe /c "gradlew.bat test publishToMavenLocal"
        }
        
        if ($LASTEXITCODE -ne 0) {
            throw "Gradle build failed with exit code $LASTEXITCODE"
        }
        
        $Stopwatch.Stop()
        $Duration = [math]::Round($Stopwatch.Elapsed.TotalSeconds, 2)

        # Verify Artifact in Local M2
        $ArtifactPath = Join-Path "$HOME\.m2\repository" $Module.Artifact
        $JarCount = (Get-ChildItem -Path $ArtifactPath -Filter "*.jar" -ErrorAction SilentlyContinue | Measure-Object).Count

        $Results += [PSCustomObject]@{
            Module = $Module.Name
            Status = "SUCCESS"
            Duration = "$Duration s"
            ArtifactPath = $Module.Artifact
            JarVerified = ($JarCount -gt 0)
        }
        Write-Host "✅ [$($Module.Name)] Published Successfully ($Duration s)" -ForegroundColor Green
    }
    catch {
        $Results += [PSCustomObject]@{
            Module = $Module.Name
            Status = "FAILED"
            Duration = "-"
            ArtifactPath = $Module.Artifact
            JarVerified = $false
        }
        Write-Host "❌ [$($Module.Name)] Failed: $_" -ForegroundColor Red
        Pop-Location
        break
    }
    finally {
        Pop-Location
    }
    Write-Host ""
}

Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "                      📋 SUMMARY REPORT                           " -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
$Results | Format-Table -AutoSize

$FailedCount = ($Results | Where-Object { $_.Status -ne "SUCCESS" } | Measure-Object).Count
if ($FailedCount -eq 0) {
    Write-Host "🎉 All 4 modules have been successfully tested & published to Maven Local under [com/ma/*]!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️ Publish pipeline completed with $FailedCount error(s)." -ForegroundColor Red
    exit 1
}
