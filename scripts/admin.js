// Admin Firebase logic
import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Reference to the products collection in Firestore
const productsRef = collection(db, "products");

// Fetch products and display them
async function fetchProducts() {
    const querySnapshot = await getDocs(productsRef);
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing content

    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item", "mb-4", "p-4", "border", "border-gray-300");
        productDiv.innerHTML = `
      <h3 class="font-semibold">${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button class="bg-blue-500 text-white p-2 mt-2" onclick="editProduct('${doc.id}')">Edit</button>
      <button class="bg-red-500 text-white p-2 mt-2" onclick="deleteProduct('${doc.id}')">Delete</button>
    `;
        productList.appendChild(productDiv);
    });
}

// Add new product
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const stock = parseInt(document.getElementById("product-stock").value);

    try {
        await addDoc(productsRef, { name, price, stock });
        alert("Product added successfully!");
        fetchProducts(); // Refresh product list
    } catch (error) {
        alert("Error adding product: " + error.message);
    }
});

// Edit product
async function editProduct(productId) {
    const productDocRef = doc(db, "products", productId);
    const product = await getDocs(productDocRef);
    const productData = product.data();

    // Populate the form with product data
    document.getElementById("product-name").value = productData.name;
    document.getElementById("product-price").value = productData.price;
    document.getElementById("product-stock").value = productData.stock;

    // Change button to save
    const saveButton = document.getElementById("save-product-button");
    saveButton.style.display = "inline-block";
    saveButton.onclick = async () => {
        const updatedName = document.getElementById("product-name").value;
        const updatedPrice = parseFloat(document.getElementById("product-price").value);
        const updatedStock = parseInt(document.getElementById("product-stock").value);

        try {
            await updateDoc(productDocRef, { name: updatedName, price: updatedPrice, stock: updatedStock });
            alert("Product updated successfully!");
            fetchProducts(); // Refresh product list
        } catch (error) {
            alert("Error updating product: " + error.message);
        }
    };
}

// Delete product
async function deleteProduct(productId) {
    const productDocRef = doc(db, "products", productId);
    try {
        await deleteDoc(productDocRef);
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh product list
    } catch (error) {
        alert("Error deleting product: " + error.message);
    }
}

// Load products on page load
window.onload = fetchProducts;
