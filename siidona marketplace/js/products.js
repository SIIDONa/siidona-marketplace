// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const noResults = document.getElementById('no-results');

    let currentProducts = [...productsData];

    // Check URL parameters for category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categoryFilter) {
        categoryFilter.value = categoryParam;
    }

    // Initial load
    displayProducts(currentProducts);

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Filter functionality
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }

    function performSearch() {
        applyFilters();
    }

    function applyFilters() {
        let filtered = [...productsData];

        // Search filter
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        const category = categoryFilter ? categoryFilter.value : 'all';
        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        // Sort
        const sortBy = sortFilter ? sortFilter.value : 'default';
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        currentProducts = filtered;
        displayProducts(currentProducts);
    }

    function displayProducts(products) {
        if (!productsGrid) return;

        productsGrid.innerHTML = '';

        if (products.length === 0) {
            if (noResults) noResults.style.display = 'block';
            return;
        }

        if (noResults) noResults.style.display = 'none';

        products.forEach(product => {
            const card = createProductCard(product);
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('btn')) {
                    window.location.href = `product-detail.html?id=${product.id}`;
                }
            });
            card.style.cursor = 'pointer';
            productsGrid.appendChild(card);
        });
    }
});
