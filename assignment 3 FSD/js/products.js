// Product Catalog JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // Event listeners for filters
    document.querySelectorAll('.category-filter').forEach(radio => {
        radio.addEventListener('change', filterProducts);
    });

    document.getElementById('sort-select').addEventListener('change', filterProducts);
});

let allProducts = [];

async function loadProducts() {
    allProducts = await fetchProducts(); // Uses fetchProducts from main.js (make sure main.js is loaded first)

    // Check URL params for initial category filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        const radio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (radio) radio.checked = true;
    }

    filterProducts();
}

function filterProducts() {
    let filtered = [...allProducts];

    // Category Filter
    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
    if (selectedCategory && selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort
    const sortValue = document.getElementById('sort-select').value;
    if (sortValue === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

function renderProducts(products) {
    const container = document.getElementById('products-grid');
    const countLabel = document.getElementById('product-count');

    countLabel.textContent = `Showing ${products.length} products`;

    if (products.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>No products found.</p></div>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card">
                <div class="product-img-wrapper">
                     <a href="product-detail.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="product-title"><a href="product-detail.html?id=${product.id}" class="text-white text-decoration-none">${product.name}</a></h5>
                     <div class="d-flex align-items-center mb-2">
                        <span class="product-rating me-2">${product.rating} <i class="fas fa-star"></i></span>
                        <span class="text-muted small">(${product.reviews})</span>
                    </div>
                    <p class="text-muted small mb-2">${product.brand}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="btn btn-outline-primary btn-sm" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
