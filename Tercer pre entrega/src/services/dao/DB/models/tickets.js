import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collecctionName = "tickets";

const ticketSchema = new mongoose.Schema ({
    
    code: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    
    purchase_datatime: {
        type: Date,
        default: Date.now,
    },

    amount: {
        type: Number,
        required: true,
    },

    purchaser: {
        type: String,
        required: true,
        trim: true,
    },
});

ticketSchema.plugin(mongoosePaginate);
const ticketModel = mongoose.model(collecctionName, ticketSchema);

export default ticketModel;