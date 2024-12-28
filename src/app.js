import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import menuRoutes from './routes/bot.js';
import pedidoRoutes from './routes/bot.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(menuRoutes);
app.use(pedidoRoutes);

export default app;

const startServer = async () => {
    try {
        await connectDB();
        console.log('Conexión a MongoDb exitosa');
        
    } catch (error) {
         console.error('Error al conectar a la base de datos:', error);
         process.exit(1)
         
    }
}

startServer();

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto ${PORT}`);
    
})