// Recovery of objects (command) in the local Storage
getCart();
let cart = getCart();

// Retrieve the order id from the URL
if (getParamUrl) {
let orderId = getParamUrl('orderId');

// Display the command id
let confimration_Order = document.getElementById('orderId');
confimration_Order.textContent = orderId;

// If there is a problem with order taking
} else {
    confimration_Order.textContent = "Il y a eux un probleme avec la prise de votre commande";
}
