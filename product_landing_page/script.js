// Product Data
const products = [
    {
        name: "Classic Oxford",
        price: 595,
        image: "Oxfordshoes.jpg",
        category: "Classic"
    },
    {
        name: "Modern Loafer",
        price: 495,
        image: "Loafershoes.jpg",
        category: "Modern"
    },
    {
        name: "Elegant Derby",
        price: 545,
        image: "Derbyshoes.jpg",
        category: "Classic"
    },
    {
        name: "Urban Sneaker",
        price: 445,
        image: "Sneakershoes.jpg",
        category: "Modern"
    }
];

let cart = [];
let currentProduct = null;

// Load Products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Clear existing products
    
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-3">
                <div class="product-card" onclick="showPurchaseForm(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <div class="product-actions">
                        <button class="btn btn-light w-100" onclick="event.stopPropagation(); addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productGrid.innerHTML += productHTML;
    });
}

// Cart Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const cartCountMobile = document.getElementById('cartCountMobile');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price}</p>
                </div>
                <i class="fas fa-trash remove-item" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    });

    cartTotal.textContent = `$${total}`;
    cartCount.textContent = cart.length;
    cartCountMobile.textContent = cart.length;
}

function showPurchaseForm(product) {
    currentProduct = product;
    const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    purchaseModal.show();
}

function submitPurchase() {
    alert('Thank you for your purchase! We will process your order shortly.');
    const purchaseModal = bootstrap.Modal.getInstance(document.getElementById('purchaseModal'));
    purchaseModal.hide();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    showPurchaseForm(cart[0]); // Show form for first item (you might want to handle multiple items differently)
}

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
});