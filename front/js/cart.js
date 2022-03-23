// Recuperation des elements dans le localStorage

let panierlocalStorage = JSON.parse(localStorage.getItem("Selection"));
if (panierlocalStorage  == null){
  panierlocalStorage  = [];
} 
console.log(panierlocalStorage);
console.log(typeof(panierlocalStorage ));
console.log(JSON.parse(localStorage.getItem("cart")));

//Traitement des cas possibles de PanierProduit et remplissages de <section id="cart__items">

if (panierProduct == null || panierProduct == 0) {
  let messagePanierVide = document.getElementById("cart__items");
  messagePanierVide.insertAdjacentHTML('afterend',
  '<div class="cart__item__img">',
      '<p> Votre panier ne comporte actuellement aucun produit </p>',
  '</div>'
  );
}else{
  // Si le panier n'est pas vide 
  for(i=0; i < panierProduct.lenght; i++);

let insertProduct = document.getElementById('cart__idems');
console.log(insertProduct);
insertProduct.insertAdjacentHTML("afterend",
`<article class="cart__item" data-id="${panierProduct[i]._id}" data-color="${panierProduct[i].colors}">,
                '<div class="cart__item__img">',
                  <img src="${panierProduct.imageUrl}" alt="${panierProduct.altTxt}">,
                </div>,
                <div class="cart__item__content">,
                  <div class="cart__item__content__description">,
                    <h2>${panierProduct.name}</h2>,
                    <p>${panierProduct[i].colors}</p>,
                    <p>${panierProduct[i].price}</p>,
                  </div>,
                  <div class="cart__item__content__settings">,
                    <div class="cart__item__content__settings__quantity">,
                      <p>Qté : </p>,
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panierProduct[i].qty}">,
                    </div>,
                    <div class="cart__item__content__settings__delete">,
                      <p class="deleteItem">Supprimer</p>,
                    </div>,
                  </div>,
                </div>,
              </article>`
              );
}