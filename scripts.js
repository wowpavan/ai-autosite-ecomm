// scripts.js

// Dummy product data (normally comes from a backend or JSON file)
const products = [
  { id: 1, name: "Smart Speaker", price: 99 },
  { id: 2, name: "Smart Watch", price: 149 },
  { id: 3, name: "AI Drone", price: 299 }
];

// Simple cart logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return alert("Product not found");

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Attach event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Contact form
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! We'll contact you soon.");
      form.reset();
    });
  }

  // Add-to-cart buttons
  document.querySelectorAll('[data-product-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-product-id'));
      addToCart(id);
    });
  });
});
