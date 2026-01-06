// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Load featured products on home page
    if (document.getElementById('featured-products-grid')) {
        loadFeaturedProducts();
    }
});

// Load featured products
function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid || typeof productsData === 'undefined') return;

    const featured = productsData.filter(p => p.featured).slice(0, 6);
    
    featured.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(product.name)}" class="product-image" loading="lazy">
        <div class="product-info">
            <h3 class="product-name">${sanitizeInput(product.name)}</h3>
            <p class="product-price">${sanitizeInput(product.price)} ETB</p>
            <p class="product-description">${sanitizeInput(product.description)}</p>
            <span class="product-status ${product.stock}">${getStockText(product.stock)}</span>
            <a href="https://t.me/sidona_marketbot?start=product_${product.id}" class="btn btn-primary" target="_blank">Order via Telegram</a>
        </div>
    `;
    
    return card;
}

// Get stock status text
function getStockText(stock) {
    const stockTexts = {
        'in-stock': 'In Stock',
        'out-of-stock': 'Out of Stock',
        'limited': 'Limited Stock'
    };
    return stockTexts[stock] || 'Unknown';
}

// Input sanitization
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}
