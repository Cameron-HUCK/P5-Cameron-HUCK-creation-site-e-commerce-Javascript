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
let imgId = document.getElementById('img-id');
let imgOrigine = document.getElementsByClassName("item__img").src = product.imageUrl;
console.log(imgId);
console.log(imgOrigine);


// Modifier le titre de la page avec le nom du produit
let title = document.getElementById('title');
title.textContent = product.name;
console.log(title);

// Modification du prix avec le bon prix de chaque produit
let priceProduct = document.getElementById('price');
priceProduct.textContent = product.price;
console.log(price);

//Modification de la description de chaque produit 
let contentDesciprtion_Product = document.getElementById('description');
contentDesciprtion_Product.textContent = product.description;
console.log(contentDesciprtion_Product);
})
.catch(function(err) {
    console.log("erreur");
    console.log(err);
    // Une erreur est survenue
  });