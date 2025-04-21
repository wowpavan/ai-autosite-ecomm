// Razorpay checkout logic
// Placeholder for checkout logic
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Handle payment processing (Stripe or Razorpay can be added here)
    alert(`Order placed by ${name}, ${email}, Address: ${address}`);
});
