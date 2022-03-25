// Recuperation des objet dans le local Storage
let cartStorage = JSON.parse(localStorage.getItem("cart"));

console.log(cartStorage);
console.log(typeof(cartStorage));
  //Si le panier est vide
if (cartStorage == null){
  // Il faut creer un tableau qui recoit les produits
cartStorage = [];
}
else{
}