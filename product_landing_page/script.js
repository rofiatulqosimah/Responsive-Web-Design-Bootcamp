let cart = [];
let cartCount = 0;
let totalPrice = 0;

function addToCart(productName, price) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    cartCount += 1;
    totalPrice += price;
    updateCartDisplay();
}

function removeFromCart(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        cartCount -= product.quantity;
        totalPrice -= product.price * product.quantity;
        cart = cart.filter(item => item.name !== productName);
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("total-price").innerText = totalPrice;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.innerHTML += `<li>${item.name} x${item.quantity} - Rp ${item.price * item.quantity} 
        <button onclick="removeFromCart('${item.name}')">Remove</button></li>`;
    });
}

function toggleCartModal() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function openCheckoutForm() {
    toggleCartModal();
    toggleCheckoutModal();
}

function toggleCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function confirmOrder(event) {
    event.preventDefault();
    alert("Pesanan Anda telah dikonfirmasi!");
    resetCart();
}

function resetCart() {
    cart = [];
    cartCount = 0;
    totalPrice = 0;
    updateCartDisplay();
    toggleCheckoutModal();
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim.');
    this.reset();
});

// Fungsi untuk A/B testing
function abTest() {
    const variant = Math.random() < 0.5 ? 'A' : 'B';
    if (variant === 'A') {
        document.querySelector('.cta-button').style.backgroundColor = '#FF4444';
    } else {
        document.querySelector('.cta-button').style.backgroundColor = '#4CAF50';
    }
    // Kirim data varian ke Google Analytics
    gtag('event', 'ab_test', {
        'event_category': 'experiment',
        'event_label': 'CTA Button Color',
        'value': variant
    });
}

// Panggil fungsi A/B testing saat halaman dimuat
window.addEventListener('load', abTest);

// Tambahkan fungsi ini ke file JavaScript yang sudah ada

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Terima kasih telah berlangganan!');
    this.reset();
});

// Fungsi untuk animasi scroll halus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fungsi untuk animasi fade-in elemen saat di-scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);
