import axios from "axios";


export class MeliClient{


    requestCategoryName(categoryId) {
        if(!(categoryId === undefined)) {
            return axios.get('https://api.mercadolibre.com/categories/' + categoryId)
        } else {
            return new Promise(() => '')
        }
    }

    requestCurrencyDescription(currenciId) {
        if(!(currenciId === undefined)) {
            return axios.get('https://api.mercadolibre.com/currencies/' + currenciId)
        }

    }


    getUserNickName(userId) {
        if(!(userId === undefined)) {
            return axios.get('https://api.mercadolibre.com/users/' + userId)
        }
    }


    getItemsDesc(itemId) {
        if(!(itemId === undefined)) {
            return axios.get('https://api.mercadolibre.com/items/' + itemId)
        }
    }

}