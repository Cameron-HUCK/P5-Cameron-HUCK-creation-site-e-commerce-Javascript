// Recuperation des elements du panier
let cartFromStorage = localStorage.getItem("cart");

// Si le panier est vide
if (cartFromStorage == null){
// Il faut creer un tableau qui recoit les produits
  cartStorage = [];
}
else{
  cartStorage = JSON.parse(cartFromStorage);
}
console.log(cartFromStorage);
console.log(typeof(cartStorage));

//Traitement des cas possibles de PanierProduit et remplissages de <section id="cart__items">

if (cartFromStorage == null || cartFromStorage == 0) {
  let messagePanierVide = document.getElementById("cart__items");
  messagePanierVide.insertAdjacentHTML('afterend',
  '<div class="cart__item__img">',
      '<p> Votre panier ne comporte actuellement aucun produit </p>',
  '</div>'
  );
  console.log(messagePanierVide)
}else{
  // Si le panier n'est pas vide 
  for(i=0; i < cartFromStorage.lenght; i++);

let insertProduct = document.getElementById('cart__idems');
insertProduct.insertAdjacentHTML("afterend",
`<article class="cart__item" data-id="${panierProduct[i]._id}" data-color="${panierProduct[i].colors}">,
                '<div class="cart__item__img">',
                  <img src="${panierProduct.imageUrl}" alt="${panierProduct.altTxt}">,
                </div>,
                <div class="cart__item__content">,
                  <div class="cart__item__content__description">,
                    <h2>Nom du produit</h2>,
                    <p>Vert</p>,
                    <p>42,00 €</p>,
                  </div>,
                  <div class="cart__item__content__settings">,
                    <div class="cart__item__content__settings__quantity">,
                      <p>Qté : </p>,
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">,
                    </div>,
                    <div class="cart__item__content__settings__delete">,
                      <p class="deleteItem">Supprimer</p>,
                    </div>,
                  </div>,
                </div>,
              </article>`
              );
}