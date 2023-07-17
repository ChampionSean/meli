import {ItemModel} from "./models.js";


export class DbOperations {

    constructor() {
        this.itemModel = new ItemModel()
    }


    createNewItem(item) {
        this.itemModel.dbRepository.create(item)
        //this.itemModel.dbRepository.find().then(records => console.log(records))
    }
}