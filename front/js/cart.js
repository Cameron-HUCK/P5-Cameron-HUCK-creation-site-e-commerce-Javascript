// Recuperation des objet dans le local Storage
let cartStorage = JSON.parse(localStorage.getItem("cart"));

  //Si le panier est vide
if (cartStorage == null){
  // Il faut creer un tableau qui recoit les produits
cartStorage = [];
}
else{
  localStorage.setItem('carte', JSON.stringify(cartStorage));
}

//Traitement des cas possibles de PanierProduit et remplissages de <section id="cart__items">
let cartItems = document.getElementById("cart__items");

// Si le panier est vide.
if (cartStorage  == null || cartStorage  == 0) {
  cartItems.insertAdjacentHTML('afterend',
  '<div class="cart__item__img">',
      '<p> Votre panier ne comporte actuellement aucun produit </p>',
  '</div>'
  );

}else{
  // Si le panier n'est pas vide 

  for(i=0; i < cartStorage.lenght; i++);
  
  cartItems.insertAdjacentHTML("afterend",
`<article class="cart__item" data-id="${cartStorage[i]._id}" data-color="${cartStorage[i].colors}">
                <div class="cart__item__img">
                  <img src="${cartStorage[i].imageUrl}" alt="${cartStorage[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${cartStorage[i].name}</h2>
                    <p>${cartStorage[i].colors}</p>
                    <p>${cartStorage[i].price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartStorage[i].value}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
              );
}
console.log(cartStorage);
console.log(typeof(cartStorage));
console.log(cartItems.insertAdjacentHTML);
