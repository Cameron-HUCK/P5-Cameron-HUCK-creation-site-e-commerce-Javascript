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
let productId = getParamUrl('id');
let orderId = getParamUrl('orderId');
