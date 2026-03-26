// Product Detail JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
});

async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('product-detail-container').innerHTML = '<p class="text-center">Product not found.</p>';
        return;
    }

    const products = await fetchProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.getElementById('product-detail-container').innerHTML = '<p class="text-center">Product not found.</p>';
        return;
    }

    renderProductDetail(product);
}

function renderProductDetail(product) {
    const container = document.getElementById('product-detail-container');
    const specsHtml = Object.entries(product.specs).map(([key, value]) => `
        <tr>
            <th scope="row">${key}</th>
            <td>${value}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="col-md-6 mb-4">
            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-md-6">
            <h2 class="mb-3">${product.name}</h2>
            <div class="d-flex align-items-center mb-3">
                 <span class="badge bg-success me-2">${product.rating} <i class="fas fa-star"></i></span>
                 <span class="text-muted">(${product.reviews} reviews)</span>
            </div>
            
            <h3 class="text-primary mb-3">₹${product.price.toLocaleString('en-IN')}</h3>
             <p class="text-decoration-line-through text-muted">₹${product.originalPrice.toLocaleString('en-IN')}</p>
            
            <p class="lead mb-4">${product.description}</p>
            
            <div class="mb-4">
                <h5>Specifications:</h5>
                <table class="table table-striped">
                    <tbody>
                        ${specsHtml}
                    </tbody>
                </table>
            </div>

            <div class="d-flex align-items-center mb-4">
                <div class="input-group me-3" style="width: 130px;">
                    <button class="btn btn-outline-secondary" type="button" onclick="decrementQty()">-</button>
                    <input type="number" class="form-control text-center" id="quantity" value="1" min="1" max="10">
                    <button class="btn btn-outline-secondary" type="button" onclick="incrementQty()">+</button>
                </div>
                <button class="btn btn-primary btn-lg" onclick="addToCartDetail('${product.id}')">
                    <i class="fas fa-shopping-cart me-2"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function incrementQty() {
    const input = document.getElementById('quantity');
    let val = parseInt(input.value);
    if (val < 10) input.value = val + 1;
}

function decrementQty() {
    const input = document.getElementById('quantity');
    let val = parseInt(input.value);
    if (val > 1) input.value = val - 1;
}

function addToCartDetail(productId) {
    const quantity = parseInt(document.getElementById('quantity').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // From main.js

    // Show toast or alert
    const toast = document.getElementById('cartToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    toastBootstrap.show();
}
