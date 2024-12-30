import express from 'express';
import dotenv from 'dotenv';
import connectDB  from './config/db.js';
import menuRoutes from './routes/bot.js';
import pedidoRoutes from './routes/bot.js'
import satusRoutes from './routes/bot.js'

dotenv.config();


const app = express();



app.use(express.json());

app.use(menuRoutes);
app.use(pedidoRoutes);
app.use(satusRoutes);

export default app;


const PORT = 3000;
 


