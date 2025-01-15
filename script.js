// Function to update the total price based on quantity
function updateTotal(productId, pricePerUnit) {
    const quantity = document.getElementById(`quantity${productId}`).value;
    const total = pricePerUnit * quantity;
    document.getElementById(`total${productId}`).innerText = total;
}

// Function to toggle payment options visibility
function showPaymentOptions(productId) {
    const optionsDiv = document.getElementById(`paymentOptions${productId}`);
    optionsDiv.classList.toggle('d-none');
}

function offlinePayment(productId, pricePerUnit, productName) {
    const quantity = document.getElementById(`quantity${productId}`).value;
    const totalPrice = pricePerUnit * quantity;

    // Pre-fill WhatsApp message
    const message = `Hi, I'd like to order the following offline:\n\nProduct: ${productName}\nQuantity: ${quantity}\nTotal Price: ₹${totalPrice}\nGmail: \nAddress: \nLandmark: \nCalling Number: `;
    const whatsappURL = `https://wa.me/9089042003?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.location.href = whatsappURL;
}


function onlinePayment(productId, pricePerUnit, productName) {
    const quantity = document.getElementById(`quantity${productId}`).value;
    const totalPrice = pricePerUnit * quantity;

    // Redirect to scanner.html with product details
    const url = `scanner.html?product=${encodeURIComponent(productName)}&price=${pricePerUnit}&quantity=${quantity}`;
    window.location.href = url;
}



function selfPickup(productId, pricePerUnit, productName) {
    const quantity = document.getElementById(`quantity${productId}`).value;
    const totalPrice = pricePerUnit * quantity;

    // Pre-fill WhatsApp message
    const message = `Hi, I'd like to place a self-pickup order for:\n\nProduct: ${productName}\nQuantity: ${quantity}\nTotal Price: ₹${totalPrice}\nGmail: \nPickup Date: `;
    const whatsappURL = `https://wa.me/9089042003?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.location.href = whatsappURL;
}


// Generate a unique order ID
function generateOrderId() {
    return `ORD-${Date.now()}`;
}
function redirectToScanner(productId, productName, productPrice) {
    // Get the quantity from the respective input field
    const quantity = document.getElementById(`quantity${productId}`).value;

    // Calculate the total price
    const totalPrice = productPrice * quantity;

    // Redirect to scanner.html with product details and total price
    const url = `scanner.html?product=${encodeURIComponent(productName)}&price=${totalPrice}`;
    window.location.href = url;
}


