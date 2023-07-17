import mongoose from "mongoose";

//Customer.find().then(records => console.log(records))



export class ItemModel {

        constructor() {
                this.dbRepository = mongoose.model('Item', new mongoose.Schema(
                    {
                            site: String,
                            id: Number,
                            price: String,
                            start_time: String,
                            name: String,
                            description: String,
                            nickname: String}));
        }
}