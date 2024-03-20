// Select the cart icon element
const cartIcon = document.querySelector('.cart-icon');



// Add a click event listener to the cart icon
cartIcon.addEventListener('click', () => {
    // Open the modal when the cart icon is clicked
    openModal();
});

// Select the "X" button element
const closeButton = document.querySelector('.close');

// Add a click event listener to the "X" button
closeButton.addEventListener('click', () => {
    // Close the modal when the "X" button is clicked
    closeModal();
});

// Define the openModal() function
function openModal() {
    document.getElementById("modal").style.display = "block";
}

// Define the closeModal() function
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Define the saveCartToLocalStorage() function
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(Array.from(document.getElementById('cart-items').children).map(tr => {
        const tdArray = Array.from(tr.children);
        return {
            name: tdArray[0].innerText,
            image: tdArray[0].querySelector('img').src,
            price: parseFloat(tdArray[1].innerText.replace('$', ''))
        }
    })));
}

// Define the loadCartFromLocalStorage() function
function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        let totalPrice = 0; // Initialize total price
        cart.forEach(item => {
            addToCart(item.name, item.image, item.price, false); // Pass false to avoid updating total price
            totalPrice += item.price; // Add item price to total price
        });
        // Update total price
        updateTotalPrice(totalPrice);
    }
}

// Define the addToCart() function
function addToCart(productName, imageUrl, price, updatePrice = true) {
    // Create a new row for the cart table
    var cartRow = document.createElement('tr');
    cartRow.innerHTML = `
        <td>
            <img src="${imageUrl}" alt="${productName}" style="max-width: 50px;">
            ${productName}
        </td>
        <td>$${price}</td>
        <td><button onclick="removeFromCart(this)">Eliminar</button></td> <!-- Botón para eliminar -->
    `;

    // Append the new row to the cart items
    var cartItems = document.getElementById('cart-items');
    cartItems.appendChild(cartRow);

    // If updatePrice is true, update the total price
    if (updatePrice) {
        // Update the total price
        updateTotalPrice(price);
    }

    // Save the cart to local storage
    saveCartToLocalStorage();
}

// Define the removeFromCart() function
function removeFromCart(button) {
    // Get the row (tr) to which the button belongs
    var row = button.parentNode.parentNode;

    // Get the price of the product to be removed
    var price = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', ''));

    // Remove the row from the cart
    row.parentNode.removeChild(row);

    // Update the total price
    updateTotalPrice(-price); // Subtracting the price from the total price

    // Save the cart to local storage
    saveCartToLocalStorage();
}

document.querySelector('.back-to-top').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

// Define the updateTotalPrice() function
function updateTotalPrice(price) {
    // Get the current total price
    var totalPriceElement = document.getElementById('total-price');
    var totalPrice = parseFloat(totalPriceElement.textContent.replace('$', ''));

    // Add the price of the new item to the total price
    totalPrice += price;

    // Update the total price element
    totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
}

document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });

// Load cart from local storage when the page is loaded
loadCartFromLocalStorage();
