 import express from "express";
 import { crearPedido, obtenerStatus} from "../controllers/botController.js";
 const router = express.Router();


 router.post('/status', obtenerStatus);
 router.post('/pedido', crearPedido);

 export default router

