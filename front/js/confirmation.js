// Recovery of objects (command) in the local Storage
getCart();
let cart = getCart();

// Retrieve the order id from the URL
getParamUrl();
let orderId = getParamUrl('orderId');

// Display the command id
let confimration_Order = document.getElementById('orderId');
confimration_Order.textContent = orderId;
