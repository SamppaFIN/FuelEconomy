# Push FuelEconomy project to GitHub (force overwrite)
# Run this from the demo folder

$repoUrl = "https://github.com/SamppaFIN/FuelEconomy.git"
$branch = "main"

Write-Host "Pushing FuelEconomy project to GitHub..." -ForegroundColor Green
Write-Host "Repository: $repoUrl" -ForegroundColor Yellow
Write-Host "Branch: $branch" -ForegroundColor Yellow

# Go to project root (two levels up from demo)
$projectRoot = Split-Path (Split-Path $PSScriptRoot)
Set-Location $projectRoot

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan

# Add all FuelEconomy files
Write-Host "Adding FuelEconomy files..." -ForegroundColor Green
git add Projects/FuelEconomy/

# Commit if there are changes
$status = git status --porcelain Projects/FuelEconomy/
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Green
    git commit -m "FuelEconomy: Local browser demo with fleet management, maintenance analytics, and ship details"
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

# Create subtree split and force push
Write-Host "Creating subtree split..." -ForegroundColor Green
$splitBranch = git subtree split --prefix Projects/FuelEconomy HEAD

Write-Host "Force pushing to GitHub (this will overwrite the remote repo)..." -ForegroundColor Red
Write-Host "Are you sure? This will completely replace the remote repository content!" -ForegroundColor Red
$confirm = Read-Host "Type 'yes' to continue"

if ($confirm -eq "yes") {
    git push -f $repoUrl $splitBranch`:$branch
    Write-Host "Successfully pushed FuelEconomy project to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Push cancelled" -ForegroundColor Yellow
}

Write-Host "Done!" -ForegroundColor Green
