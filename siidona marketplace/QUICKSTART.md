# Quick Start Guide - Siidona Marketplace

Get your marketplace up and running in 5 minutes!

## 🚀 Instant Preview

1. **Download the project**
2. **Open `index.html` in your browser**
3. **Done!** Your marketplace is running locally

No installation, no build process, no dependencies!

## 📝 Before You Deploy

### 1. Update Telegram Bot (2 minutes)

Replace `@SiidonaBot` with your bot username in these files:
- All HTML files (search for `SiidonaBot`)

**Quick find & replace:**
```bash
# On Mac/Linux
find . -name "*.html" -exec sed -i 's/SiidonaBot/YourBotName/g' {} +

# On Windows (PowerShell)
Get-ChildItem -Recurse -Filter *.html | ForEach-Object { (Get-Content $_.FullName) -replace 'SiidonaBot', 'YourBotName' | Set-Content $_.FullName }
```

### 2. Update Contact Email (1 minute)

Replace `info@siidona.com` with your email:
- All HTML files (search for `info@siidona.com`)

### 3. Update Domain in Sitemap (1 minute)

Edit `sitemap.xml`:
- Replace `https://siidona-marketplace.com` with your domain

## 🌐 Deploy in 3 Steps

### Option A: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel
```

Your site is live! 🎉

### Option B: Netlify (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done! Your site is live! 🎉

### Option C: Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Pages → Create a project
3. Connect your Git repo
4. Deploy! 🎉

## 🎨 Customize Your Brand

### Change Colors (2 minutes)

Edit `css/styles.css` - find this section:

```css
:root {
    --primary-color: #1e3a8a;      /* Change this */
    --secondary-color: #3b82f6;    /* And this */
    --accent-color: #60a5fa;       /* And this */
}
```

### Add Your Products (5 minutes)

Edit `js/products-data.js`:

```javascript
const productsData = [
    {
        id: 1,
        name: 'Your Product Name',
        category: 'phones', // or computers, cameras, etc.
        price: '50000',
        description: 'Your product description',
        image: 'https://your-image-url.com/image.jpg',
        stock: 'in-stock', // or 'out-of-stock', 'limited'
        featured: true, // Show on home page
        specs: ['Spec 1', 'Spec 2', 'Spec 3']
    },
    // Add more products...
];
```

### Update About Page (3 minutes)

Edit `about.html` - update these sections:
- Who We Are
- Our Mission
- Our Vision

## 📱 Test Your Site

### Local Testing

1. Open `index.html` in browser
2. Test on mobile (Chrome DevTools → Toggle device toolbar)
3. Click through all pages
4. Test search and filters
5. Test contact form

### After Deployment

1. Visit your live URL
2. Test Telegram links
3. Test on real mobile device
4. Share with friends for feedback

## 🔧 Common Customizations

### Add More Categories

1. Edit `index.html` - add category card:
```html
<a href="products.html?category=tablets" class="category-card">
    <div class="category-icon">📱</div>
    <h3>Tablets</h3>
</a>
```

2. Edit `products.html` - add to filter:
```html
<option value="tablets">Tablets</option>
```

### Change Hero Text

Edit `index.html`:
```html
<h1>Your Marketplace Name</h1>
<p class="subtitle">Your tagline here</p>
```

### Add Social Media Links

Edit footer in all HTML files:
```html
<div class="footer-section">
    <h4>Follow Us</h4>
    <ul>
        <li><a href="https://facebook.com/yourpage">Facebook</a></li>
        <li><a href="https://instagram.com/yourpage">Instagram</a></li>
    </ul>
</div>
```

## 🎯 Pro Tips

### Tip 1: Use Real Images
Replace placeholder images with real product photos:
- Recommended size: 800x600px
- Format: JPG or WebP
- Optimize before uploading (use TinyPNG.com)

### Tip 2: SEO Optimization
After deployment:
1. Submit sitemap to Google Search Console
2. Add Google Analytics
3. Update meta descriptions for your products

### Tip 3: Performance
- Host images on CDN (Cloudinary, ImageKit)
- Enable caching on your hosting platform
- Compress images before uploading

### Tip 4: Security
- Always use HTTPS (automatic on Vercel/Netlify/Cloudflare)
- Don't commit sensitive data to Git
- Use environment variables for API keys

## 🐛 Troubleshooting

### Products Not Showing?
- Check browser console for errors (F12)
- Verify `js/products-data.js` is loaded
- Check file paths are correct

### Telegram Links Not Working?
- Verify bot username is correct
- Test bot separately in Telegram
- Check deep link format

### Mobile Menu Not Working?
- Check `js/main.js` is loaded
- Clear browser cache
- Test in different browser

### Contact Form Not Submitting?
- Currently shows success message only
- Connect to backend API for real functionality
- See `API-INTEGRATION.md` for details

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **API Integration**: See `API-INTEGRATION.md`
- **Project Summary**: See `PROJECT-SUMMARY.md`

## ✅ Checklist Before Going Live

- [ ] Updated Telegram bot username
- [ ] Updated contact email
- [ ] Updated domain in sitemap
- [ ] Added real products
- [ ] Replaced placeholder images
- [ ] Tested all pages
- [ ] Tested on mobile
- [ ] Tested Telegram links
- [ ] Deployed to hosting
- [ ] Configured custom domain (optional)
- [ ] Added analytics (optional)
- [ ] Submitted sitemap to Google

## 🎉 You're Ready!

Your Siidona Marketplace is ready to launch!

**Need help?** Check the documentation files or open an issue.

**Happy selling!** 🛍️

---

**Quick Links:**
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [API-INTEGRATION.md](API-INTEGRATION.md) - Backend integration
- [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md) - Project overview
