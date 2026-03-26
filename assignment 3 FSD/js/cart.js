// Shopping Cart JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-message');
    const cartTable = document.getElementById('cart-table');
    const cartSummary = document.getElementById('cart-summary');

    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        cartTable.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    cartTable.style.display = 'table';
    cartSummary.style.display = 'block';

    const products = await fetchProducts(); // From main.js
    let totalAmount = 0;

    container.innerHTML = cart.map((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (!product) return ''; // Should handle this case better usually

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        return `
            <tr>
                <td style="width: 50%;">
                    <div class="d-flex align-items-center">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid rounded me-3" style="width: 80px; height: 80px; object-fit: cover;">
                        <div>
                            <h6 class="mb-0"><a href="product-detail.html?id=${product.id}" class="text-white text-decoration-none">${product.name}</a></h6>
                            <small class="text-muted">Brand: ${product.brand}</small>
                        </div>
                    </div>
                </td>
                <td class="align-middle">₹${product.price.toLocaleString('en-IN')}</td>
                <td class="align-middle">
                    <div class="input-group input-group-sm" style="width: 100px;">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateCartItemQty('${product.id}', ${item.quantity - 1})">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" type="button" onclick="updateCartItemQty('${product.id}', ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td class="align-middle">₹${itemTotal.toLocaleString('en-IN')}</td>
                <td class="align-middle text-end">
                    <button class="btn btn-sm btn-danger" onclick="removeCartItem('${product.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');

    document.getElementById('cart-subtotal').textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
    document.getElementById('cart-total').textContent = `₹${totalAmount.toLocaleString('en-IN')}`; // Assuming free shipping for now
}

function updateCartItemQty(productId, newQty) {
    if (newQty < 1) return;
    if (newQty > 10) return; // Max limit

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount(); // Update badge
    }
}

function removeCartItem(productId) {
    if (!confirm('Are you sure you want to remove this item?')) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function checkout() {
    alert('Checkout functionality is currently under development!');
}
