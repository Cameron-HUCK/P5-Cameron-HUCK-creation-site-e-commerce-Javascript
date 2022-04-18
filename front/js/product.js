// Récupération de l'url de la page et l'ID produit
let urlString =  document.location.href;
let urlObject =  new URL(urlString);
let productId = urlObject.searchParams.get('id');

// Récupération des donnees du produit en provenance de l'API du productID
fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(value) {
	let product = value;

	// Integrer / Injecter les donnees recuperees de l'API dans le HTML de la page

	// Modifier l'image de la page avec l'image du produit
	let imgId = document.getElementById ("img_origin");
	imgId.setAttribute("src", product.imageUrl);
	imgId.setAttribute("alt", product.altTxt);

	// Modifier le titre de la page avec le nom du produit
	let title = document.getElementById('title');
	title.textContent = product.name;

	// Modification du prix avec le bon prix de chaque produit
	let priceProduct = document.getElementById('price');
	priceProduct.textContent = product.price;

	//Modification de la description de chaque produit
	let contentDescription_Product = document.getElementById('description');
	contentDescription_Product.textContent = product.description;

	// Modification des couleurs proposer de chaque produit en recuperant chaque couleur dans le tableau
	let colorsProduct = product.colors;
	let colors_Select = document.getElementById('colors');
	colorsProduct.forEach(function (element, key) {
		colors_Select[key] = new Option(element);
	});
})
.catch(function(err) {
	console.log(err);
});

// Au click sur le bouton "ajout panier ", je veux ajouter mon produit dans le panier
// Ecouter le bouton
let idCart = document.getElementById('addToCart');
idCart.addEventListener('click', (event) => {
	// Empecher reactualisation de la page au click
	event.preventDefault();

	// Récupération des informations du produit à mettre dans le panier
	let qtyProduct = document.getElementById('quantity');
	let productToAdd = {};
	productToAdd._id = productId;
	productToAdd.qty = qtyProduct.value;
	productToAdd.color = document.getElementById('colors').value;

	if(productToAdd.qty > 0) {
		// Je récupère le contenu de mon panier depuis le LocalStorage
		let cart = JSON.parse(localStorage.getItem("cart")); // Permet de convertir le JSON (string) stocké dans le LocalStorage en objet JavaScript
		if(cart == null) {
			cart = {};
		}

		// Création d'une clef unique produit ID + Couleur
		let productCartKey = productToAdd._id+'_'+productToAdd.color;
		// On regarde si le produit est déjà dans le panier
		if(cart[productCartKey] == undefined) {
			// Le produit n'est pas déjà dans le panier
			cart[productCartKey] = productToAdd;
			let msgALert = `Votre produit est dans le panier`;
			msgALert= window.confirm(`Votre produit est dans le panier`);
			console.log(msgALert);
		}
		else {
			// Le produit est déjà dans le panier
			cart[productCartKey].qty = parseInt(cart[productCartKey].qty) + parseInt(productToAdd.qty);
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		console.log(cart);
	}
})

