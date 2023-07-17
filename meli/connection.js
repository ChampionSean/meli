import mongoose from "mongoose";

const mongoDBHost = 'mongodb://127.0.0.1:27017/myapp';

export const startConnection = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoDBHost);
}
