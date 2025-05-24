# Hostinger Deployment Instructions

## Quick Start

1. **Upload Files:**
   - Upload all files from this deployment folder to your Hostinger public_html directory
   - Or use SSH: `scp -r * username@your-server:/public_html/`

2. **Configure Environment:**
   - Rename `.env.production.template` to `.env.production`
   - Fill in your actual Supabase credentials and domain

3. **Install Dependencies (if using SSH):**
   ```bash
   cd public_html
   npm install --production
   ```

4. **Configure Node.js in Hostinger Panel:**
   - Application Root: `/public_html`
   - Startup File: `build/server/index.js`
   - Node.js Version: 18+
   - Environment: production

5. **Test Your Site:**
   - Visit your domain
   - Check all functionality
   - Monitor logs for any issues

## File Structure
```
public_html/
├── build/              # Built application
│   ├── client/         # Client-side assets
│   └── server/         # Server-side code
├── public/             # Static assets
├── package.json        # Dependencies
├── .env.production     # Environment variables
└── .htaccess          # Apache configuration
```

## Troubleshooting
- Check Node.js logs in Hostinger panel
- Verify environment variables
- Ensure proper file permissions
- Test database connection

For detailed instructions, see HOSTINGER_DEPLOYMENT.md
