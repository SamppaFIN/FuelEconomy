# Publish FuelEconomy to GitHub

# Run this script from the FuelEconomy folder

$repoUrl = "https://github.com/SamppaFIN/FuelEconomy.git"

Write-Host "Publishing FuelEconomy project to GitHub..." -ForegroundColor Green
Write-Host "Repository: $repoUrl" -ForegroundColor Yellow

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Green
    git init
}

# Add remote (remove existing if any)
git remote remove origin 2>$null
git remote add origin $repoUrl

# Add all files
Write-Host "Adding all files..." -ForegroundColor Green
git add .

# Initial commit
Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: FuelEconomy demo with fleet management and maintenance analytics"

# Push to main branch
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Successfully published to GitHub!" -ForegroundColor Green
Write-Host "Repository: $repoUrl" -ForegroundColor Yellow
