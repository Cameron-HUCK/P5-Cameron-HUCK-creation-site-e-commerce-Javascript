fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    console.log("erreur")
    // Une erreur est survenue
  });
const products = [0]

for (let product of products) {
   console.log("");
}
