import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    descripcion: {type: String},
    precio:  {type: Number, required:true},

});

const Menu = mongoose.model("Menu", MenuSchema)

export default Menu;
