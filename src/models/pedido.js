import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema ({
    cliente: {type: String, required: true},
    productos: [
        {
            nombre: {type: String, required: true},
            cantidad: {type: Number, required: true}
        },
    ],
    total: {type: Number, required: true},
    fecha: {type: Date, default: Date.now},
})

const Pedido = mongoose.model('pedido', PedidoSchema);

export default Pedido;