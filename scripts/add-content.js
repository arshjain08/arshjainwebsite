#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeMarkdown(filePath, frontmatterObj, body) {
  const yaml = Object.entries(frontmatterObj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const arr = value.map(v => `- ${String(v)}`).join('\n');
        return `${key}:\n${arr}`;
      }
      return `${key}: ${String(value)}`;
    })
    .join('\n');

  const content = `---\n${yaml}\n---\n\n${body}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

async function addBlogPost() {
  console.log('\n📝 Adding a new blog post...\n');
  
  const title = await question('Title: ');
  const excerpt = await question('Excerpt (brief description): ');
  const category = await question('Category (technical/personal): ');
  const tags = await question('Tags (comma-separated): ');
  const readTime = await question('Read time (e.g., "5 min read"): ');
  const featured = await question('Featured? (y/n): ');
  
  const newPost = {
    id: generateId(title),
    title,
    excerpt,
    content: "Your full blog content goes here. Edit the generated Markdown file.",
    date: getCurrentDate(),
    category: category || 'personal',
    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    readTime: readTime || '5 min read',
    featured: featured.toLowerCase().startsWith('y')
  };
  
  // Read existing blog data
  const blogPath = path.join(__dirname, '../data/blog.json');
  const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
  
  // Add new post at the beginning
  blogData.posts.unshift(newPost);
  
  // Write back to file
  fs.writeFileSync(blogPath, JSON.stringify(blogData, null, 2));

  // Create Markdown file
  const blogDir = path.join(__dirname, '../content/blog');
  ensureDir(blogDir);
  const mdPath = path.join(blogDir, `${newPost.id}.md`);
  writeMarkdown(
    mdPath,
    {
      title: newPost.title,
      date: newPost.date,
      category: newPost.category,
      tags: newPost.tags,
      readTime: newPost.readTime,
      featured: newPost.featured
    },
    `# ${newPost.title}\n\n${excerpt}\n\nWrite your full blog content here.\n\n## Section Title\n\n- Point one\n- Point two\n\n\`\`\`ts\n// code example\nconsole.log('hello');\n\`\`\``
  );
  
  console.log(`\n✅ Blog post "${title}" added successfully!`);
  console.log(`📍 Available at: /blog/${newPost.id}`);
  console.log(`📝 Edit content in: content/blog/${newPost.id}.md\n`);
}

async function addProject() {
  console.log('\n🚀 Adding a new project...\n');
  
  const title = await question('Title: ');
  const description = await question('Description: ');
  const tech = await question('Technologies (comma-separated): ');
  const category = await question('Category (machine-learning/finance/web-development/creative): ');
  const status = await question('Status (completed/in-progress): ');
  const featured = await question('Featured? (y/n): ');
  const github = await question('GitHub URL (optional): ');
  const demo = await question('Demo URL (optional): ');
  
  const newProject = {
    id: generateId(title),
    title,
    description,
    tech: tech.split(',').map(t => t.trim()).filter(Boolean),
    category: category || 'web-development',
    status: status || 'completed',
    featured: featured.toLowerCase().startsWith('y'),
    github: github || undefined,
    demo: demo || undefined,
    image: `/images/projects/${generateId(title)}.jpg`
  };
  
  // Remove undefined properties
  Object.keys(newProject).forEach(key => 
    newProject[key] === undefined && delete newProject[key]
  );
  
  // Read existing projects data
  const projectsPath = path.join(__dirname, '../data/projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  // Add new project at the beginning
  projectsData.projects.unshift(newProject);
  
  // Write back to file
  fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

  // Create Markdown file
  const projectsDir = path.join(__dirname, '../content/projects');
  ensureDir(projectsDir);
  const mdPath = path.join(projectsDir, `${newProject.id}.md`);
  writeMarkdown(
    mdPath,
    {
      title: newProject.title,
      category: newProject.category,
      status: newProject.status,
      featured: newProject.featured,
      github: newProject.github || '',
      demo: newProject.demo || '',
      tech: newProject.tech
    },
    `# ${newProject.title}\n\n${description}\n\n## Overview\n\nDescribe the project goals, challenges, and outcomes.\n\n## Key Features\n\n- Feature one\n- Feature two\n\n## Technical Details\n\nExplain your stack and architecture choices.\n`
  );
  
  console.log(`\n✅ Project "${title}" added successfully!`);
  console.log(`📍 Available at: /projects/${newProject.id}`);
  console.log(`📝 Edit content in: content/projects/${newProject.id}.md`);
  console.log(`🖼️  Add project image to: public/images/projects/${generateId(title)}.jpg\n`);
}

async function main() {
  console.log('🌟 Content Management Tool');
  console.log('==========================\n');
  
  const type = await question('What would you like to add? (blog/project): ');
  
  try {
    if (type.toLowerCase().startsWith('b')) {
      await addBlogPost();
    } else if (type.toLowerCase().startsWith('p')) {
      await addProject();
    } else {
      console.log('Please choose either "blog" or "project"');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}