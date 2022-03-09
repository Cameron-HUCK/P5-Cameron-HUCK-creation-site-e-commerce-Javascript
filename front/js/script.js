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

    const productsList = document.getElementById('item');

    let productsName = document.createElement('h3');
    productsName.classList.add("productName");
    productsName.textContent = products[i].name;
    console.log(productsName)
}

  })
  .catch(function(err) {
    console.log("erreur");
    console.log(err);
    // Une erreur est survenue
  });
