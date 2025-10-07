# Initialize and push to fresh GitHub repo
# Run this from the demo folder

$repoUrl = "https://github.com/SamppaFIN/FuelEconomy.git"

Write-Host "Initializing fresh repo and pushing FuelEconomy project..." -ForegroundColor Green

# Go to project root (two levels up from demo)
$projectRoot = Split-Path (Split-Path $PSScriptRoot)
Set-Location $projectRoot

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Green
    git init
}

# Add remote
Write-Host "Adding remote origin..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin $repoUrl

# Add all FuelEconomy files
Write-Host "Adding FuelEconomy files..." -ForegroundColor Green
git add Projects/FuelEconomy/

# Initial commit
Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: FuelEconomy demo with fleet management and maintenance analytics"

# Push to main branch
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Successfully pushed to fresh GitHub repo!" -ForegroundColor Green
Write-Host "Repository: $repoUrl" -ForegroundColor Yellow
