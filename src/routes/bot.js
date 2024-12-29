 import express from "express";
 import { obtenerMenu, crearPedido, obtenerStatus} from "../controllers/botController.js";
 const router = express.Router();

 router.get('/menu', obtenerMenu);
 router.post('/pedido', crearPedido);
 router.post('/status', obtenerStatus);

 export default router

