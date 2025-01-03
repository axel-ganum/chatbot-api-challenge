import Menu from '../models/menu.js';
import Pedido from '../models/pedido.js';
import dotenv from 'dotenv';

dotenv.config();


export const obtenerStatus = async (req, res) => {
    let pregunta = req.body.pregunta?.toLowerCase().trim(); 

    pregunta = pregunta.replace(/[¿?¡!]/g, '').trim();

    console.log('Pregunta recibida (depuración extendida):', pregunta); 
    
    const preguntasRelacionadas = [
        'abiertos',
        'abierto',
        'cerrado',
        'horario',
        'cuándo abren',
        'cuándo cierran',
        'disponibilidad',
        'hasta qué hora están',
        'a qué hora abren',
        'qué hora cierran',
        'a qué hora cierran',
        'horarios de apertura',
        'horarios de cierre',
        'están abiertos ahora'
    ];

    const preguntasMenu = [
        'mostrar menú',
        'ver menú',
        'quiero el menú',
        'dame el menú',
        'mostrar la carta'
    ];

    if (preguntasMenu.some(frase => pregunta.includes(frase))) {
        try {
            const menu = await Menu.find();
            return res.status(200).json({ status: 'menu', mensaje: 'Aquí está nuestro menú', menu });
        } catch (error) {
            console.error('Error al obtener el menú:', error);
            return res.status(500).json({ status: 'error', mensaje: 'Error al obtener el menú' });
        }
    }
     
    let contienePalabraClave = false;

    preguntasRelacionadas.forEach((palabra) => {
      const regex = new RegExp(palabra, 'i'); 
      if (regex.test(pregunta)) {
        contienePalabraClave = true;
      }
    });
 
    if (contienePalabraClave) {
        const ahora = new Date();
        const horaActual = ahora.getHours(); 

       const horarioApertura = process.env.HORARIO_APERTURA ? parseInt(process.env.HORARIO_APERTURA, 10) : 12;
       const horarioCierre = process.env.HORARIO_CIERRE ? parseInt(process.env.HORARIO_CIERRE, 10) : 23;

        if (pregunta.includes('abierto') || pregunta.includes('abiertos ahora') || pregunta.includes('están abiertos ahora')) {
            if (horaActual >= horarioApertura && horaActual <= horarioCierre) {
                res.status(200).json({ status: 'abierto', mensaje: '¡Estamos abiertos, haz tu pedido!' });
            } else {
                res.status(200).json({ status: 'cerrado', mensaje: `Estamos cerrados. Nuestro horario es de ${horarioApertura} AM a ${horarioCierre} PM.` });
            }
        }
        
        else if (pregunta.includes('cierran') || pregunta.includes('hora cierran') || pregunta.includes('hasta qué hora están')) {
            res.status(200).json({ status: 'horario', mensaje: `Nuestro horario de cierre es a las ${horarioCierre} PM.` });
        }
       
        else if (pregunta.includes('abren') || pregunta.includes('hora abren')) {
            res.status(200).json({ status: 'horario', mensaje: `Nuestro horario de apertura es a las ${horarioApertura} AM.` });
        }
        else {
            if (horaActual >= horarioApertura && horaActual <= horarioCierre) {
                res.status(200).json({ status: 'abierto', mensaje: '¡Estamos abiertos, haz tu pedido!' });
            } else {
                res.status(200).json({ status: 'cerrado', mensaje: `Estamos cerrados. Nuestro horario es de ${horarioApertura} AM a ${horarioCierre} PM.` });
            }
        }
    } else {
        res.status(400).json({ status: 'error', mensaje: 'No entiendo la pregunta. ¿Queres saber si estamos abiertos?' });
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

  console.log('Nuevo pedido creado:', nuevoPedido)
  res.status(201).json({mensaje: 'Pedido creado con éxito', Pedido: nuevoPedido});

    } catch (error) {
       console.error('Error al crear el pedido:', error);
       res.status(500).json({error: 'Error interno del servidor'})
    }
}




