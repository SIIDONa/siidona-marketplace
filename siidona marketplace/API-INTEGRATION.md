# API Integration Guide

This guide explains how to integrate Siidona Marketplace with a backend API.

## Overview

The current implementation uses static data in `js/products-data.js`. To connect to a real backend:

1. Replace static data with API calls
2. Implement authentication for admin panel
3. Connect contact form to email service
4. Integrate with Telegram bot backend

## Products API

### Fetch All Products

Replace in `js/products-data.js`:

```javascript
// Current: Static array
const productsData = [...];

// Replace with:
let productsData = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://api.siidona.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        productsData = await response.json();
        return productsData;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Call on page load
fetchProducts().then(() => {
    // Initialize page with products
    if (typeof displayProducts === 'function') {
        displayProducts(productsData);
    }
});
```

### API Endpoints

```
GET    /api/products              - Get all products
GET    /api/products/:id          - Get single product
POST   /api/products              - Create product (admin)
PUT    /api/products/:id          - Update product (admin)
DELETE /api/products/:id          - Delete product (admin)
GET    /api/products/category/:cat - Get products by category
GET    /api/products/search?q=    - Search products
```

### Expected Response Format

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "category": "phones",
      "price": "85000",
      "description": "Latest iPhone with A17 Pro chip",
      "image": "https://cdn.siidona.com/images/iphone-15-pro.jpg",
      "stock": "in-stock",
      "featured": true,
      "specs": ["6.1\" Display", "A17 Pro Chip", "128GB Storage"]
    }
  ]
}
```

## Contact Form API

Update `js/contact.js`:

```javascript
async function submitContactForm(name, email, message) {
    try {
        const response = await fetch('https://api.siidona.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        
        if (result.success) {
            showMessage('Thank you! We will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showMessage('Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
}
```

## Admin Authentication

Add authentication to `admin.html`:

```javascript
// Check authentication on page load
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
        window.location.href = 'admin-login.html';
        return;
    }

    try {
        const response = await fetch('https://api.siidona.com/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem('adminToken');
            window.location.href = 'admin-login.html';
            return;
        }

        // Load admin dashboard
        loadAdminProducts();
    } catch (error) {
        console.error('Auth error:', error);
        window.location.href = 'admin-login.html';
    }
});
```

## Admin CRUD Operations

### Create Product

```javascript
async function createProduct(productData) {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch('https://api.siidona.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Product created successfully!');
            loadAdminProducts();
        } else {
            alert('Failed to create product: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
    }
}
```

### Update Product

```javascript
async function updateProduct(id, productData) {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`https://api.siidona.com/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Product updated successfully!');
            loadAdminProducts();
        } else {
            alert('Failed to update product: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
    }
}
```

### Delete Product

```javascript
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`https://api.siidona.com/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Product deleted successfully!');
            loadAdminProducts();
        } else {
            alert('Failed to delete product: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
    }
}
```

## Telegram Bot Integration

### Backend Webhook

Your backend should handle Telegram webhooks:

```javascript
// Example Node.js/Express endpoint
app.post('/webhook/telegram', async (req, res) => {
    const { message } = req.body;
    
    if (message.text.startsWith('/start product_')) {
        const productId = message.text.split('_')[1];
        const product = await getProductById(productId);
        
        // Send product details to user
        await sendTelegramMessage(message.chat.id, {
            text: `${product.name}\n\nPrice: ${product.price} ETB\n\n${product.description}`,
            reply_markup: {
                inline_keyboard: [[
                    { text: 'Order Now', callback_data: `order_${productId}` }
                ]]
            }
        });
    }
    
    res.sendStatus(200);
});
```

### Order Processing

```javascript
// Handle order callback
app.post('/webhook/telegram', async (req, res) => {
    const { callback_query } = req.body;
    
    if (callback_query && callback_query.data.startsWith('order_')) {
        const productId = callback_query.data.split('_')[1];
        
        // Create order in database
        const order = await createOrder({
            userId: callback_query.from.id,
            productId: productId,
            status: 'pending'
        });
        
        // Send confirmation
        await sendTelegramMessage(callback_query.message.chat.id, {
            text: `Order confirmed! Order ID: ${order.id}\n\nWe'll contact you shortly for delivery details.`
        });
    }
    
    res.sendStatus(200);
});
```

## Environment Variables

Create `.env` file (don't commit to Git):

```env
API_BASE_URL=https://api.siidona.com
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=SiidonaBot
ADMIN_EMAIL=admin@siidona.com
```

Load in JavaScript:

```javascript
// For frontend (use build-time replacement)
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.siidona.com';
const TELEGRAM_BOT = process.env.TELEGRAM_BOT_USERNAME || 'SiidonaBot';
```

## Error Handling

Implement consistent error handling:

```javascript
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        
        // Show user-friendly message
        if (error.message.includes('Failed to fetch')) {
            alert('Network error. Please check your connection.');
        } else {
            alert('An error occurred. Please try again.');
        }
        
        throw error;
    }
}
```

## Rate Limiting

Implement client-side rate limiting:

```javascript
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    async throttle() {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.timeWindow);

        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = this.requests[0];
            const waitTime = this.timeWindow - (now - oldestRequest);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.requests.push(Date.now());
    }
}

// Usage
const limiter = new RateLimiter(10, 60000); // 10 requests per minute

async function fetchProducts() {
    await limiter.throttle();
    // Make API call
}
```

## Caching

Implement simple caching:

```javascript
class Cache {
    constructor(ttl = 300000) { // 5 minutes default
        this.cache = new Map();
        this.ttl = ttl;
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }
}

// Usage
const productCache = new Cache();

async function fetchProducts() {
    const cached = productCache.get('products');
    if (cached) return cached;

    const products = await apiRequest('https://api.siidona.com/products');
    productCache.set('products', products);
    return products;
}
```

## Testing

Test API integration:

```javascript
// Test products endpoint
async function testProductsAPI() {
    console.log('Testing products API...');
    
    try {
        const products = await fetchProducts();
        console.log('✓ Products fetched:', products.length);
        
        if (products.length > 0) {
            console.log('✓ Sample product:', products[0]);
        }
    } catch (error) {
        console.error('✗ Products API failed:', error);
    }
}

// Run tests
testProductsAPI();
```

## Next Steps

1. Set up backend API (Node.js, Python, PHP, etc.)
2. Configure database (PostgreSQL, MongoDB, etc.)
3. Implement authentication
4. Set up Telegram bot webhook
5. Test all endpoints
6. Deploy backend
7. Update frontend with API URLs
8. Test end-to-end flow

## Recommended Backend Stack

- **Node.js + Express**: Fast, JavaScript-based
- **Python + FastAPI**: Modern, type-safe
- **PHP + Laravel**: Mature, well-documented
- **Database**: PostgreSQL or MongoDB
- **Hosting**: Railway, Render, or DigitalOcean

## Security Checklist

- [ ] Use HTTPS for all API calls
- [ ] Implement JWT authentication
- [ ] Validate all inputs server-side
- [ ] Use CORS properly
- [ ] Rate limit API endpoints
- [ ] Sanitize database queries
- [ ] Store passwords hashed (bcrypt)
- [ ] Use environment variables for secrets
- [ ] Implement CSRF protection
- [ ] Log security events
