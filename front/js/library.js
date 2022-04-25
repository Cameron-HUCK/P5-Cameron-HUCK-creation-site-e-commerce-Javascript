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
};
