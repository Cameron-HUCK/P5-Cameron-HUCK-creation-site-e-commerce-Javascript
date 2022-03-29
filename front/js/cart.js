// Recuperation des objet dans le local Storage
let cart = [];
let cartJsonLocalStorage = localStorage.getItem("cart");

// Si le panier n'est pas vide
if(cartJsonLocalStorage != null) {
	cart = JSON.parse(cartJsonLocalStorage);
}
// Quand j'arrive ici, j'ai forcement un tableau dans ma variable cart (vide ou non)
console.log(cart);

//je recupere l'element HTML qui contiendra mes produits 
let cartItems = document.getElementById("cart__items");

// On veut creer les produits dans le page panier
for (i = 0; i < cart.length; i++) {

  let productCourant = cart[i];


//Creation de la structure HTML des produits du LocalStorage
  
// Creation de la Balise Article et affiliation a son parent "cart__items"
let dataProductArticle = document.createElement("article");
  dataProductArticle.setAttribute("class", 'cart__item')
  dataProductArticle.setAttribute("data-id", `${productCourant._id}`);
  dataProductArticle.setAttribute("data-color", `${productCourant.color}`);
  dataProductArticle.appendChild(cartItems);
    console.log(dataProductArticle);

// Creation de la Balise <div class="cart__item__img"> parent de la la balise <img> et affiliation a son parent "article"
let imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", 'cart__item__img');
  imageDiv.appendChild(dataProductArticle);
  console.log(imageDiv);
}









/* Si le panier est vide.
if (cartStorage  == null || cartStorage  == 0) {
  cartItems.insertAdjacentHTML('afterend',
  '<div class="cart__item__img">',
      '<p> Votre panier ne comporte actuellement aucun produit </p>',
  '</div>'
  );*/

/*}else{
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
console.log(cartItems.insertAdjacentHTML);*/
