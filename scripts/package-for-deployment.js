#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🚀 Packaging Techsy.News for Hostinger deployment...\n');

// Create deployment directory
const deployDir = path.join(projectRoot, 'deployment');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir);

console.log('📁 Creating deployment package...');

// Copy essential files
const filesToCopy = [
  'package.json',
  'package-lock.json',
  '.env.example'
];

const dirsToCopy = [
  'build',
  'public'
];

// Copy files
filesToCopy.forEach(file => {
  const src = path.join(projectRoot, file);
  const dest = path.join(deployDir, file);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file}`);
  } else {
    console.log(`⚠️  Warning: ${file} not found`);
  }
});

// Copy directories
dirsToCopy.forEach(dir => {
  const src = path.join(projectRoot, dir);
  const dest = path.join(deployDir, dir);
  
  if (fs.existsSync(src)) {
    copyDirectory(src, dest);
    console.log(`✅ Copied ${dir}/`);
  } else {
    console.log(`⚠️  Warning: ${dir}/ not found`);
  }
});

// Create .htaccess file
const htaccessContent = `# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirect all requests to Node.js app (if not using direct Node.js hosting)
# RewriteEngine On
# RewriteCond %{REQUEST_FILENAME} !-f
# RewriteCond %{REQUEST_FILENAME} !-d
# RewriteRule ^(.*)$ /build/server/index.js [L]
`;

fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccessContent);
console.log('✅ Created .htaccess');

// Create production environment template
const envProdTemplate = `# Production Environment Variables for Hostinger
# Copy this to .env.production and fill in your actual values

# Supabase Configuration
VITE_SUPABASE_URL=your_production_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key_here

# Site Configuration
VITE_SITE_URL=https://yourdomain.com
NODE_ENV=production

# Optional: Analytics and other services
# VITE_GOOGLE_ANALYTICS_ID=your_ga_id
# VITE_SENTRY_DSN=your_sentry_dsn
`;

fs.writeFileSync(path.join(deployDir, '.env.production.template'), envProdTemplate);
console.log('✅ Created .env.production.template');

// Create deployment instructions
const deployInstructions = `# Hostinger Deployment Instructions

## Quick Start

1. **Upload Files:**
   - Upload all files from this deployment folder to your Hostinger public_html directory
   - Or use SSH: \`scp -r * username@your-server:/public_html/\`

2. **Configure Environment:**
   - Rename \`.env.production.template\` to \`.env.production\`
   - Fill in your actual Supabase credentials and domain

3. **Install Dependencies (if using SSH):**
   \`\`\`bash
   cd public_html
   npm install --production
   \`\`\`

4. **Configure Node.js in Hostinger Panel:**
   - Application Root: \`/public_html\`
   - Startup File: \`build/server/index.js\`
   - Node.js Version: 18+
   - Environment: production

5. **Test Your Site:**
   - Visit your domain
   - Check all functionality
   - Monitor logs for any issues

## File Structure
\`\`\`
public_html/
├── build/              # Built application
│   ├── client/         # Client-side assets
│   └── server/         # Server-side code
├── public/             # Static assets
├── package.json        # Dependencies
├── .env.production     # Environment variables
└── .htaccess          # Apache configuration
\`\`\`

## Troubleshooting
- Check Node.js logs in Hostinger panel
- Verify environment variables
- Ensure proper file permissions
- Test database connection

For detailed instructions, see HOSTINGER_DEPLOYMENT.md
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOYMENT_INSTRUCTIONS.md'), deployInstructions);
console.log('✅ Created DEPLOYMENT_INSTRUCTIONS.md');

// Create package info
const packageInfo = {
  name: 'techsy-news-deployment',
  version: '2.0.0',
  description: 'Deployment package for Techsy.News on Hostinger',
  created: new Date().toISOString(),
  files: fs.readdirSync(deployDir),
  size: getDirectorySize(deployDir)
};

fs.writeFileSync(
  path.join(deployDir, 'package-info.json'), 
  JSON.stringify(packageInfo, null, 2)
);
console.log('✅ Created package-info.json');

console.log('\n🎉 Deployment package created successfully!');
console.log(`📦 Location: ${deployDir}`);
console.log(`📊 Package size: ${formatBytes(packageInfo.size)}`);
console.log(`📁 Files included: ${packageInfo.files.length}`);

console.log('\n📋 Next Steps:');
console.log('1. Review the files in the deployment/ folder');
console.log('2. Follow HOSTINGER_DEPLOYMENT.md for detailed instructions');
console.log('3. Upload files to your Hostinger hosting account');
console.log('4. Configure environment variables');
console.log('5. Test your deployed application');

// Helper functions
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getDirectorySize(dirPath) {
  let size = 0;
  
  function calculateSize(filePath) {
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      const files = fs.readdirSync(filePath);
      files.forEach(file => {
        calculateSize(path.join(filePath, file));
      });
    } else {
      size += stats.size;
    }
  }
  
  calculateSize(dirPath);
  return size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
