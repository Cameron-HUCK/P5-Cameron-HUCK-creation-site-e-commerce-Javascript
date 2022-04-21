/* Display of KANAP products on the index.html page */

/* Retrieve information with the API */
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {

    let products = value;

    for (let i = 0; i < products.length; i++) {

    /* The parent ID */
      let productParent = document.getElementById('items');

      /* Product link that leads to the product page / Parent of the Article tag */
      let productsLink = document.createElement("a");
      productsLink.setAttribute("href", `./product.html?id=${products[i]._id}`);
      productParent.appendChild(productsLink);

      /* Create HTML Tag Article / Parent of (img, h3 , p) */
      let productArticle = document.createElement("article");
      productsLink.appendChild(productArticle);

      /* Image of the different products */
      let productsImg = document.createElement("img");
      productsImg.setAttribute("src", products[i].imageUrl);
      productsImg.setAttribute("alt", products[i].altTxt);
      productArticle.appendChild(productsImg);

      
      /* Creation of product titles (h3) with "productName" as class */
      let productsName = document.createElement("h3");
      productsName.classList.add("productName");
      productsName.textContent = products[i].name;
      productArticle.appendChild(productsName);

      
      /* Create text, product description */
      let productsDescription = document.createElement("p");
      productsDescription.classList.add("productDescription");
      productsDescription.textContent = products[i].description;
      productArticle.appendChild(productsDescription);
      } 
  })

    // An error has occurred
    .catch(function(err) {
      let messageError = 'Il y a une erreur sur notre page, revenez ultérieurement';
			messageError = window.alert('Il y a une erreur sur notre page, revenez ultérieurement');
  });
