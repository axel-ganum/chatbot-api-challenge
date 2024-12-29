import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
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

const PORT = process.env.TEST_PORT|| 3000;
 
const startServer = async () => {
    try {
        await connectDB();
        console.log('Conexión a MongoDb exitosa');
        
    } catch (error) {
         console.error('Error al conectar a la base de datos:', error);
         return;
         
    }
    app.listen(PORT, () => {
       console.log(`Server escuchando en el puerto ${PORT}`);
       
    })
}

startServer();



