// Main JavaScript file for Hugo-Hygraph integration

// Configuration
const HYGRAPH_CONFIG = {
    endpoint: 'https://api.hygraph.com/v2/your_project_id/master', // Replace with your actual endpoint
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_TOKEN' // Replace with your actual token
    }
};

// GraphQL query for blog posts
const BLOG_POSTS_QUERY = `
    query {
        blogPosts {
            id
            title
            slug
            description
            content
            featuredImage {
                url
                alt
            }
            author {
                name
                email
            }
            publishedAt
            tags
            category
        }
    }
`;

// Fetch data from Hygraph
async function fetchFromHygraph(query) {
    try {
        const response = await fetch(HYGRAPH_CONFIG.endpoint, {
            method: 'POST',
            headers: HYGRAPH_CONFIG.headers,
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.errors) {
            console.error('GraphQL errors:', data.errors);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching from Hygraph:', error);
        return null;
    }
}

// Render blog posts from Hygraph data
function renderHygraphPosts(posts) {
    const container = document.getElementById('hygraph-content');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p>No posts available from Hygraph.</p>';
        return;
    }

    const postsHTML = posts.map(post => `
        <article class="post-card">
            ${post.featuredImage ? `
                <div class="post-card-image">
                    <img src="${post.featuredImage.url}" alt="${post.featuredImage.alt || post.title}" />
                </div>
            ` : ''}
            
            <div class="post-card-content">
                <h3 class="post-card-title">
                    <a href="/blog/${post.slug}">${post.title}</a>
                </h3>
                
                ${post.description ? `
                    <p class="post-card-description">${post.description}</p>
                ` : ''}
                
                <div class="post-card-meta">
                    <time datetime="${new Date(post.publishedAt).toISOString()}">
                        ${new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                    ${post.author ? `
                        <span class="post-author">by ${post.author.name}</span>
                    ` : ''}
                </div>
                
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-card-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </article>
    `).join('');

    container.innerHTML = `
        <div class="posts-grid">
            ${postsHTML}
        </div>
    `;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Hugo-Hygraph integration initialized');
    
    // Check if we're on the homepage and should load Hygraph content
    if (window.location.pathname === '/' || window.location.pathname === '') {
        try {
            const data = await fetchFromHygraph(BLOG_POSTS_QUERY);
            if (data && data.blogPosts) {
                renderHygraphPosts(data.blogPosts);
            }
        } catch (error) {
            console.error('Failed to load Hygraph content:', error);
            document.getElementById('hygraph-content').innerHTML = 
                '<p>Unable to load content from Hygraph. Please check your configuration.</p>';
        }
    }
});

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

// Export for use in other scripts
window.HygraphIntegration = {
    fetchFromHygraph,
    renderHygraphPosts,
    formatDate,
    slugify
};
