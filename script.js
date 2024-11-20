const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

// Toggle navigation for mobile view
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// ***********************************************************


// ***********************************************************

// Function to update the count in the display
function updateCartCount() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    console.log("Cart items count:", cartItems.length); // Debugging line
    const countDisplay = document.querySelector('.cnt');
    if (countDisplay) {
        countDisplay.textContent = cartItems.length; // Update display with count of items
    }
}

// Function to display cart items
function displayCartItems() {
    const cartTable = document.querySelector('#cart tbody');
    cartTable.innerHTML = ''; // Clear existing items
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    cartItems.forEach((product, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index;

        row.innerHTML = `
            <td><a href="#" class="remove-item"><i class="fa-solid fa-trash"></i></a></td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td id="price">₹ ${product.price}</td>
            <td><input type="number" value="1" min="1" class="quantity-input"></td>
            <td class="subtotal">₹ ${product.price}</td>
        `;

        cartTable.appendChild(row);
    });

    addEventListeners(); // Attach event listeners for the new rows
    updateCartTotal(); // Update total after displaying items
    updateCartCount();
}

// Mock function to simulate adding a product to the cart
document.addEventListener('DOMContentLoaded', () => {
    // Your code here will now run after the DOM is fully loaded

    // Initialize cartItems from sessionStorage or as an empty array
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // Fetch the product data
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Example: Calling addToCart with a specific productId
            const productId = 1; // Replace with dynamic productId
            addToCart(productId, products.items); // Pass the productId and product array
        })
        .catch(error => console.error("Error loading product:", error));

    // Function to add product to the cart
    function addToCart(productId, products) {
        const product = products.find(p => p.id === productId);

        if (product) {
            // Add product to the cartItems array
            cartItems.push(product);

            // Save updated cart back to sessionStorage
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Refresh cart display
            displayCartItems();

            // Update cart item count
            updateCartCount();
        } else {
            console.log("Product not found.");
        }
    }

    // Function to display cart items (implement as per your UI)
    function displayCartItems() {
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = ''; // Clear the existing cart display
            cartItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = item.name; // Display product name (add more details as needed)
                cartContainer.appendChild(itemDiv);
            });
        } else {
            console.log('Cart container not found.');
        }
    }

    // Function to update cart count (implement as per your UI)
    function updateCartCount() {
        const cartCount = cartItems.length;
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = `Cart Count: ${cartCount}`;
        } else {
            console.log('Cart count element not found.');
        }
    }
});


// *****************************************************

// Event listeners for cart actions
function addEventListeners() {
    document.querySelectorAll('.remove-item').forEach(icon => {
        icon.addEventListener('click', function (event) {
            event.preventDefault();
            const row = this.closest('tr');
            const index = row.dataset.index;

            let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            cartItems.splice(index, 1); // Remove item from array
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update session storage
            displayCartItems(); // Refresh display
            updateCartCount(); // Update cart count
        });
    });

    document.querySelectorAll('#quant input[type="number').forEach(input => {
        input.addEventListener('input', function () {
            const row = this.closest('tr');
            const price = parseInt(row.querySelector('#price').textContent.replace('₹', ''));
            const quantity = parseInt(this.value) || 1; // Default to 1 if empty
            const subtotal = price * quantity;
            row.querySelector('.subtotal').textContent = `₹ ${subtotal}`;
            updateCartTotal(); // Update total after quantity change
        });
    });
}

// Function to update the cart total
function updateCartTotal() {
    const cartTable = document.querySelector('#cart tbody');
    let total = 0;
    cartTable.querySelectorAll('.subtotal').forEach(subtotalCell => {
        const subtotal = parseInt(subtotalCell.textContent.replace('₹', '')) || 0;
        total += subtotal;
    });
    document.querySelector('.cart-total').textContent = `₹ ${total}`;
}


// *******************************************************

// to add json file.
fetch('./products.json') // Path is relative to the HTML file or root directory on server
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(products => console.log(products)) // Logs the JSON content to console
  .catch(error => console.error('Error loading JSON:', error));

//   *******************************



// ******************************
// Load and display cart items when the page loads
window.onload = () => {
    displayCartItems();
    updateCartCount(); // Initialize cart count display
};

// ********************************************************************
// filter
const productsData = {
    "items": [
        {
            "id": 1,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "men",
            "type": "top",
            "image": "img/product/f1.jpg"
        },
        {
            "id": 2,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "men",
            "type": "top",
            "image": "img/product/f2.jpg"
        },
        {
            "id": 3,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "men",
            "type": "top",
            "image": "img/product/f3.jpg"
        },
        {
            "id": 4,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "unisex",
            "type": "top",
            "image": "img/product/f4.jpg"
         },
        {
            "id": 5,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "men",
            "type": "top",
            "image": "img/product/f5.jpg"
        },
       {
            "id": 6,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "unisex",
            "type": "top",
            "image": "img/product/f6.jpg"
        },
        {
            "id": 7,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "women",
            "type": "bottom",
            "image": "img/product/f7.jpg"
        },
        {
            "id": 8,
            "name": "floral print T-shirt",
            "price": 1299,
            "category": "women",
            "type": "top",
            "image": "img/product/f8.jpg"
        }
    ]
};

// Function to render products
function renderProducts(filteredProducts) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear existing products

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('pro');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="des">
                <span>${product.category}</span>
                <h5>${product.name}</h5>
                <h4>₹${product.price}</h4>
            </div>
            <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Function to filter products
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(productsData.items); // Show all products if 'ALL' is selected
    } else {
        const filtered = productsData.items.filter(item => item.category === category || item.type === category);
        renderProducts(filtered); // Show only products in the selected category
    }
}

// Event listener for filter buttons
document.querySelectorAll('#filter button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.id.toLowerCase();
        filterProducts(category);

        // Update button styles
        document.querySelectorAll('#filter button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Initial load: Display all products
renderProducts(productsData.items);
