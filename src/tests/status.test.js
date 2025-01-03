import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";
import Menu from "../models/menu.js";

dotenv.config();

describe("Chatbot Sushi API - Estado del restaurante y menú", () => {
    beforeAll(() => {
        process.env.HORARIO_APERTURA = process.env.HORARIO_APERTURA || "12";
        process.env.HORARIO_CIERRE = process.env.HORARIO_CIERRE || "23";
    });

    beforeEach(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Debería responder que el restaurante está abierto si la pregunta incluye 'abiertos'", async () => {
        const res = await request(app)
            .post("/status")
            .send({ pregunta: "¿Están abiertos ahora?" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: "abierto",
            mensaje: "¡Estamos abiertos, haz tu pedido!",
        });
    });

    it("Debería responder con el horario de cierre si la pregunta incluye 'a qué hora cierran'", async () => {
        const res = await request(app)
            .post("/status")
            .send({ pregunta: "¿A qué hora cierran?" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: "horario",
            mensaje: "Nuestro horario de cierre es a las 23 PM.",
        });
    });

    it("Debería responder con un error para preguntas no relacionadas", async () => {
        const res = await request(app)
            .post("/status")
            .send({ pregunta: "¿Cómo está el clima hoy?" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            status: "error",
            mensaje: "No entiendo la pregunta. ¿Queres saber si estamos abiertos?",
        });
    });

    it("Debería responder con el menú si se solicita", async () => {
        jest.spyOn(Menu, 'find').mockResolvedValue([{ nombre: 'Sushi Roll', precio: 100 }]);

        const res = await request(app)
            .post("/status")
            .send({ pregunta: "quiero el menú" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: "menu",
            mensaje: "Aquí está nuestro menú",
            menu: [{ nombre: 'Sushi Roll', precio: 100 }]
        });
    });

    it("Debería manejar errores al obtener el menú", async () => {
        jest.spyOn(Menu, 'find').mockRejectedValue(new Error("Error de conexión"));

        const res = await request(app)
            .post("/status")
            .send({ pregunta: "quiero el menú" });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
            status: "error",
            mensaje: "Error al obtener el menú"
        });
    });
});




