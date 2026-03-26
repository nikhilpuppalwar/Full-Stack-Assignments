// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the homepage
    if (document.getElementById('featured-products-container')) {
        loadFeaturedProducts();
    }

    updateCartCount();

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Fetch products from JSON
async function fetchProducts() {
    try {
        // Check if we are in the pages directory to adjust path
        const isPagesDir = window.location.pathname.includes('/pages/');
        const path = isPagesDir ? '../data/products.json' : 'data/products.json';

        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Load Featured Products
async function loadFeaturedProducts() {
    const products = await fetchProducts();
    const container = document.getElementById('featured-products-container');
    const featuredProducts = products.filter(p => p.featured).slice(0, 4); // Show top 4 featured

    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Create Product Card HTML
function createProductCard(product) {
    // Logic to show stars for rating
    return `
        <div class="col-md-3 col-sm-6 mb-4">
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                </div>
                <div class="card-body">
                    <h5 class="product-title" title="${product.name}">${product.name}</h5>
                    <div class="d-flex align-items-center mb-2">
                        <span class="product-rating me-2">${product.rating} <i class="fas fa-star"></i></span>
                        <span class="text-muted small">(${product.reviews})</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                         <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Cart Functionality (Simple version for now)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}
