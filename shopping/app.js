// --- Cart utilities ---
function getCart() {
  return JSON.parse(localStorage.getItem('shopcraft-cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('shopcraft-cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`${product.emoji} ${product.name} added to cart!`);
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  const badges = document.querySelectorAll('#cart-count');
  badges.forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'inline-flex' : 'none';
  });
}

// --- Product card renderer ---
function renderProductCard(product) {
  const stars = renderStars(product.rating);
  return `
    <div class="product-card">
      <div class="product-emoji">${product.emoji}</div>
      <div class="product-info">
        <span class="product-category">${capitalize(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-rating">${stars} <span>(${product.rating})</span></div>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- Toast notification ---
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
