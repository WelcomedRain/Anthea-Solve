<#
.SYNOPSIS
    Publish a fresh Claude Design export of antheasolve.com.

.DESCRIPTION
    Claude Design's bundler cannot emit SEO/Open Graph tags into the outer
    <head> -- it inlines everything into the JS bundle, where social scrapers
    never see it. Every export therefore needs a splice step afterwards.

    This script makes that step unskippable: it stages the export, runs the
    splice, and refuses to commit if verification fails.

.PARAMETER Zip
    Path to the exported .zip from Claude Design.

.PARAMETER Source
    Path to an already-extracted folder containing index.html (alternative to -Zip).

.PARAMETER Push
    Commit and push after a successful verify. Without it, changes are staged
    in the working tree for you to review and nothing is published.

.EXAMPLE
    .\tools\deploy.ps1 -Zip "$HOME\Box\Documents\AI\Anthea\website\export.zip"
    .\tools\deploy.ps1 -Zip .\export.zip -Push
#>
[CmdletBinding(DefaultParameterSetName = 'Zip')]
param(
    [Parameter(ParameterSetName = 'Zip', Mandatory)]  [string] $Zip,
    [Parameter(ParameterSetName = 'Dir', Mandatory)]  [string] $Source,
    [switch] $Push
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Push-Location $repo

try {
    # --- resolve the export into a folder we can read -----------------------
    if ($PSCmdlet.ParameterSetName -eq 'Zip') {
        if (-not (Test-Path $Zip)) { throw "zip not found: $Zip" }
        $stage = Join-Path ([System.IO.Path]::GetTempPath()) ("anthea-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
        New-Item -ItemType Directory -Path $stage | Out-Null
        Expand-Archive -Path $Zip -DestinationPath $stage -Force
        $Source = $stage
    }
    if (-not (Test-Path $Source)) { throw "source not found: $Source" }

    # the export may nest everything under site/
    $index = Get-ChildItem -Path $Source -Filter index.html -Recurse |
             Sort-Object { $_.FullName.Length } | Select-Object -First 1
    if (-not $index) { throw "no index.html anywhere under $Source" }
    $exportDir = $index.Directory.FullName
    Write-Host "export found: $exportDir" -ForegroundColor Cyan

    # --- stage the site files ----------------------------------------------
    # CNAME and .nojekyll are repo-managed; the export's copies are ignored so
    # a stale export cannot silently change the custom domain.
    foreach ($f in 'index.html', 'og.jpg', 'favicon.png') {
        $src = Join-Path $exportDir $f
        if (Test-Path $src) {
            Copy-Item $src (Join-Path $repo $f) -Force
            Write-Host "  staged $f"
        } else {
            Write-Host "  skipped $f (not in export)" -ForegroundColor Yellow
        }
    }

    # --- the step that must not be skipped ---------------------------------
    Write-Host "`nsplicing static <head> tags..." -ForegroundColor Cyan
    python (Join-Path $PSScriptRoot 'apply_static_head.py')
    if ($LASTEXITCODE -ne 0) { throw "splice failed -- nothing committed" }

    # --- report -------------------------------------------------------------
    Write-Host "`nworking tree:" -ForegroundColor Cyan
    git status --short

    if (-not $Push) {
        Write-Host "`nStaged but NOT published. Review, then re-run with -Push." -ForegroundColor Yellow
        return
    }

    if (-not (git status --porcelain)) {
        Write-Host "`nNothing changed; nothing to publish." -ForegroundColor Yellow
        return
    }

    git add -A
    git commit -m "Update site from Claude Design export

Static <head> tags re-spliced by tools/apply_static_head.py."
    git push origin main
    Write-Host "`nPublished. GitHub Pages usually rebuilds within a minute." -ForegroundColor Green
    Write-Host "Verify:  curl -s https://antheasolve.com/ | Select-String 'og:image'"
}
finally {
    Pop-Location
    if ($stage -and (Test-Path $stage)) { Remove-Item $stage -Recurse -Force }
}
