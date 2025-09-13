# Hugo-Headless CMS Setup Script for Windows PowerShell
# This script helps set up the Hugo-Headless CMS integration

Write-Host "🚀 Hugo-Headless CMS Setup Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Check if Hugo is installed
Write-Host "`n📋 Checking prerequisites..." -ForegroundColor Yellow

try {
    $hugoVersion = hugo version
    Write-Host "✅ Hugo is installed: $hugoVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Hugo is not installed. Please install Hugo first:" -ForegroundColor Red
    Write-Host "   - Download from: https://github.com/gohugoio/hugo/releases" -ForegroundColor Cyan
    Write-Host "   - Or use chocolatey: choco install hugo" -ForegroundColor Cyan
    Write-Host "   - Or use winget: winget install Hugo.Hugo" -ForegroundColor Cyan
    exit 1
}

# Create .env file from template
Write-Host "`n🔧 Setting up environment configuration..." -ForegroundColor Yellow

if (Test-Path "env.example") {
    if (-not (Test-Path ".env")) {
        Copy-Item "env.example" ".env"
        Write-Host "✅ Created .env file from template" -ForegroundColor Green
        Write-Host "⚠️  Please edit .env file with your CMS credentials" -ForegroundColor Yellow
    } else {
        Write-Host "ℹ️  .env file already exists" -ForegroundColor Blue
    }
} else {
    Write-Host "❌ env.example file not found" -ForegroundColor Red
}

# Create public directory if it doesn't exist
Write-Host "`n📁 Creating necessary directories..." -ForegroundColor Yellow

$directories = @("public", "static/css", "static/js", "layouts/partials", "api")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✅ Created directory: $dir" -ForegroundColor Green
    }
}

# Test Hugo configuration
Write-Host "`n🧪 Testing Hugo configuration..." -ForegroundColor Yellow

try {
    $hugoCheck = hugo --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Hugo configuration is valid" -ForegroundColor Green
    } else {
        Write-Host "❌ Hugo configuration has issues" -ForegroundColor Red
        Write-Host "   Run 'hugo' to see detailed error messages" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Error testing Hugo configuration" -ForegroundColor Red
}

# Display next steps
Write-Host "`n📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Choose a headless CMS (Strapi, Sanity, Hygraph, Contentful, etc.)" -ForegroundColor Cyan
Write-Host "2. Create a new project in your chosen CMS" -ForegroundColor Cyan
Write-Host "3. Set up content models (Blog Post, Author, Category)" -ForegroundColor Cyan
Write-Host "4. Get your API endpoint and token from your CMS" -ForegroundColor Cyan
Write-Host "5. Update .env file with your credentials" -ForegroundColor Cyan
Write-Host "6. Update data/cms-config.json with your project details" -ForegroundColor Cyan
Write-Host "7. Add some content in your CMS" -ForegroundColor Cyan
Write-Host "8. Run 'hugo server' to test locally" -ForegroundColor Cyan

Write-Host "`n🎉 Setup complete! Check the README.md for detailed instructions." -ForegroundColor Green
