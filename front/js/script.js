/* Affichage des cartes des produits KANAP sur la page index.html */
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);

let products = value;

  for (let i = 0; i < products.length; i++) {

/*L'ID parent*/
    const productsList = document.getElementById('items');

/* Lien produit qui conduit vers la page produit / Parent de la balise Article*/
  let productsLink = document.createElement("a");
  productsLink.setAttribute("href", './product.html?id=${products[i]._id}');
  productsList.appendChild(productsLink);
  console.log(productsLink)

/* Creation de la Balise HTML Article / Parent de (img, h3 , p) */
  let productArticle = document.createElement("article");
  productsLink.appendChild(productArticle);

/* Image des differents produits */
  let productsImg = document.createElement("img");
  productsImg.setAttribute("src", products[i].imageUrl);
  productsImg.setAttribute("alt", products[i].altTxt);
  productArticle.appendChild(productsImg);

/* Creation des titres des produits (h3) avec comme classe "productName" */

    let productsName = document.createElement("h3");
    productsName.classList.add("productName");
    productsName.textContent = products[i].name;
    productArticle.appendChild(productsName);

/* Creation du texte, description des produits */
    let productsDescription = document.createElement("p");
    productsDescription.classList.add("productDescription");
    productsDescription.textContent = products[i].description;
    productArticle.appendChild(productsDescription);

    const url = new URL("http://localhost:3000/api/products");
    const id = new URLSearchParams(window.location.search); 
    var name = url.searchParams.get("name");
    console.log(name);
  } 
})
  .catch(function(err) {
    console.log("erreur");
    console.log(err);
    // Une erreur est survenue
  });
