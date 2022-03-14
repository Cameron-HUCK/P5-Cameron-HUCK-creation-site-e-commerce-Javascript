let urlString =  document.location.href;
let urlObject =  new URL('file:///Users/huckcameron/Documents/P5-HUCK-Cameron/front/html/index.html');
console.log(urlString);

var paramsString = ".searchParams&id=${products[i]._id}";
var searchParams = new URLSearchParams (urlString);

const id = searchParams.get("id");
console.log(leId)

