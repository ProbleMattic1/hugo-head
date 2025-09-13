# Quick Start Guide

Get your Hugo-Headless CMS integration running in 10 minutes!

## 🚀 Quick Setup

### 1. Run Setup Script
```powershell
.\setup.ps1
```

### 2. Create CMS Project
1. Choose your headless CMS (Strapi, Sanity, Hygraph, Contentful, etc.)
2. Create a new project/workspace
3. Name it "Hugo Blog CMS"

### 3. Set Up Content Models

#### Blog Post Model
- **Title**: String (required)
- **Slug**: String (required, unique)
- **Description**: String
- **Content**: Rich Text (required)
- **Featured Image**: Asset
- **Author**: Author (reference)
- **Published At**: DateTime (required)
- **Tags**: String (multiple values)
- **Category**: Category (reference)

#### Author Model
- **Name**: String (required)
- **Email**: String
- **Bio**: Rich Text
- **Avatar**: Asset

#### Category Model
- **Name**: String (required)
- **Slug**: String (required, unique)
- **Description**: String

### 4. Configure API Access
1. Go to your CMS's API/Settings section
2. Copy your GraphQL/REST endpoint URL
3. Generate a permanent auth token or API key

### 5. Update Configuration
1. Edit `.env` file:
   ```
   CMS_ENDPOINT=https://api.your-cms.com/endpoint
   CMS_API_TOKEN=your_token_here
   ```

2. Edit `data/cms-config.json`:
   - Replace the endpoint URL with your actual CMS API endpoint
   - Replace `YOUR_API_TOKEN_HERE` with your actual token

### 6. Add Sample Content
1. Create an author profile in your CMS
2. Create a category
3. Create a blog post with featured image

### 7. Test Locally
```powershell
hugo server -D
```

Visit `http://localhost:1313` to see your site!

## 🚀 Deploy to Production

### Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Set up webhook in Hygraph

### Vercel
1. Import project to Vercel
2. Set environment variables
3. Deploy automatically

## ✅ Verification Checklist

- [ ] Hugo site builds without errors
- [ ] Hygraph content loads on homepage
- [ ] Blog posts display correctly
- [ ] Images load properly
- [ ] Webhooks trigger rebuilds
- [ ] Site deploys successfully

## 🔧 Troubleshooting

**Content not loading?**
- Check your API endpoint and token
- Verify content is published in your CMS
- Check browser console for errors

**Build failing?**
- Ensure all environment variables are set
- Check Hugo version compatibility
- Verify template syntax

**Need help?**
- Check the full README.md
- Review your CMS documentation
- Check Hugo documentation

## 🎯 Next Steps

- Customize the design in `static/css/style.css`
- Add more content types in your CMS
- Set up staging environment
- Implement caching strategies
- Add SEO optimizations

Happy building! 🚀
