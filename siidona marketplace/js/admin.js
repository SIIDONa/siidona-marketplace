// Admin dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Display current date
    displayCurrentDate();

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // Load products
    loadAdminProducts();
    loadAdminOrders();
    updateStatistics();

    // Admin filters
    setupAdminFilters();

    // Modal functionality
    const modal = document.getElementById('product-modal');
    const addBtn = document.getElementById('add-product-btn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancel-btn');
    const productForm = document.getElementById('product-form');

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            modal.classList.add('active');
            document.getElementById('modal-title').textContent = 'Add New Product';
            productForm.reset();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('product-name').value,
                category: document.getElementById('product-category').value,
                price: document.getElementById('product-price').value,
                stock: document.getElementById('product-stock').value,
                description: document.getElementById('product-description').value,
                image: document.getElementById('product-image').value,
                specs: document.getElementById('product-specs').value.split('\n').filter(s => s.trim()),
                featured: document.getElementById('product-featured').checked
            };

            // In production, send to backend API
            console.log('Product data:', formData);
            alert('✅ Product saved successfully!\n\n(This is a UI mockup - connect to backend API to save data)');
            modal.classList.remove('active');
            productForm.reset();
        });
    }

    // Order status filters
    setupOrderFilters();
});

function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

function setupAdminFilters() {
    const searchInput = document.getElementById('admin-search');
    const categoryFilter = document.getElementById('admin-category-filter');
    const stockFilter = document.getElementById('admin-stock-filter');

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (stockFilter) {
        stockFilter.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    const searchTerm = document.getElementById('admin-search')?.value.toLowerCase() || '';
    const category = document.getElementById('admin-category-filter')?.value || 'all';
    const stock = document.getElementById('admin-stock-filter')?.value || 'all';

    let filtered = [...productsData];

    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (stock !== 'all') {
        filtered = filtered.filter(p => p.stock === stock);
    }

    displayAdminProducts(filtered);
}

function displayAdminProducts(products) {
    const tbody = document.getElementById('admin-products-list');
    if (!tbody) return;

    tbody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${product.id}</strong></td>
            <td><img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(product.name)}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
            <td><strong>${sanitizeInput(product.name)}</strong></td>
            <td><span class="category-badge">${sanitizeInput(product.category)}</span></td>
            <td><strong>${sanitizeInput(product.price)} ETB</strong></td>
            <td><span class="product-status ${product.stock}">${getStockText(product.stock)}</span></td>
            <td>${product.featured ? '⭐ Yes' : 'No'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})" title="Edit">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})" title="Delete">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAdminProducts() {
    if (typeof productsData === 'undefined') return;
    displayAdminProducts(productsData);
}

function setupOrderFilters() {
    const filterBtns = document.querySelectorAll('.status-filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const status = this.dataset.status;
            filterOrders(status);
        });
    });
}

function filterOrders(status) {
    // In production, filter orders by status
    console.log('Filtering orders by status:', status);
}

function loadAdminOrders() {
    const tbody = document.getElementById('admin-orders-list');
    if (!tbody) return;

    // Sample orders for UI mockup
    const sampleOrders = [
        { id: 'ORD001', customer: 'Abebe Kebede', product: 'iPhone 15 Pro', date: '2026-01-05', status: 'pending', total: '85000' },
        { id: 'ORD002', customer: 'Tigist Alemu', product: 'MacBook Pro 14"', date: '2026-01-04', status: 'processing', total: '150000' },
        { id: 'ORD003', customer: 'Dawit Tesfaye', product: 'Sony WH-1000XM5', date: '2026-01-04', status: 'shipped', total: '25000' },
        { id: 'ORD004', customer: 'Meron Haile', product: 'Canon EOS R6', date: '2026-01-03', status: 'completed', total: '120000' },
        { id: 'ORD005', customer: 'Yohannes Bekele', product: 'Samsung Galaxy S24', date: '2026-01-03', status: 'completed', total: '65000' }
    ];

    tbody.innerHTML = '';

    sampleOrders.forEach(order => {
        const statusClass = order.status.toLowerCase();
        const statusEmoji = {
            'pending': '⏳',
            'processing': '🔄',
            'shipped': '🚚',
            'completed': '✅'
        };

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${sanitizeInput(order.id)}</strong></td>
            <td>${sanitizeInput(order.customer)}</td>
            <td>${sanitizeInput(order.product)}</td>
            <td>${sanitizeInput(order.date)}</td>
            <td><span class="order-status ${statusClass}">${statusEmoji[order.status]} ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td><strong>${sanitizeInput(order.total)} ETB</strong></td>
            <td>
                <button class="action-btn edit-btn" onclick="viewOrder('${order.id}')" title="View Details">👁️</button>
                <button class="action-btn" onclick="updateOrderStatus('${order.id}')" title="Update Status">📝</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateStatistics() {
    if (typeof productsData !== 'undefined') {
        document.getElementById('total-products').textContent = productsData.length;
    }
    document.getElementById('total-orders').textContent = '5';
    document.getElementById('total-revenue').textContent = '445,000';
    document.getElementById('pending-orders').textContent = '1';
}

function editProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    modal.classList.add('active');
    
    document.getElementById('modal-title').textContent = 'Edit Product';
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-image').value = product.image;
    
    if (product.specs) {
        document.getElementById('product-specs').value = product.specs.join('\n');
    }
    
    if (product.featured !== undefined) {
        document.getElementById('product-featured').checked = product.featured;
    }
}

function deleteProduct(id) {
    if (confirm('⚠️ Are you sure you want to delete this product?\n\nThis action cannot be undone.')) {
        alert('✅ Product deleted successfully!\n\n(This is a UI mockup - connect to backend API to delete data)');
        // In production, send DELETE request to backend
        console.log('Deleting product:', id);
    }
}

function viewOrder(orderId) {
    alert(`📦 Order Details: ${orderId}\n\n(This is a UI mockup - connect to backend API to view full order details)`);
}

function updateOrderStatus(orderId) {
    const newStatus = prompt('Enter new status:\n- pending\n- processing\n- shipped\n- completed');
    if (newStatus) {
        alert(`✅ Order ${orderId} status updated to: ${newStatus}\n\n(This is a UI mockup - connect to backend API to update status)`);
    }
}
