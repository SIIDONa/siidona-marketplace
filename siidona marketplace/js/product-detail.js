// Product detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId || typeof productsData === 'undefined') {
        window.location.href = 'products.html';
        return;
    }

    const product = productsData.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    displayProductDetail(product);
    loadRelatedProducts(product);
});

function displayProductDetail(product) {
    const container = document.getElementById('product-detail-content');
    if (!container) return;

    const specsHTML = product.specs ? 
        `<ul class="product-specs">
            ${product.specs.map(spec => `<li>${sanitizeInput(spec)}</li>`).join('')}
        </ul>` : '';

    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(product.name)}">
            </div>
            <div class="product-detail-info">
                <h1>${sanitizeInput(product.name)}</h1>
                <p class="product-detail-price">${sanitizeInput(product.price)} ETB</p>
                <span class="product-status ${product.stock}">${getStockText(product.stock)}</span>
                
                <div class="product-detail-description">
                    <h2>Description</h2>
                    <p>${sanitizeInput(product.description)}</p>
                </div>

                ${product.specs ? '<div class="product-specifications"><h2>Specifications</h2>' + specsHTML + '</div>' : ''}

                <div class="product-actions">
                    <a href="https://t.me/sidona_marketbot?start=product_${product.id}" 
                       class="btn btn-primary btn-large" 
                       target="_blank">
                        Order via Telegram
                    </a>
                </div>
            </div>
        </div>
    `;
}

function loadRelatedProducts(currentProduct) {
    const grid = document.getElementById('related-products-grid');
    if (!grid || typeof productsData === 'undefined') return;

    const related = productsData
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        grid.parentElement.style.display = 'none';
        return;
    }

    related.forEach(product => {
        const card = createProductCard(product);
        card.addEventListener('click', function() {
            window.location.href = `product-detail.html?id=${product.id}`;
        });
        card.style.cursor = 'pointer';
        grid.appendChild(card);
    });
}
