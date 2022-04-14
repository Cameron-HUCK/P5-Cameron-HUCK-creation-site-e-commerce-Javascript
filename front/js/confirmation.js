// Recuperation des objet(commande) dans le local Storage
let cart = {};
let cartJsonLocalStorage = localStorage.getItem("cart");

// Si le panier n'est pas vide
if(cartJsonLocalStorage != null) {
	cart = JSON.parse(cartJsonLocalStorage);
}

let urlString =  document.location.href;
let urlObject =  new URL(urlString);
let search_Id = urlObject.searchParams.get('orderId');
console.log(urlString);

// Recuperation de l'id de la commande
let confimration_Order = document.getElementById('orderId');
confimration_Order.textContent = search_Id;
console.log(confimration_Order);
