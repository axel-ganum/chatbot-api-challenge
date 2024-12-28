 import express from "express";
 import { obtenerMenu, crearPedido} from "../controllers/botController.js";
 const router = express.Router();

 router.get('/menu', obtenerMenu);
 router.post('/pedido',crearPedido);
 router.get('/status');

 export default router

