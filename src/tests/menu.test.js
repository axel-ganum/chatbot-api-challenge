import request from "supertest";
import app from "../app.js";
import dotenv from 'dotenv';
import Menu from "../models/menu.js";

dotenv.config();

jest.mock('../models/menu.js');

describe("Chatbot Sushi API", () => {
    it("Deberia devolver el menú", async () => {

        const mockMenu = [
            { nombre: 'California Roll', precio: 150 },
            { nombre: 'Spicy Tuna Roll', precio: 180 },
          ];
      
        
          Menu.find.mockResolvedValue(mockMenu);
        const res = await request(app).get('/menu');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockMenu);
    });
})
