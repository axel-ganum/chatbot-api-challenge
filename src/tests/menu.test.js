import request from "supertest";
import app from "../app.js"

describe("Chatbot Sushi API", () => {
    it("Deberia devolver el menú", async () => {
        const res = await request(app).get('/menu');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
})
