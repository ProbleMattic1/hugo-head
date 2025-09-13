# Hugo + Hygraph Headless CMS Integration

A complete setup demonstrating how to integrate Hugo static site generator with Hygraph headless CMS for dynamic content management.

## 🚀 Features

- **Static Site Generation** with Hugo
- **Headless CMS** integration with Hygraph
- **GraphQL API** for flexible data fetching
- **Automatic Rebuilds** via webhooks
- **Responsive Design** with modern CSS
- **SEO Optimized** with proper meta tags
- **Deployment Ready** for Netlify and Vercel

## 📁 Project Structure

```
hugo-head/
├── archetypes/           # Content templates
├── content/              # Static content
│   ├── blog/            # Blog posts
│   └── about/           # About page
├── data/                # Configuration data
│   └── hygraph-config.json
├── layouts/             # Hugo templates
│   ├── _default/        # Default layouts
│   ├── partials/        # Reusable components
│   └── index.html       # Homepage layout
├── static/              # Static assets
│   ├── css/            # Stylesheets
│   └── js/             # JavaScript files
├── api/                # Serverless functions
│   └── hygraph-webhook.js
├── config.toml         # Hugo configuration
├── netlify.toml        # Netlify deployment config
├── vercel.json         # Vercel deployment config
└── env.example         # Environment variables template
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (for deployment platforms)
- Git
- A Hygraph account

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd hugo-head
```

### 2. Configure Hygraph

1. **Create a Hygraph Account**
   - Go to [hygraph.com](https://hygraph.com)
   - Sign up for a free account

2. **Create a New Project**
   - Click "Create Project"
   - Choose "Blank Project"
   - Give it a name like "Hugo Blog CMS"

3. **Set Up Content Models**
   - Create the following content models based on `data/hygraph-config.json`:
     - **Blog Post**: title, slug, description, content, featuredImage, author, publishedAt, tags, category
     - **Author**: name, email, bio, avatar
     - **Category**: name, slug, description

4. **Get API Credentials**
   - Go to Project Settings → API Access
   - Copy your GraphQL endpoint URL
   - Generate a permanent auth token

### 3. Configure Hugo

1. **Update Configuration**
   ```bash
   cp env.example .env
   ```

2. **Edit `.env` file**:
   ```
   HYGRAPH_ENDPOINT=https://api.hygraph.com/v2/your_project_id/master
   HYGRAPH_API_TOKEN=your_actual_token_here
   ```

3. **Update `data/hygraph-config.json`**:
   - Replace `your_project_id` with your actual project ID
   - Replace `YOUR_API_TOKEN_HERE` with your actual token

### 4. Add Content to Hygraph

1. **Create Authors**
   - Add author profiles in Hygraph
   - Include name, email, bio, and avatar

2. **Create Categories**
   - Add blog categories
   - Include name, slug, and description

3. **Create Blog Posts**
   - Add blog posts with all required fields
   - Use the Rich Text editor for content
   - Upload featured images

### 5. Test Locally

```bash
# If Hugo is installed
hugo server -D

# Or use the development server
hugo serve --bind 0.0.0.0 --port 1313
```

Visit `http://localhost:1313` to see your site.

## 🚀 Deployment

### Option 1: Netlify

1. **Connect Repository**
   - Push your code to GitHub/GitLab
   - Connect repository to Netlify

2. **Configure Build Settings**
   - Build command: `hugo --minify`
   - Publish directory: `public`

3. **Set Environment Variables**
   - `HYGRAPH_ENDPOINT`: Your Hygraph API endpoint
   - `HYGRAPH_API_TOKEN`: Your Hygraph API token

4. **Set Up Webhooks**
   - In Hygraph, go to Project Settings → Webhooks
   - Add webhook URL: `https://your-site.netlify.app/.netlify/functions/hygraph-webhook`

### Option 2: Vercel

1. **Connect Repository**
   - Import your project to Vercel
   - Connect to your Git repository

2. **Configure Environment Variables**
   - Add `HYGRAPH_ENDPOINT` and `HYGRAPH_API_TOKEN`
   - Add `VERCEL_DEPLOY_HOOK_URL` for webhook integration

3. **Set Up Webhooks**
   - In Hygraph, add webhook URL: `https://your-site.vercel.app/api/hygraph-webhook`

## 🔧 Customization

### Adding New Content Types

1. **Create Model in Hygraph**
   - Define fields and relationships
   - Set up proper permissions

2. **Update GraphQL Queries**
   - Add queries to `data/hygraph-config.json`
   - Create corresponding Hugo templates

3. **Create Templates**
   - Add layouts in `layouts/`
   - Create partials for reusable components

### Styling

- Modify `static/css/style.css` for custom styles
- Add new CSS files and reference them in layouts
- Use CSS custom properties for theming

### JavaScript Functionality

- Extend `static/js/main.js` for additional functionality
- Add new JavaScript modules as needed
- Implement client-side GraphQL queries if needed

## 📚 API Reference

### GraphQL Queries

The project includes several pre-configured GraphQL queries:

- **Blog Posts**: Fetch all blog posts with metadata
- **Single Post**: Fetch a specific post by slug
- **Authors**: Fetch all authors
- **Categories**: Fetch all categories

### Hugo Functions

- `resources.GetRemote`: Fetches data from external APIs
- `transform.Unmarshal`: Parses JSON responses
- `partial`: Includes reusable template partials

## 🔍 Troubleshooting

### Common Issues

1. **API Errors**
   - Check your Hygraph endpoint and token
   - Verify content model field names match queries
   - Check network connectivity

2. **Build Failures**
   - Ensure all required environment variables are set
   - Check Hugo version compatibility
   - Verify template syntax

3. **Content Not Loading**
   - Check GraphQL query syntax
   - Verify content is published in Hygraph
   - Check browser console for JavaScript errors

### Debug Mode

Enable debug logging by setting:
```
HUGO_LOG_LEVEL=debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hygraph Documentation](https://hygraph.com/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

## 💡 Tips

- Use Hygraph's content federation for multi-source content
- Implement proper caching strategies for better performance
- Set up staging environments for testing
- Use Hygraph's asset management for optimized images
- Implement proper error handling for API failures