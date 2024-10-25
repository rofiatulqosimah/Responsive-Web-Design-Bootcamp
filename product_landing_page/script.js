// Product Data
const products = [
    {
        name: "Classic Oxford",
        price: "$595",
        image: "oxford.jpg",
        category: "Classic"
    },
    {
        name: "Modern Loafer",
        price: "$495",
        image: "loafer.jpg",
        category: "Modern"
    },
    {
        name: "Elegant Derby",
        price: "$545",
        image: "derby.jpg",
        category: "Classic"
    },
    {
        name: "Urban Sneaker",
        price: "$445",
        image: "sneaker.jpg",
        category: "Modern"
    }
];

// Load Products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-3">
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                </div>
            </div>
        `;
        productGrid.innerHTML += productHTML;
    });
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
});