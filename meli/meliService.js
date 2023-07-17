import {MeliClient} from "./restClient.js";
import {Parser} from "./parseFile.js";
import {DbOperations} from "./DbOperations.js";
import {ItemMeli} from "./ItemMeli.js";

export class MeliService {

    constructor() {
        this.client = new MeliClient();
        this.parser = new Parser();
        this.dbOperations = new DbOperations();
    }

    startProcess(token) {
        //let tokenList = this.parser.parseFile();
        //tokenList = tokenList.slice(0, 10)
        //tokenList.forEach(token => {
        //let token = 'MLA664384760'

        console.log('first token ' +  token.toString())
            this.client.getItemsDesc(token).then(resp => {
                console.log('Item api consumed ' + resp.data + " token " + token)
                let promiseCategory = this.client.requestCategoryName(resp.data.category_id)

                let promiseCurrency = this.client.requestCurrencyDescription(resp.data.currency_id)

                let promiseUserData = this.client.getUserNickName(resp.data.seller_id)

                console.log('executing promise all ' + " token " + token)

                Promise.all([promiseCategory, promiseCurrency, promiseUserData])
                    .then(values=> {
                        console.log('promises consumed ' + " token " + token)
                        let itemMeli = this.builtItem(token, resp, values[0], values[1], values[2])
                        this.dbOperations.createNewItem(itemMeli);
                        console.log('Object saved ' + itemMeli + " token " + token)
                    });
            }).catch(this.handleErrorResp)
        //});
    }

    handleErrorResp = error => {
        if(!(error.data === undefined)){
            console.error("Error response: " + error.data)
        } else {
            console.error("Error response: " + error)
        }
    };

    builtItem = (token, itemData, categoryData, currencyData, userData) => {
        let nameCategory, descCurrency, nickUser = undefined
        if (!(categoryData === undefined)) {
            nameCategory = categoryData.data.name
        }

        if (!(currencyData === undefined)) {
            descCurrency = categoryData.data.description
        }

        if (!(userData === undefined)) {
            nickUser = categoryData.data.nickname
        }

        return new ItemMeli(
            token.substring(0,3),
            token.substring(3),
            itemData.data.price,
            itemData.data.start_time,
            nameCategory,
            descCurrency,
            nickUser);

    }

}