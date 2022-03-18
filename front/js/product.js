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
      console.log(product);

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

console.log(product);
console.log(colorsProduct);

})
.catch(function(err) {
    console.log("erreur");
    console.log(err);
    // Une erreur est survenue
  });