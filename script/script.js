// Navbar scroll transparency effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  // Add transparent class when scrolling down
  if (window.scrollY > 50) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});
// Back To Top Button Logic
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", function () {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Product Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".card");

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();

    productCards.forEach(card => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      card.parentElement.style.display = title.includes(filter) ? "block" : "none";
    });
  });
});
// Persistent Cart Logic (LocalStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
// Render Cart Items
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item d-flex justify-content-between align-items-center mb-3">
        
        <!-- Product Info -->
        <div class="d-flex align-items-center">
          <img src="${item.image}" width="50" class="me-2">
          <div>
            <strong>${item.name}</strong>
            <div class="text-muted">$${item.price.toFixed(2)}</div>
          </div>
        </div>

        <!-- Quantity Controls -->
        <div class="d-flex align-items-center gap-2">
          <button class="qty-btn" onclick="changeQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = total.toFixed(2);
  cartCount.innerText = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Change Quantity (+ / − buttons)
function changeQuantity(index, change) {
  cart[index].quantity += change;

  // Remove item if quantity becomes zero
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}
// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}
// Toggle Cart Sidebar
cartIcon?.addEventListener("click", () => cartSidebar.classList.add("active"));
closeCart?.addEventListener("click", () => cartSidebar.classList.remove("active"));
// Add to Cart (Buy Now buttons - Home Page)
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price) || 0;
    const image = btn.dataset.image;

    const existingIndex = cart.findIndex(item => item.name === name);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    renderCart();
    cartSidebar.classList.add("active");
  });
});
// Typing Effect (Hero Section)
document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typingText");
  const messages = [
    "Discover our gentle and effective skincare products...",
    "Gentle on skin, powerful on glow ✨"
  ];

  let msgIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < messages[msgIndex].length) {
      typingText.textContent += messages[msgIndex][charIndex++];
      setTimeout(type, 80);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingText.textContent = messages[msgIndex].substring(0, --charIndex);
      setTimeout(erase, 40);
    } else {
      msgIndex = (msgIndex + 1) % messages.length;
      type();
    }
  }

  type();
});

// Buy It Now Button Logic
const buyNowBtn = document.getElementById("buyNowBtn");

buyNowBtn?.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some products first.");
        return;
    }

    window.location.href = "shipping.html";
});

renderCart();
