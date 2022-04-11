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

// Variable pour calculer le prix total de tout les produits dans le panier
let total_price = 0;
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
			// Modificaton de la quantité du produit
			inputQuantity.addEventListener("input", (event) => {
			console.log(inputQuantity.value);
			// On change le quantite du produit courant
			cart[myProductId].qty = inputQuantity.value;
			// On ecrase le panier du LocalStorage  avec notre panier modifie
			localStorage.setItem("cart", JSON.stringify(cart));
			//on rafraichit la page (pour actualiser la liste des produits et le total)
			window.location.reload();	
			});

        // TOTAL QUANTITER
        
        let productQuantity = document.getElementsByClassName('itemQuantity');
        // Variable pour calculer la quanitite total de tout les produits dans le panier
        let total_Quantity = 0;
        // Creation d'une boucle pour mutiplier la quantite par le nombre d'article dans le LocalStorage
        for (let p = 0; p < productQuantity.length; p++){
        total_Quantity += productQuantity[p].valueAsNumber;
        }
        // Affichage de la totalite des articles dans le panier
        let product_TotalQuantity = document.getElementById('totalQuantity')
        product_TotalQuantity.textContent = total_Quantity;

          //TOTAL du PRIX de tout le panier
          let product_Total_Quantity = document.getElementById('totalPrice');
          // Creation de l'opration pour avoir le prix total de tout les articles dans le panier
          total_price += productLocalStorage.qty * productLocalStorage.price;
            product_Total_Quantity.textContent = total_price;

		// Creation de la <div class="cart__item__content__settings__delete"> (Bouton supprimer)
		let cartContentDelete = document.createElement('div');
		cartContentDelete.classList.add("cart__item__content__settings__delete");
		divContentSettings.appendChild(cartContentDelete);

		// Creation de la balise <p class="deleteItem"> 'Supprimer'
		let deleteProduct = document.createElement('p');
		deleteProduct.classList.add('deleteItem');
		deleteProduct.textContent = "Supprimer";
		cartContentDelete.appendChild(deleteProduct);
    //Supression des articles avec le buttons Supprimer
    deleteProduct.addEventListener('click', (event) => {
      event.preventDefault();
      //on supprime le produit du LocalStorage
      delete cart[myProductId];
      // On ecrase la panier du LocalStorage avec notre panier modifier
      localStorage.setItem("cart", JSON.stringify(cart));
      // On rafraichit la page (pour actualiser la liste des produits et le total)
      window.location.reload();
    });
	});
}
// VALIDATION DES DONNEES DES FORMULAIRES

function formulaire() {
	let donneesFormulaire = document.querySelector(".cart__order__form");
	
	// Creation des RegExp
	let lettresRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
	let addresseRegExp = new RegExp("[^A-Za-z0-9]");
	let mailRegExp = new RegExp(
	"^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
	
	// Modification du prénom
	donneesFormulaire.firstName.addEventListener("change", function () {
		prenomVerification(this);
	});
	
	// Validation du prénom
	const prenomVerification = function (prenom) {
		let prenomMessageErreur = prenom.nextElementSibling;
		if (lettresRegExp.test(prenom.value)) {
			prenomMessageErreur.textContent = "";
		} else {
			prenomMessageErreur.textContent = "Veuillez renseigner votre prénom";
		}
	};
	
	// Modification du nom de famille
	donneesFormulaire.lastName.addEventListener("change", function () {
		nomVerification(this);
	});
	
	// Validation du nom
	const nomVerification = function (nom) {
		let nomMessageErreur = nom.nextElementSibling;
		if (lettresRegExp.test(nom.value)) {
			nomMessageErreur.textContent = "";
		} else {
			nomMessageErreur.textContent = "Veuillez renseigner votre nom";
		}
	};
	
	// Modification de l'adresse
	donneesFormulaire.address.addEventListener("change", function () {
		adresseVerification(this);
	});
	
	// Validation de l'adresse
	const adresseVerification = function (adresse) {
		let adresseMessageErreur = adresse.nextElementSibling;
		if (addresseRegExp.test(adresse.value)) {
			adresseMessageErreur.textContent = "";
		} else {
			adresseMessageErreur.textContent = "Veuillez renseigner votre adresse";
		}
	};
	
	// Modification de la ville
		donneesFormulaire.city.addEventListener("change", function () {
		villeVerification(this);
	});
	
	// Validation de la ville
	const villeVerification = function (ville) {
		villeMessageErreur = ville.nextElementSibling;
	
		if (lettresRegExp.test(ville.value)) {
			villeMessageErreur.textContent = "";
		} else {
			villeMessageErreur.textContent = "Veuillez renseigner votre ville";
		}
	};
	
	// Modification du mail
		donneesFormulaire.email.addEventListener("change", function () {
		mailVerification(this);
		});
	
	// Validation de l'email
	const mailVerification = function (mail) {
		let mailMessageErreur = mail.nextElementSibling;
		if (mailRegExp.test(mail.value)) {
			mailMessageErreur.textContent = "";
		} else {
			mailMessageErreur.textContent = "Veuillez renseigner votre email.";
		}
	};
}
formulaire();
  
// Fonction pour l'envoi du formulaire
function envoiFormulaire() {
	let boutonCommander = document.querySelector("form");
  
	// eclencheur bouton commander
	boutonCommander.addEventListener("submit", function (event) {
	  event.preventDefault();
  
		// info du formulaire
	  	let prenom = document.getElementById("firstName");
	  	let nom = document.getElementById("lastName");
	  	let adresse = document.getElementById("address");
	  	let ville = document.getElementById("city");
	  	let mail = document.getElementById("email");
  
		//Construction d'un array depuis le local storage
		let idProducts = [];
		for (let i = 0; i < cartJsonLocalStorage.length; i++) {
			idProducts.push(cartJsonLocalStorage[i]);
		}
	
		const order = {
			contact: {
			firstName: prenom.value,
			lastName: nom.value,
			address: adresse.value,
			city: ville.value,
			email: mail.value,
			},
			products: idProducts,
		};
		
		const envoi = {
			method: "POST",
			body: JSON.stringify(order),
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			}
		};

		fetch(`http://localhost:3000/api/products/order`, envoi)
			.then(function (reponseAPI) {
			return reponseAPI.json();
			})
	
			.then(function (reponseID) {
			localStorage.clear();
			localStorage.setItem("order", reponseID.orderId);
			document.location.href = "confirmation.html";
			})
			.catch(function (erreur) {
			console.log(erreur);
			});
		});
	}
	envoiFormulaire();