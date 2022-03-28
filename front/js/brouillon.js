//Traitement des cas possibles de PanierProduit et remplissages de <section id="cart__items">

/*if (cart == null || cart == 0) {
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panierProduct.qty}">,
                    </div>,
                    <div class="cart__item__content__settings__delete">,
                      <p class="deleteItem">Supprimer</p>,
                    </div>,
                  </div>,
                </div>,
              </article>`
              );


              /* Fonction d'ajout de nouveaux produits 
async function addCart() {

    /* Appel de la fonction getProductsInfos */
    await getProductsInfos();
  
    /* Pointage vers l'élément cart__items 
    let cartItems = document.getElementById("cart__items");
  
    /* Si le panier contient quelque chose on montre son contenu à l'utilisateur */
    /* Création d'une boucle permettant d'afficher la totalité des produits sur la page panier 
    for (i = 0; i < cartStorage.length; i++) {
  
      /* Récupération des produits concernés via l'API 
      let product = product.find(x => x._id == cartStorage[i]._id);
  
      /* log console des produits affichés via l'API 
      console.log("API Item Used:", product);
  
      /* Template Article 
      cartItems.innerHTML += `
             <article class="cart__item" data-id="${cartStorage [i]._id}" data-color="${cartStorage [i].color}">
                 <div class="cart__item__img">
                   <img src="${product.imageUrl}" alt="${product.altTxt}">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__description">
                     <h2>${product.name}</h2>
                     <p>${cartStorage [i].color}</p>
                     <p>${product.price} €</p>
                   </div>
                   <div class="cart__item__content__settings">
                     <div class="cart__item__content__settings__quantity">
                       <label for="itemQuantity">Qté: </label>
                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartStorage[i].quantity}">
                       <p class="messageQuantity"></p>
                     </div>
                     <div class="cart__item__content__settings__delete">
                       <p class="deleteItem">Supprimer</p>
                     </div>
                   </div>
                 </div>
               </article>
             `;
    }
  }*/
  /*// Recuperation des objet dans le local Storage
let cartStorage = JSON.parse(localStorage.getItem("cart"));

console.log(cartStorage);
console.log(typeof(cartStorage));
  //Si le panier est vide
if (cartStorage == null){
  // Il faut creer un tableau qui recoit les produits
cartStorage = [];
}
else{

}
//Traitement des cas possibles de PanierProduit et remplissages de <section id="cart__items">

if (cartStorage == null || cartStorage == 0) {
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
}*/