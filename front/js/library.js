 // Allows to get param from url
 function getParamUrl(param = '') {
    if(param == '') {
        return '';
    }
    else {
        let url = document.location.href;
        let urlObject = new URL(url);
        let value = urlObject.searchParams.get(param);
        if(value == null) {
            return '';
        }
        else {
            return value;
        }
    }
}

// Allows to get cart from LocalStorage
function getCart() {
    let cartJsonFromLocalStorage = localStorage.getItem("cart");
    if(cartJsonFromLocalStorage == null) {
        return {};
    }
    try {
        let cart = JSON.parse(cartJsonFromLocalStorage);
        return cart;
    }
    catch(e) {
        console.log(e);
        return {};
    }
}

// Allows to validate form order
function validateFormOrder() {
    // Initialisations
   let form = document.querySelector("form.cart__order__form");
   let response = true;

    // Creation des RegExp
    let lettresRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addresseRegExp = new RegExp("^[a-zA-Z0-9\s,'-]*$");
    let mailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

    // Validating firstname
    let firstname = form.firstName;
    let firstnameError = firstname.nextElementSibling;
    if(lettresRegExp.test(firstname.value)) {
        firstnameError.textContent = "";
    } else {
        firstnameError.textContent = "Veuillez corriger votre prénom";
        response = false;
    }

    // Validating lastName
    let lastName = form.lastName;
    let lastNameError = lastName.nextElementSibling;
    if(lettresRegExp.test(lastName.value)) {
        lastNameError.textContent = "";
    } else {
        lastNameError.textContent = "Veuillez corriger votre nom";
        response = false;
    }

    // Validating adresse
    let adresse = form.address;
    let adresseError = adresse.nextElementSibling;
    if(addresseRegExp.test(adresse.value)) {
        adresseError.textContent = "";
    } else {
        adresseError.textContent = "Veuillez corriger votre adresse";
        response = false;
    }

    // Validating city
    let city = form.city;
    let cityError = city.nextElementSibling;
    if(lettresRegExp.test(city.value)) {
    cityError.textContent = "";
    } else {
    cityError.textContent = "Veuillez corriger votre ville";
    response = false;
    }

    // Validating email
    let email = form.email;
    let emailError = email.nextElementSibling;
    if(mailRegExp.test(email.value)) {
        emailError.textContent = "";
    } else {
    emailError.textContent = "Veuillez corriger votre email";
    response = false;

    }
    // Return response
    return response;
}

// Allows to send form order
function sendFormOrder() {

    // Listen to form submission
    let form = document.querySelector("form.cart__order__form");
    form.addEventListener("submit", function(event) {
        // Cancelling form submission
        event.preventDefault();
        
        // Info du formulaire
        let prenom = document.getElementById("firstName");
        let nom = document.getElementById("lastName");
        let adresse = document.getElementById("address");
        let ville = document.getElementById("city");
        let mail = document.getElementById("email");

        // Construction d'un array depuis le local storage
        let idProducts = [];
        for(const myProductId in cart) {
        let productLocalStorage = cart[myProductId];
        idProducts.push(productLocalStorage._id);
        }
        console.log(idProducts);

        // Creating order
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

        // Creating object to send to API
        const envoi = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        // Sending object to API
        fetch(`http://localhost:3000/api/products/order`, envoi)
        .then(function (reponseAPI) {
            return reponseAPI.json();
        })
        .then(function (reponseID) {
            localStorage.setItem('cart', '{}');
            document.location.href = "confirmation.html?orderId="+reponseID.orderId;
        })
        .catch(function (erreur) {
            let msgALert = `Erreur, commande non détecter`;
	        msgALert = window.alert(`Erreur, commande non détecter`);
        });
    }
)}
