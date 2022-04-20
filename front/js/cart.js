// Retrieval of objects in the local Storage
let cart = {};
let cartJsonLocalStorage = localStorage.getItem("cart");

// If the basket is not empty
if(cartJsonLocalStorage != null) {
	cart = JSON.parse(cartJsonLocalStorage);
}

// When I get here, I necessarily have an array in my cart variable (empty or not)
console.log(cart);

// I retrieve the HTML element that will contain the products (<section> Parent ID)
let parentCart = document.getElementById("cart__items");

// Variable to calculate the total price of all the products in the cart
let total_price = 0;

// Variable to calculate the total quantity of all products in the cart
let total_Quantity = 0;

let lastMyProductId = Object.keys(cart).pop();

// We want to create the products in the cart page by creating a for loop
for(const myProductId in cart) {

	let productLocalStorage = cart[myProductId];

	// Fetch to retrieve (img, product name etc) what is not in the LocalStorage
	fetch(`http://localhost:3000/api/products/${productLocalStorage._id}`)
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		let productApi = value;

		// I pass what has in 'productApi' to my ''productLocalStorage''
		productLocalStorage.name = productApi.name;
		productLocalStorage.price = productApi.price;
		productLocalStorage.imageUrl = productApi.imageUrl;
		productLocalStorage.altTxt = productApi.altTxt;

		// CREATE THE HTML STRUCTURE

		// Creation of the Article tag and affiliation to its parent "cart__items"(<article> )
		let dataProductArticle = document.createElement("article");

		// Affiliation of a class to an article
		dataProductArticle.classList.add('cart__item')
		dataProductArticle.setAttribute("data-id", productLocalStorage._id);
		dataProductArticle.setAttribute("data-color", productLocalStorage.color);
		parentCart.appendChild(dataProductArticle);

		// Creation of the tag <div class="cart__item__img"> parent of the tag <img> and affiliation to its parent "article"
		let imageDiv = document.createElement("div");
		imageDiv.classList.add('cart__item__img');
		dataProductArticle.appendChild(imageDiv);

		// Creation of the <img> tag child of the <div class="cart__item__img">
		let imagePanier = document.createElement("img");
		imagePanier.setAttribute("src", productLocalStorage.imageUrl);
		imagePanier.setAttribute("alt", productLocalStorage.altTxt);
		imageDiv.appendChild(imagePanier);

		// PART PRODUCT NAME / COLOR / PRICE

		// Creation of the <div class="cart__item__content">, Parent containing the order information for the products in the cart
		let divContent = document.createElement('div');
		divContent.classList.add('cart__item__content');
		dataProductArticle.appendChild(divContent);

		//Creation of the <div class = "cart__item__content__description"> (parent of the description) which contains the NAME, color and price of the product
		let divContentDescription = document.createElement('div');
		divContentDescription.classList.add('cart__item__content__description');
		divContent.appendChild(divContentDescription);

		// Creation of H2(product name)
		let titleNameProduct = document.createElement ('h2');
		titleNameProduct.textContent = `${productLocalStorage.name}`;
		divContentDescription.appendChild(titleNameProduct);

		// <p> (color)
		let colorsCartProduct = document.createElement("p");
		colorsCartProduct.textContent = `${productLocalStorage.color}`;
		divContentDescription.appendChild(colorsCartProduct);

		// <p> (price)
		let priceCartProduct = document.createElement("p");
		priceCartProduct.textContent = `${productLocalStorage.price}€`;
		divContentDescription.appendChild(priceCartProduct);

		// QUANTITY PART

		// Creation of the <div class = "cart__item__content__settings">(Parent 1)
		let divContentSettings = document.createElement('div');
		divContentSettings.classList.add('cart__item__content__settings');
		dataProductArticle.appendChild(divContentSettings);

		// Creation of the <div class = "cart__item__content__settings__quantity">(Parent <p>QTY:</p> and our input )
		let divContentQuantity = document.createElement('div');
		divContentQuantity.classList.add('cart__item__content__settings__quantity');
		divContentSettings.appendChild(divContentQuantity);

		// Create the tag <p>Qté : </p>
		let QtyCart = document.createElement('p');
		QtyCart.textContent = "Qté : "
		divContentQuantity.appendChild(QtyCart);

		// Creation of the input which contains the quantity of the product chosen in the order which is located in the local storage
		let inputQuantity = document.createElement('input');
		inputQuantity.setAttribute('type', "number");// type = "number"
		inputQuantity.classList.add('itemQuantity');// class affiliation "itemQuantity"
		inputQuantity.setAttribute('name', "itemQuantity");// name = "itemQuantity"
		inputQuantity.setAttribute('min', "1");
		inputQuantity.setAttribute('max', "100");
		inputQuantity.setAttribute('value', `${productLocalStorage.qty}`);
		divContentQuantity.appendChild(inputQuantity);
			// Modification of the quantity of the product
			inputQuantity.addEventListener("input", (event) => {
				// We change the quantity of the current product
				cart[myProductId].qty = inputQuantity.value;
				// We overwrite the LocalStorage basket with our modified basket
				localStorage.setItem("cart", JSON.stringify(cart));
				// We refresh the page (to refresh the list of products and the total)
				window.location.reload();	
			});

        // TOTAL QUANTITY

        // Calculation of the total number of products in the basket
		total_Quantity+= inputQuantity.valueAsNumber;
       
        // Calculation of the cart total
		total_price += productLocalStorage.qty * productLocalStorage.price;

		// We display the total number of products and the basket during the last loop
		if (myProductId == lastMyProductId) {

			 // Display of the total number of items in the cart
			 let product_TotalQuantity = document.getElementById('totalQuantity')
			 product_TotalQuantity.textContent = total_Quantity;

			// Display of the total price of the cart
			let product_Total_Quantity = document.getElementById('totalPrice');
			product_Total_Quantity.textContent = total_price;
		}

		// Creation of the <div class="cart__item__content__settings__delete"> (Delete button)
		let cartContentDelete = document.createElement('div');
		cartContentDelete.classList.add("cart__item__content__settings__delete");
		divContentSettings.appendChild(cartContentDelete);

		// Creation of the <p class="deleteItem"> 'Delete' tag
		let deleteProduct = document.createElement('p');
		deleteProduct.classList.add('deleteItem');
		deleteProduct.textContent = "Supprimer";
		cartContentDelete.appendChild(deleteProduct);

    	// Delete articles with the Delete buttons
    	deleteProduct.addEventListener('click', (event) => {
      	event.preventDefault();
      	// Delete the product from Local Storage
      	delete cart[myProductId];
     	// We overwrite the LocalStorage basket with our cart modify
      	localStorage.setItem("cart", JSON.stringify(cart));
      	// We refresh the page (to refresh the list of products and the total)
      	window.location.reload();
    	});
	});
}

