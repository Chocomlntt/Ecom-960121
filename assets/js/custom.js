document.addEventListener('DOMContentLoaded', function () {
  const CART_KEY = 'jefshop_cart';
  const badge = document.getElementById('cart-count');

  if (!badge) return;

  function updateBadge() {
    let cart = {};
    try {
      cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch (err) {
      cart = {};
    }

    const total = Object.values(cart).reduce((sum, qty) => sum + Number(qty || 0), 0);
    badge.textContent = total;
  }

  updateBadge();

  window.addEventListener('storage', updateBadge);
});
