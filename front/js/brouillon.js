//########################################################################################################## BOUTON SUPPRIMER
 
      // Supprimation des articles avec le buttons Supprimer
      let btn_supprimer = document.querySelectorAll(".deleteItem");
      for (let l = 0; l < btn_supprimer.length; l++) {
        btn_supprimer[l].addEventListener('click', (event) => {
          event.preventDefault();
          console.log(btn_supprimer);

          // Selection de l'id du produit qui va etre supprimer en cliquant sur le bouton
          let id_Delete_Product =  productLocalStorage[l]._id;
          console.log(id_Delete_Product);

          // avec la methode filter je selectionne les elements et je supprime l'element ou le btn a ete cliquer
          //productLocalStorage = productLocalStorage.filter(el => el._id != id_Delete_Product);
          //console.log(productLocalStorage);
        });
    }
    //########################################################################################################## Modification de la quantiter
        // Nous selectionnons la classe 'itemQuantity' qui contient le bouton 
        let change_Quantity = document.getElementsByClassName('itemQuantity');
        for (let l = 0; l < change_Quantity.length; l++) {
        // Creation du bouton pour changer la quantiter
            change_Quantity[l].addEventListener('click', (event) => {
              event.preventDefault();
              console.log(change_Quantity);

        // Selection du produit qui change de quantiter
        var changeProduct = productLocalStorage[l]._id
        changeProduct = changeProduct.closest(change_Quantity);
        console.log(changeProduct);

        })
      }