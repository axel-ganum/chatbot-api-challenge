import mongoose from "mongoose";
import Menu from "../models/menu.js";
import dotenv from "dotenv";

dotenv.config()

const seedData = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);

       const menu = [
        {
            nombre: "California Roll",
            descripcion: "Rollo de sushi con cangrejo, aguacate y pepino",
            precio: 120,
        },
        {
            nombre: "Spicy Tuna Roll",
            descripcion: "Rollo de sushi con atún picante y mayonesa",
            precio: 140,
        },
        {
            nombre: "Ebi Tempura Roll",
            descripcion: "Rollo con camarón tempura y aguacate",
            precio: 160,
        },
        {
            nombre: "Salmon Nigiri",
            descripcion: "Porción de arroz con una lonja de salmón fresco",
            precio: 90,
        },
        {
            nombre: "Rainbow Roll",
            descripcion: "Rollo de sushi decorado con diferentes tipos de pescado y aguacate",
            precio: 180,
        },
        {
            nombre: "Veggie Roll",
            descripcion: "Rollo vegetariano con zanahoria, aguacate, y pepino",
            precio: 100,
        },
        {
            nombre: "Dragon Roll",
            descripcion: "Rollo con anguila, aguacate y topping de salsa unagi",
            precio: 200,
        },
        {
            nombre: "Miso Soup",
            descripcion: "Sopa tradicional japonesa con tofu, alga wakame y cebolleta",
            precio: 50,
        },
        {
            nombre: "Gyozas de Cerdo",
            descripcion: "Dumplings rellenos de cerdo servidos con salsa ponzu",
            precio: 80,
        },
        {
            nombre: "Sashimi Variado",
            descripcion: "Selección de cortes finos de pescado fresco",
            precio: 250,
        },
        {
            nombre: "Edamame",
            descripcion: "Frijoles de soya al vapor con sal marina",
            precio: 60,
        },

       ];

       await Menu.insertMany(menu);
       console.log("Datos insertados en el menú");
       mongoose.connection.close();
    } catch (error) {
        console.error("Error al insertar datos:", error);
        process.exit(1);
         
    }
};

seedData();