// VALIDATION OF FORMS DATA

function formulaire() {
	let donneesFormulaire = document.querySelector(".cart__order__form");
	
	// Create RegExp
	let lettresRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
	let addresseRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]+$");
	let mailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
	
	// Modification of the first name
	donneesFormulaire.firstName.addEventListener("change", function () {
		let prenom = this;
		let prenomMessageErreur = prenom.nextElementSibling;
		if (lettresRegExp.test(prenom.value)) {
			prenomMessageErreur.textContent = "";
		} else {
			prenomMessageErreur.textContent = "Veuillez renseigner votre prénom";
		}
	});
	
	// Modification of the family name
	donneesFormulaire.lastName.addEventListener("change", function () {
		let nom = this;
		let nomMessageErreur = nom.nextElementSibling;
		if (lettresRegExp.test(nom.value)) {
			nomMessageErreur.textContent = "";
		} else {
			nomMessageErreur.textContent = "Veuillez renseigner votre nom";
		}
	});
	
	// Modify the address
	donneesFormulaire.address.addEventListener("change", function () {
		let adresse = this;
		let adresseMessageErreur = adresse.nextElementSibling;
		if (addresseRegExp.test(adresse.value)) {
			adresseMessageErreur.textContent = "";
		} else {
			adresseMessageErreur.textContent = "Veuillez renseigner votre adresse";
		}
	});
	
	// Modify the city
	donneesFormulaire.city.addEventListener("change", function () {
		let ville = this;
		villeMessageErreur = ville.nextElementSibling;
			if (lettresRegExp.test(ville.value)) {
			villeMessageErreur.textContent = "";
		} else {
			villeMessageErreur.textContent = "Veuillez renseigner votre ville";
		}
	});

	// Modification the mail
	donneesFormulaire.email.addEventListener("change", function () {
		let mail = this;
		let mailMessageErreur = mail.nextElementSibling;
		if (mailRegExp.test(mail.value)) {
			mailMessageErreur.textContent = "";
		} else {
			mailMessageErreur.textContent = "Veuillez renseigner votre email.";
		}
	});
}
formulaire();
  
// Function for sending the form
function envoiFormulaire() {
	let boutonCommander = document.querySelector("form");
  
	// Trigger command button
	boutonCommander.addEventListener("submit", function (event) {
	  event.preventDefault();
  
		// Form info
	  	let prenom = document.getElementById("firstName");
	  	let nom = document.getElementById("lastName");
	  	let adresse = document.getElementById("address");
	  	let ville = document.getElementById("city");
	  	let mail = document.getElementById("email");
  
		//Construction of an array from local storage
		let idProducts = [];
		for(const myProductId in cart) {
			let productLocalStorage = cart[myProductId];
			idProducts.push(productLocalStorage._id);
		}
		console.log(idProducts);

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
			localStorage.setItem('cart', '{}');
			document.location.href = "confirmation.html?orderId="+reponseID.orderId;
			})
			.catch(function (erreur) {
			console.log(erreur);
			});
		});
	}
	envoiFormulaire();