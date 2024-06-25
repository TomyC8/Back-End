import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collecctionName = "products";

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true,
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true,
}

const productSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    price: stringTypeSchemaNonUniqueRequired,
    thumbnail: stringTypeSchemaNonUniqueRequired,
    code: stringTypeSchemaNonUniqueRequired,
    stock: stringTypeSchemaNonUniqueRequired,
    status: stringTypeSchemaNonUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired,
})

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, productSchema);

export default productsModel;