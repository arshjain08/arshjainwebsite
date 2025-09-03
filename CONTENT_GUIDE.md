# Content Management Guide

## 🚀 Quick Start

Your website is now fully data-driven and responsive! Here's how to easily add new content:

### Adding Blog Posts

**Method 1: Use the Script (Recommended)**
```bash
node scripts/add-content.js
# Choose "blog" when prompted
```
- This now also creates a Markdown file at `content/blog/<slug>.md` with frontmatter.
- Edit that Markdown file to write your post (headings, lists, code blocks supported via GFM).

**Method 2: Edit Manually**
- Add metadata to `data/blog.json` (used for lists and filters)
- Write full content in `content/blog/<slug>.md`

### Adding Projects

**Method 1: Use the Script (Recommended)**
```bash
node scripts/add-content.js
# Choose "project" when prompted
```
- This now creates `content/projects/<slug>.md` with frontmatter.
- Edit that Markdown file for the detailed project write-up.

**Method 2: Edit Manually**
- Add metadata to `data/projects.json`
- Write full content in `content/projects/<slug>.md`

## 📱 Responsive Design

The website now scales beautifully across all screen sizes:

- **Mobile (320px+)**: Optimized typography, mobile navigation menu
- **Tablet (640px+)**: Improved spacing and layout
- **Desktop (1024px+)**: Full desktop experience
- **Large screens (1440px+)**: Enhanced typography for better readability

### Key Improvements:
- ✅ Responsive typography that scales with screen size
- ✅ Mobile-first navigation with hamburger menu
- ✅ Flexible grid layouts that adapt to screen width
- ✅ Touch-friendly buttons and links on mobile
- ✅ Optimized spacing and padding for each breakpoint

## 📝 Content Structure

### Blog Post Schema (JSON metadata)
```json
{
  "id": "your-post-slug",
  "title": "Your Post Title",
  "excerpt": "Brief description for previews",
  "date": "2024-01-01",
  "category": "technical" | "personal",
  "tags": ["tag1", "tag2"],
  "readTime": "5 min read",
  "featured": true | false
}
```
- Full content lives in `content/blog/<slug>.md` (frontmatter optional).

### Project Schema (JSON metadata)
```json
{
  "id": "your-project-slug",
  "title": "Project Name",
  "description": "Project description",
  "tech": ["React", "Node.js"],
  "category": "machine-learning" | "finance" | "web-development" | "creative",
  "status": "completed" | "in-progress",
  "featured": true | false,
  "github": "https://github.com/...",
  "demo": "https://demo-url.com",
  "image": "/images/projects/project-name.jpg"
}
```
- Full write-up lives in `content/projects/<slug>.md`.

## 🌈 Customization

### Adding New Categories

**For Blog Posts:**
1. Add to `categories` array in `data/blog.json`
2. Update color schemes in the blog page components if needed

**For Projects:**
1. Add to `categories` array in `data/projects.json`
2. Include a `color` property for the category

### Adding Images
- Place project images in `public/images/projects/`
- Use the filename pattern: `project-id.jpg`
- Images are automatically referenced in project pages

## 🛠️ Development

### Running the Site
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

### File Structure
```
src/
  app/
    blog/
      [slug]/page.tsx    # Individual blog posts (renders Markdown)
      page.tsx           # Blog listing (from JSON metadata)
    projects/
      [slug]/page.tsx    # Individual project pages (renders Markdown)
      page.tsx           # Project listing (from JSON metadata)
    page.tsx             # Homepage
  components/
    Navigation.tsx       # Responsive navigation
    Chatbot.tsx         # Your existing chatbot
data/
  blog.json             # Blog posts metadata
  projects.json         # Projects metadata
  personal.json         # Personal info (if needed)
content/
  blog/                 # Blog markdown files (.md)
  projects/             # Project markdown files (.md)
scripts/
  add-content.js        # Content management script (creates .md)
```

## 💯 Pro Tips

1. **SEO-Friendly URLs**: Post/project IDs become URL slugs automatically
2. **Featured Content**: Use the `featured` flag to highlight important posts/projects
3. **Filtering**: Users can filter by category and featured status
4. **Mobile-First**: The design prioritizes mobile experience
5. **Fast Loading**: Next.js optimizations ensure quick page loads

---

**Need help?** The content management script will guide you through adding new posts and projects step by step!