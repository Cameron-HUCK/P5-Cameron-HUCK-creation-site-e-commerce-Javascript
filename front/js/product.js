let urlString =  document.location.href;
let urlObject =  new URL('file:///Users/huckcameron/Documents/P5-HUCK-Cameron/front/html/index.html');
console.log(urlString);


var paramsString = ".searchParams&id=${products[i]._id}";
var searchParams = new URLSearchParams (urlString);

  for (let p of searchParams) {
    console.log(p);
  }

const leId = searchParams.get("leId");
console.log(searchParams)

