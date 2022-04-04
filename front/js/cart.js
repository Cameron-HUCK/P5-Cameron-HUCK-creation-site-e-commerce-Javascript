// Recuperation des objet dans le local Storage
let cart = {};
let cartJsonLocalStorage = localStorage.getItem("cart");

// Si le panier n'est pas vide
if(cartJsonLocalStorage != null) {
	cart = JSON.parse(cartJsonLocalStorage);
}

// Quand j'arrive ici, j'ai forcement un tableau dans ma variable cart (vide ou non)
console.log(cart);

//je recupere l'element HTML qui contiendra mes produits(<section> ID Parent)
let cartItems = document.getElementById("cart__items");

// On veut creer les produits dans le page panier en creant une boucle for

for(const myProductId in cart) {
	let productLocalStorage = cart[myProductId];

	// Fetch pour recuperer (img, nom du produit etc ) ce qu'il y a pas dans le LocalStorage
	fetch(`http://localhost:3000/api/products/${productLocalStorage._id}`)
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		let productApi = value;

		// Je transmet ce qui a dans productApi a mon productLocalStorage
		productLocalStorage.name = productApi.name;
		productLocalStorage.price = productApi.price;
		productLocalStorage.imageUrl = productApi.imageUrl;
		productLocalStorage.altTxt = productApi.altTxt;

		// ########################################################################################################## CREATION DE LA STRUCTURE HTML

		// Creation de la Balise Article et affiliation a son parent "cart__items"(<article> )
		let dataProductArticle = document.createElement("article");

		// Affiliation d'une classe a article
		dataProductArticle.classList.add('cart__item')
		dataProductArticle.setAttribute("data-id", productLocalStorage._id);
		dataProductArticle.setAttribute("data-color", productLocalStorage.color);
		cartItems.appendChild(dataProductArticle);

		// Creation de la Balise <div class="cart__item__img"> parent de la la balise <img> et affiliation a son parent "article"
		let imageDiv = document.createElement("div");
		imageDiv.classList.add('cart__item__img');
		dataProductArticle.appendChild(imageDiv);

		// Creation de la Balise <img> enfant de la <div class="cart__item__img">
		let imagePanier = document.createElement("img");
		imagePanier.setAttribute("src", productLocalStorage.imageUrl);
		imagePanier.setAttribute("alt", productLocalStorage.altTxt);
		imageDiv.appendChild(imagePanier);

		// ########################################################################################################## PARTIE NOM PRODUIT / COULEUR / PRIX

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
		titleNameProduct.textContent = `${productLocalStorage.name}`;
		divContentDescription.appendChild(titleNameProduct);

		// <p> (couleur)
		let colorsCartProduct = document.createElement("p");
		colorsCartProduct.textContent = `${productLocalStorage.color}`;
		divContentDescription.appendChild(colorsCartProduct);

		// <p> (price)
		let priceCartProduct = document.createElement("p");
		priceCartProduct.textContent = `${productLocalStorage.price}€`;
		divContentDescription.appendChild(priceCartProduct);

		// ########################################################################################################## PARTIE QUANTITÉ

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
		inputQuantity.setAttribute('value', `${productLocalStorage.qty}`);
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

//########################################################################################################## BOUTON SUPPRIMER
 
      // Supprimation des articles avec le buttons Supprimer
      let btn_supprimer = document.querySelectorAll(".deleteItem");
      for (let l = 0; l < btn_supprimer.length; l++) {
        btn_supprimer[l].addEventListener('click', (event) => {
          event.preventDefault();
          console.log(btn_supprimer);

          // Selection de l'id du produit qui va etre supprimer en cliquant sur le bouton
          let id_Delete_Product =  productLocalStorage._id;
          console.log(productLocalStorage._id);

          // avec la methode filter je selectionne les elements et je supprime l'element ou le btn a ete cliquer
          productLocalStorage = productLocalStorage[l].filter(el => el._id != id_Delete_Product);
          console.log(productLocalStorage);
        });
    }
	});
}




