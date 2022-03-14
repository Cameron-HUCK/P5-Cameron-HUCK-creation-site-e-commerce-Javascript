/* Recuperation de l"id de chaque produit par page*/
let urlString =  document.location.href;
let urlObject =  new URL('file:///Users/huckcameron/Documents/P5-HUCK-Cameron/front/html/index.html');
console.log(urlString);

var paramsString = ".searchParams&id=${products[i]._id}";
var searchParams = new URLSearchParams (urlObject);
console.log(searchParams)

const id = searchParams.get("id");
console.log(id);

/* Appel de L'api */
fetch('http://localhost:3000/api/products/')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);

let products = value;

  for (let i = 0; i < products.length; i++) {
  } 
})