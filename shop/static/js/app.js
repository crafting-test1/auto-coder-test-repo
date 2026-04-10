/**
 * CraftShop - Client-side shopping cart and UI interactions.
 *
 * Cart data is persisted in localStorage so it survives page reloads.
 */

// ---------------------------------------------------------------------------
// Cart state (localStorage-backed)
// ---------------------------------------------------------------------------

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("craftshop_cart")) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("craftshop_cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll("#cart-count");
    badges.forEach((el) => (el.textContent = count));
}

// ---------------------------------------------------------------------------
// Cart operations
// ---------------------------------------------------------------------------

function addToCart(productId, quantity) {
    quantity = quantity || 1;

    fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
    })
        .then((r) => r.json())
        .then((data) => {
            if (!data.ok) {
                showToast("Product not found", true);
                return;
            }
            const cart = getCart();
            const existing = cart.find((i) => i.product_id === productId);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({
                    product_id: data.product.id,
                    name: data.product.name,
                    price: data.product.price,
                    image: data.product.image,
                    quantity: quantity,
                });
            }
            saveCart(cart);
            showToast(`Added ${data.product.name} to cart \u2713`);
        })
        .catch(() => showToast("Failed to add item", true));
}

function removeFromCart(productId) {
    const cart = getCart().filter((i) => i.product_id !== productId);
    saveCart(cart);
    renderCartPage();
}

function updateQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find((i) => i.product_id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity < 1) {
        removeFromCart(productId);
        return;
    }
    saveCart(cart);
    renderCartPage();
}

function clearCart() {
    saveCart([]);
    renderCartPage();
}

// ---------------------------------------------------------------------------
// Cart page rendering
// ---------------------------------------------------------------------------

function renderCartPage() {
    const cart = getCart();
    const emptyEl = document.getElementById("cart-empty");
    const contentEl = document.getElementById("cart-content");
    const itemsEl = document.getElementById("cart-items");

    if (!emptyEl || !contentEl) return; // not on cart page

    if (cart.length === 0) {
        emptyEl.classList.remove("hidden");
        contentEl.classList.add("hidden");
        return;
    }

    emptyEl.classList.add("hidden");
    contentEl.classList.remove("hidden");

    let html = "";
    let subtotal = 0;

    cart.forEach((item) => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;
        html += `
        <div class="cart-item">
            <div class="cart-item-image">${escapeHtml(item.image)}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${escapeHtml(item.name)}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-qty">
                    <button onclick="updateQuantity(${item.product_id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.product_id}, 1)">+</button>
                </div>
                <strong>$${lineTotal.toFixed(2)}</strong>
                <button class="remove-btn" onclick="removeFromCart(${item.product_id})" title="Remove">🗑️</button>
            </div>
        </div>`;
    });

    itemsEl.innerHTML = html;

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// ---------------------------------------------------------------------------
// Navigation helpers
// ---------------------------------------------------------------------------

function viewProduct(id) {
    window.location.href = `/product?id=${id}`;
}

function checkout() {
    showToast("Checkout coming soon! \ud83d\ude80");
}

// ---------------------------------------------------------------------------
// Toast notification
// ---------------------------------------------------------------------------

function showToast(message, isError) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = isError ? "#ef4444" : "#1e293b";
    toast.classList.remove("hidden");
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.add("hidden"), 2500);
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});
