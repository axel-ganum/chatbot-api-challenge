import express from 'express';
import dotenv from 'dotenv';
import menuRoutes from './routes/bot.js';
import pedidoRoutes from './routes/bot.js';
import statusRoutes from './routes/bot.js';  
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(express.json());


app.use(menuRoutes);
app.use(pedidoRoutes);
app.use(statusRoutes); 

export default app;


 


