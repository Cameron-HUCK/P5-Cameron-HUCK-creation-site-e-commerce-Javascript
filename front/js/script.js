const productsList = document.querySelector("#item")
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

  for (let product in products) {
    let productName = document.createElement('h3');
    productName.classList.add("productName");
  }
}

  })
  .catch(function(err) {
    console.log("erreur");
    console.log(err);
    // Une erreur est survenue
  });
