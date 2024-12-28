import Menu from '../models/menu.js';
import Pedido from '../models/pedido.js';
export const obtenerMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu)
    } catch (error) {
        console.error('Error al obtener el menú:', error);
        res.status(500).json({error: 'No se pudo obtener el menú'});
        
    }
}

export const crearPedido = async (req, res) => {
    try {
        const {cliente, productos} = req.body;
  if (!cliente || !productos || productos.length === 0) {
    return res.status(400).json({error: 'Cliente y productos son requeridos'});
    
  }

  const total = productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

  const nuevoPedido = new Pedido({cliente, productos, total});

  await nuevoPedido.save();
  res.status(201).json({mensaje: 'Pedido creado con éxito', Pedido: nuevoPedido});

    } catch (error) {
       console.error('Error al crear el pedido:', error);
       res.status(500).json({error: 'Error interno del servidor'})
    }
}
