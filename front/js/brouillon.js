  // fonction pour l'envoi du formulaire
  function envoiFormulaire() {
    let boutonCommander = document.querySelector("form");
    
    // declencheur bouton commander
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
      for (let i = 0; i < panierRecup.length; i++) {
      idProducts.push(panierRecup[i].id);
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
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      };
    
      fetch("http://localhost:3000/api/products/order", envoi)
      .then(function (reponseAPI) {
        return reponseAPI.json();
      })
    
      .then(function (reponseID) {
        localStorage.clear();
        localStorage.setItem("orderId", reponseID.orderId);
        document.location.href = "confirmation.html";
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
    });
    }
    envoiFormulaire();