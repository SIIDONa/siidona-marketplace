# Deployment Guide - Siidona Marketplace

This guide covers deployment to Vercel, Netlify, and Cloudflare Pages.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Account on your chosen platform

## Option 1: Vercel

### Method A: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and your site will be live!

### Method B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Click "Deploy"

## Option 2: Netlify

### Method A: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

### Method B: Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure:
   - Build command: (leave empty)
   - Publish directory: (leave as root)
5. Click "Deploy site"

### Method C: Drag & Drop

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder to the dashboard
3. Your site is live instantly!

## Option 3: Cloudflare Pages

### Via Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to "Pages"
3. Click "Create a project"
4. Connect your Git repository
5. Configure:
   - Production branch: main
   - Build command: (leave empty)
   - Build output directory: /
6. Click "Save and Deploy"

## Post-Deployment Configuration

### 1. Update Telegram Bot Links

After deployment, update your Telegram bot to point to your live domain:

```javascript
// In your Telegram bot code
const websiteUrl = 'https://your-domain.vercel.app';
```

### 2. Configure Custom Domain

#### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### Netlify:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS

#### Cloudflare Pages:
1. Go to your project → Custom domains
2. Add domain
3. DNS is automatically configured if using Cloudflare DNS

### 3. Environment Variables (if needed)

If you add backend integration:

#### Vercel:
```bash
vercel env add API_URL
```

#### Netlify:
Site Settings → Build & deploy → Environment

#### Cloudflare Pages:
Settings → Environment variables

## SSL/HTTPS

All three platforms provide automatic HTTPS:
- Vercel: Automatic SSL
- Netlify: Automatic SSL
- Cloudflare Pages: Automatic SSL

## Performance Optimization

### Enable Caching

All platforms automatically cache static assets. For additional optimization:

1. **Image Optimization**: Consider using platform-specific image optimization
2. **CDN**: All platforms use global CDN by default
3. **Compression**: Gzip/Brotli enabled automatically

## Monitoring

### Vercel
- Analytics: Enable in Project Settings
- Logs: Available in deployment details

### Netlify
- Analytics: Available as add-on
- Logs: Function logs in dashboard

### Cloudflare Pages
- Analytics: Cloudflare Web Analytics
- Logs: Available in dashboard

## Continuous Deployment

All platforms support automatic deployment on Git push:

1. Push to your repository
2. Platform automatically detects changes
3. Builds and deploys new version
4. Live in seconds!

## Rollback

### Vercel
```bash
vercel rollback
```
Or use dashboard to promote previous deployment

### Netlify
Dashboard → Deploys → Click on previous deploy → "Publish deploy"

### Cloudflare Pages
Dashboard → Deployments → Rollback to previous

## Troubleshooting

### Build Fails
- Check build logs in dashboard
- Ensure all files are committed
- Verify file paths are correct

### 404 Errors
- Check routing configuration
- Ensure all HTML files are in root directory
- Verify internal links

### Slow Loading
- Enable image lazy loading (already implemented)
- Check network tab in browser DevTools
- Consider image compression

## Support

- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Cloudflare: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)

## Cost

All platforms offer generous free tiers:
- **Vercel**: Free for personal projects
- **Netlify**: 100GB bandwidth/month free
- **Cloudflare Pages**: Unlimited bandwidth free

Perfect for Siidona Marketplace!
