import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: true, 
        unique: true 
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    }
})

const UsuarioModel = mongoose.model("usuarios", schema);

export default UsuarioModel; 