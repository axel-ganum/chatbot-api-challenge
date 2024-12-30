import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = 3000;


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
