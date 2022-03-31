// Recuperation des objet dans le local Storage
let cart = [];
let cartJsonLocalStorage = localStorage.getItem("cart");

// Si le panier n'est pas vide
if(cartJsonLocalStorage != null) {
	cart = JSON.parse(cartJsonLocalStorage);
}
// Quand j'arrive ici, j'ai forcement un tableau dans ma variable cart (vide ou non)
console.log(cart);

  //je recupere l'element HTML qui contiendra mes produits(<section> ID Parent)
  let cartItems = document.getElementById("cart__items");

  // On veut creer les produits dans le page panier  for (i = 0; i < cart.length; i++)
  for (i = 0; i < cart.length; i++) {

    let productCourant = cart[i];

        /* Recuperation de l'url de la page */
    let urlString =  document.location.href;
    let urlObject =  new URL(urlString);

    // Recuperation de l'ID produit //
    const productId = urlObject.searchParams.get('id');

    // Fetch pour recuperer ce qu'il y a pas dans le LocalStorage (img, nom du produit etc)
    fetch(`http://localhost:3000/api/products/${productId}`)

    .then(function(res) {
      if (res.ok) {
     return res.json();
      }
      })
    .then(function(value) {
     let product = value;

    //Creation de la structure HTML des produits du LocalStorage
      
    // Creation de la Balise Article et affiliation a son parent "cart__items"(<article> )
    let dataProductArticle = document.createElement("article");
      // Affiliation d'une classe a article
      dataProductArticle.classList.add('cart__item')
      dataProductArticle.setAttribute("data-id", `${productCourant._id}`);
      dataProductArticle.setAttribute("data-color", `${productCourant.color}`);
      cartItems.appendChild(dataProductArticle);


      // Creation de la Balise <div class="cart__item__img"> parent de la la balise <img> et affiliation a son parent "article"
      let imageDiv = document.createElement("div");
        imageDiv.classList.add('cart__item__img');
        dataProductArticle.appendChild(imageDiv);
   

        // Creation de la Balise <img> enfant de la <div class="cart__item__img">   
        let imagePanier = document.createElement("img");
        imagePanier.setAttribute("src" ,product[i].imageUrl);
        imagePanier.setAttribute("alt", product[i].altTxt);
        imageDiv.appendChild(imagePanier);
         

// PARTIE NOM PRODUIT / COULEUR / PRIX

      // Creation de la <div class="cart__item__content">, Parent contenant les informations de la commande des produits du panier
      let divContent = document.createElement('div');
      divContent.classList.add('cart__item__content');
      dataProductArticle.appendChild(divContent);
    
        
        //Creation de la  <div class = "cart__item__content__description"> (parent de la description) qui contient le NOM, couleur et prix du produit
        let divContentDescription = document.createElement('div');
        divContentDescription.classList.add('cart__item__content__description');
        divContent.appendChild(divContentDescription);
   
          
          // Creation du H2(nom du produit)
          let titleNameProduct = document.createElement ('h2');
          titleNameProduct.textContent = product[i].name;
          divContentDescription.appendChild(titleNameProduct);
           

          // <p> (couleur)
          let colorsCartProduct = document.createElement("p");
          colorsCartProduct.textContent = `${productCourant.color}`;
          divContentDescription.appendChild(colorsCartProduct);

          // <p> (price)
          let priceCartProduct = document.createElement("p");
          priceCartProduct.textContent = `${product[i].price}€`;
          divContentDescription.appendChild(priceCartProduct);

// PARTIE QUANTITER 
      // Creation de la <div class = "cart__item__content__settings">(Parent 1)
      let divContentSettings = document.createElement('div');
      divContentSettings.classList.add('cart__item__content__settings');
      dataProductArticle.appendChild(divContentSettings);
        

        // Creation de la <div class = "cart__item__content__settings__quantity">(Parent <p>QTY :</p> et notre input )
        let divContentQuantity = document.createElement('div');
        divContentQuantity.classList.add('cart__item__content__settings__quantity');
        divContentSettings.appendChild(divContentQuantity);
          

          //Creation de la balise <p>Qté : </p>
          let QtyCart = document.createElement('p');
          QtyCart.textContent = "Qté : "
          divContentQuantity.appendChild(QtyCart);
            

          //Creation de l'input qui contient la quntite du produit chosiie dans la commande qui ce situe dans le locale storage
          let inputQuantity = document.createElement('input');
          inputQuantity.setAttribute('type', "number");// type = "number"
          inputQuantity.classList.add('itemQuantity');// affiliation de la class "itemQuantity"
          inputQuantity.setAttribute('name', "itemQuantity");// name = "itemQuantity"
          inputQuantity.setAttribute('min', "1");
          inputQuantity.setAttribute('max', "100");
          inputQuantity.setAttribute('value', `${productCourant.qty}`);
          divContentQuantity.appendChild(inputQuantity);
          
          
        // Creation de la <div class="cart__item__content__settings__delete"> (Bouton supprimer)
        let cartContentDelete = document.createElement('div');
        cartContentDelete.classList.add("cart__item__content__settings__delete");
        divContentSettings.appendChild(cartContentDelete);
          

          // Creation de la balise <p class="deleteItem"> 'Supprimer'
          let deleteProduct = document.createElement('p');
          deleteProduct.classList.add('deleteItem');
          deleteProduct.textContent = "Supprimer";
          cartContentDelete.appendChild(deleteProduct);
         
            
         // Supprimation des articles avec le buttons Supprimer
  })
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
