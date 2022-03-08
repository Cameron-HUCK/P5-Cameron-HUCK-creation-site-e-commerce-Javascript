const productsList = document.getElementById("item");

fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);

for (let i = 0; i < products.length; i++) {

  let productLink = document.createElement("a");
  productLink.setAttribut("href=",'/product.html?id=${products[i]._id}');
  productsList.appendChild(productLink);

  let productArticle = document.createElement("article");
  productLink.appendChild(productArticle)

  let productName = document.createElement("h3");
  productName.classList.add("productName");
  productName.textContent = products[i].name;
  productArticle.appendChild(productName);
}

  })
  .catch(function(err) {
    console.log("erreur")
    // Une erreur est survenue
  });
