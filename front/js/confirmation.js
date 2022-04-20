// Recovery of objects (command) in the local Storage
let cart = {};
let cartJsonLocalStorage = localStorage.getItem("cart");


// If the basket is not empty
if(cartJsonLocalStorage != null) {
	cart = JSON.parse(cartJsonLocalStorage);
}
// Retrieve the order id from the URL
let urlString =  document.location.href;
let urlObject =  new URL(urlString);
let search_Id = urlObject.searchParams.get('orderId');
console.log(urlString);

// Display the command id
let confimration_Order = document.getElementById('orderId');
confimration_Order.textContent = search_Id;
console.log(confimration_Order);
