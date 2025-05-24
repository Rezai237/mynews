# Hostinger Deployment Guide for Techsy.News

This guide will help you deploy your React Router v7 SSR application to Hostinger Business Web Hosting.

## 🚀 Prerequisites

### Hostinger Requirements
- **Business Web Hosting Plan** ✅ (You have this)
- **Domain Name** ✅ (You have this)
- **Node.js Support** (Available on Business plans)
- **SSH Access** (Available on Business plans)

### Local Requirements
- Git installed
- Node.js 18+ installed
- Your project built and tested locally

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env.production` file with your production Supabase credentials:

```bash
# .env.production
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_SITE_URL=https://yourdomain.com
```

### 2. Build Configuration
Update your `package.json` to include production scripts:

```json
{
  "scripts": {
    "build": "react-router build",
    "start": "react-router-serve ./build/server/index.js",
    "start:prod": "NODE_ENV=production react-router-serve ./build/server/index.js"
  }
}
```

### 3. Test Local Build
```bash
npm run build
npm run start
```
Visit `http://localhost:3000` to ensure everything works.

## 🔧 Hostinger Setup

### Step 1: Access Hostinger Control Panel
1. Log into your Hostinger account
2. Go to **Hosting** → **Manage**
3. Access **File Manager** or use **SSH**

### Step 2: Enable Node.js
1. In Hostinger control panel, go to **Advanced** → **Node.js**
2. **Enable Node.js** for your domain
3. Select **Node.js version 18** or higher
4. Set **Application Root** to `/public_html`
5. Set **Application Startup File** to `server/index.js`

### Step 3: Domain Configuration
1. Go to **Domains** → **DNS Zone**
2. Ensure your domain points to your hosting account
3. Add/verify these records:
   - **A Record**: `@` → Your server IP
   - **CNAME Record**: `www` → Your domain

## 📁 File Upload Methods

### Method 1: File Manager (Recommended for first deployment)

1. **Build your project locally:**
   ```bash
   npm run build
   ```

2. **Create deployment package:**
   ```bash
   # Create a zip file with these folders/files:
   - build/
   - node_modules/ (or package.json for npm install)
   - package.json
   - package-lock.json
   - .env.production
   ```

3. **Upload via File Manager:**
   - Access Hostinger File Manager
   - Navigate to `/public_html`
   - Upload and extract your zip file
   - Ensure proper file permissions (755 for directories, 644 for files)

### Method 2: SSH/Git (Recommended for updates)

1. **Connect via SSH:**
   ```bash
   ssh username@your-server-ip
   cd public_html
   ```

2. **Clone your repository:**
   ```bash
   git clone https://github.com/Rezai237/mynews.git .
   ```

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Build the application:**
   ```bash
   npm run build
   ```

## ⚙️ Server Configuration

### 1. Create .htaccess for Static Assets
Create `/public_html/.htaccess`:

```apache
# Enable compression
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

# Redirect all requests to Node.js app
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /server/index.js [L]
```

### 2. Configure Node.js Application
In Hostinger Node.js settings:
- **Application Root**: `/public_html`
- **Application Startup File**: `build/server/index.js`
- **Environment**: `production`

### 3. Environment Variables
In Hostinger Node.js panel, add environment variables:
```
NODE_ENV=production
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_SITE_URL=https://yourdomain.com
```

## 🗄️ Database Setup

### 1. Supabase Production Setup
1. Create a new Supabase project for production
2. Run your migrations:
   ```sql
   -- Copy content from supabase/migrations/ files
   -- Run in Supabase SQL Editor
   ```
3. Update RLS policies for production
4. Add production domain to allowed origins

### 2. Update Environment Variables
Update your production environment with new Supabase credentials.

## 🚀 Deployment Process

### Initial Deployment
1. **Prepare files locally:**
   ```bash
   npm run build
   ```

2. **Upload to Hostinger:**
   - Use File Manager or SSH
   - Upload build folder and package.json
   - Install dependencies if using SSH

3. **Configure Node.js app in Hostinger panel**

4. **Start the application**

5. **Test your domain:** `https://yourdomain.com`

### Updates/Redeployment
```bash
# Via SSH
cd public_html
git pull origin master
npm install --production
npm run build
# Restart Node.js app in Hostinger panel
```

## 🔍 Troubleshooting

### Common Issues

1. **Node.js app won't start:**
   - Check Node.js version (use 18+)
   - Verify startup file path
   - Check environment variables

2. **Static files not loading:**
   - Verify .htaccess configuration
   - Check file permissions
   - Ensure build folder is uploaded

3. **Database connection issues:**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure domain is in allowed origins

4. **404 errors on routes:**
   - Verify .htaccess rewrite rules
   - Check React Router configuration
   - Ensure SSR is working

### Debugging Steps
1. **Check Node.js logs** in Hostinger panel
2. **Verify file structure:**
   ```
   public_html/
   ├── build/
   │   ├── client/
   │   └── server/
   ├── package.json
   ├── .env.production
   └── .htaccess
   ```
3. **Test API endpoints** directly
4. **Check browser console** for client-side errors

## 📊 Performance Optimization

### 1. Enable Compression
Already configured in .htaccess above.

### 2. CDN Setup (Optional)
- Use Hostinger's CDN if available
- Or integrate with Cloudflare

### 3. Image Optimization
- Optimize images before upload
- Use WebP format when possible
- Implement lazy loading

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit production .env files
- Use Hostinger's environment variable panel

### 2. HTTPS
- Enable SSL certificate in Hostinger
- Force HTTPS redirects

### 3. Database Security
- Use RLS policies in Supabase
- Limit API key permissions
- Regular security updates

## 📝 Maintenance

### Regular Tasks
1. **Monitor application logs**
2. **Update dependencies** regularly
3. **Backup database** (Supabase handles this)
4. **Monitor performance** and uptime
5. **Update SSL certificates** (auto-renewed)

### Monitoring
- Set up Supabase monitoring
- Use Hostinger's uptime monitoring
- Monitor application performance

## 🎯 Next Steps

After successful deployment:
1. **Test all functionality** thoroughly
2. **Set up monitoring** and alerts
3. **Configure backups** and recovery
4. **Optimize performance** based on real usage
5. **Set up CI/CD** for automated deployments

## 📞 Support

### Hostinger Support
- Live chat available 24/7
- Knowledge base for common issues
- Ticket system for technical problems

### Application Support
- Check GitHub issues
- Review application logs
- Test locally first

---

**Your Techsy.News platform is ready for production deployment on Hostinger! 🚀**
