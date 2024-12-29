import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

describe("Chatbot Sushi API - Pedidos", () => {
    let server;

    beforeAll(async () => {
        
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.TEST_DB);
        }

        
        server = app.listen(0, () => {
            console.log(`Server escuchando en un puerto disponible`);
        });
    });

    afterAll(async () => {

        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        server.close();
    });

    it("Debería crear un pedido con éxito", async () => {
        const res = await request(app)
            .post("/pedido")
            .send({
                cliente: "Axel",
                productos: [
                    { nombre: "California Roll", cantidad: 2, precio: 120 },
                    { nombre: "Spicy Tuna Roll", cantidad: 1, precio: 140 },
                ],
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.pedido).toHaveProperty("_id");
        expect(res.body.total).toBe(380);
    }, 20000);
});
