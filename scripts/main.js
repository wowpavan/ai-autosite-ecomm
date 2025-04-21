// Main script with dark mode toggle
// Cart management
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart.`);
}

function displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = ""; // Clear existing content

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("flex", "justify-between");
        itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
    `;
        cartItemsDiv.appendChild(itemDiv);
    });

    // Display total cost
    const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById("total-cost").innerText = `Total: $${totalCost}`;
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Checkout function
document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Gather user details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    // Handle order submission (for now, we just display the order)
    alert(`Order placed successfully! \nName: ${name} \nEmail: ${email} \nAddress: ${address}`);

    // Clear cart after checkout
    clearCart();
});

// Display cart when the page loads
window.onload = displayCart;
