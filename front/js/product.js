/* Recuperation de l'url de la page */
let urlString =  document.location.href;
let urlObject =  new URL(urlString);

// Recuperation de l'ID produit //
const productId = urlObject.searchParams.get('id');

/* Recuperation des donnees du produit en provenance de l'API du productID */
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      let product = value;

// Integrer / Injecter les donnees recuperees de l'API dans le HTML der la page //

// Modifier l'image de la page avec l'image du produit //
let imgId = document.getElementById ("img_origin");
  imgId.setAttribute("src", product.imageUrl);
  imgId.setAttribute("alt", product.altTxt);

// Modifier le titre de la page avec le nom du produit
let title = document.getElementById('title');
title.textContent = product.name;

// Modification du prix avec le bon prix de chaque produit
let priceProduct = document.getElementById('price');
priceProduct.textContent = product.price;

//Modification de la description de chaque produit 
let contentDescription_Product = document.getElementById('description');
contentDescription_Product.textContent = product.description;

// Modification des couleurs proposer de chaque produit en recuperant chaque couleur dans le tableau
let colorsProduct = product.colors;
let colors_Id = document.getElementById('colors');
colorsProduct.forEach(function (element, key) {
  colors_Id[key] = new Option(element,);
});
// Au click sur le bouton "ajout panier ", je veux stocker dans un tableau, dans le localStorage, les informations du produit : _id, qty, color
  
//localStorage

//Ecouter le bouton et empecher reactualisation de lampage au click
let idCart = document.getElementById('addToCart');
idCart.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(idCart);
})
//Recuperation des informations sur la commande du produit.
let qtyProduct = document.getElementById('quantity');

let productToAdd = [];
  productToAdd._id = productId;
  productToAdd.qty = qtyProduct;
  productToAdd.color = colors_Id;

  let cart = [];
  cart.push(productToAdd);
  localStorage.setItem("cart", cart);

  let confirmWindow = () => {
    if (idCart.confirm(productToAdd))
    window.location.href = "../html/cart.html"
  else{
    window.location.href = "../html/index.html";
  }
  }

  console.log(confirmWindow);
  console.log(cart);

})
.catch(function(err) {
    console.log("erreur");
    console.log(err);
    // Une erreur est survenue
  });


