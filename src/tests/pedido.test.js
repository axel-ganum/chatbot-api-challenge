import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

describe("Chatbot Sushi API - Pedidos", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_DB_URI)
    });
    
  afterAll(async () => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
  });

  it("Deberia crear un pedido con éxito", async () => {
      const res = await request(app)
         .post("/pedido")
         .send({
            cliente: "Axel",
            peoductos: [
                { nombre: "California Roll", cantidad: 2, precio: 120 },
                { nombre: "Spicy Tuna Roll", cantidad: 1, precio: 140 },
            ],
         });

         expect(res.statusCode).toBe(201);
         expect(res.body.pedido).toHaveProperty("_id")
         expect(res.body.total).toBe(380)
  })