# Siidona Marketplace

A professional, secure, mobile-first electronics marketplace website with Telegram bot integration.

## Features

- **Multi-page Website**: Home, Products, Product Details, About, Contact, and Legal pages
- **Product Categories**: Phones, Computers, Cameras, Speakers, Storage Devices, Accessories
- **Search & Filter**: Search products, filter by category, sort by price
- **Telegram Integration**: Deep links to Telegram bot for ordering
- **Responsive Design**: Mobile-first, works on all devices
- **Admin Dashboard**: UI mockup for product and order management
- **Legal Compliance**: Privacy Policy, Terms & Conditions, Refund Policy

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: Mobile-first, responsive, accessible
- **Color Scheme**: Dark blue (#1e3a8a) and white
- **No Dependencies**: Pure HTML/CSS/JS for fast loading

## File Structure

```
siidona-marketplace/
├── index.html              # Home page
├── products.html           # Products listing
├── product-detail.html     # Product details
├── about.html              # About page
├── contact.html            # Contact page
├── privacy.html            # Privacy policy
├── terms.html              # Terms & conditions
├── refund.html             # Refund policy
├── admin.html              # Admin dashboard (UI only)
├── css/
│   ├── styles.css          # Main styles
│   └── admin.css           # Admin styles
├── js/
│   ├── main.js             # Main functionality
│   ├── products-data.js    # Product data
│   ├── products.js         # Products page logic
│   ├── product-detail.js   # Product detail logic
│   ├── contact.js          # Contact form logic
│   └── admin.js            # Admin dashboard logic
└── README.md
```

## Setup & Deployment

### Local Development

1. Clone or download the repository
2. Open `index.html` in a web browser
3. No build process required!

### Deployment Options

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
1. Drag and drop the folder to Netlify
2. Or connect your Git repository

#### Cloudflare Pages
1. Connect your Git repository
2. Build command: (none)
3. Output directory: /

## Configuration

### Telegram Bot Integration

Update the Telegram bot username in all files:
- Replace `@SiidonaBot` with your bot username
- Deep link format: `https://t.me/YourBot?start=product_{id}`

### Product Data

Edit `js/products-data.js` to:
- Add/remove products
- Update prices
- Change categories
- Modify product details

### Backend Integration

To connect to a backend API:

1. **Products**: Replace `productsData` array with API calls
2. **Contact Form**: Update `js/contact.js` to POST to your API
3. **Admin Dashboard**: Connect CRUD operations to your API

Example API integration:
```javascript
// Fetch products from API
async function loadProducts() {
    const response = await fetch('https://your-api.com/products');
    const products = await response.json();
    return products;
}
```

## Security Features

- Input sanitization on all user inputs
- No client-side storage of sensitive data
- HTTPS-ready
- GDPR-compliant privacy policy
- Secure form handling

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #3b82f6;
    --accent-color: #60a5fa;
}
```

### Contact Information
Update in all HTML files:
- Email: `info@siidona.com`
- Telegram: `@SiidonaBot`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Lazy loading images
- Minimal CSS/JS
- No external dependencies
- Optimized for fast loading

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader friendly

## License

All rights reserved © 2026 Siidona Marketplace

## Support

For questions or support:
- Email: info@siidona.com
- Telegram: @SiidonaBot
