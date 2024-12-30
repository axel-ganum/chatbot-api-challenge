import request from "supertest";
import app from "../app.js";
import Pedido from "../models/pedido.js";
import { ObjectId } from 'mongodb';

jest.mock('../models/pedido.js');

describe("Chatbot Sushi API", () => {
    it('Debería crear un pedido con éxito', async () => {
        const mockPedido = {
            cliente: 'Cliente1',
            productos: [
                {
                    nombre: 'California Roll',
                    cantidad: 2,
                    _id: new ObjectId('6771da60ec8769cc862173bc'),
                },
                {
                    nombre: 'Spicy Tuna Roll',
                    cantidad: 1,
                    _id: new ObjectId('6771da60ec8769cc862173bd'),
                },
            ],
            total: 380,
            _id: new ObjectId('6771da60ec8769cc862173bb'),
            fecha: new Date(),
            __v: 0,
            save: jest.fn().mockResolvedValue(true),
        };
    
        Pedido.mockImplementation(() => mockPedido);
    
        const res = await request(app)
            .post('/pedido')
            .send({
                cliente: 'Cliente1',
                productos: [
                    { nombre: 'California Roll', cantidad: 2, precio: 10 },
                    { nombre: 'Spicy Tuna Roll', cantidad: 1, precio: 8 },
                ],
            });
    
        expect(res.statusCode).toBe(201);
        expect(res.body.mensaje).toBe('Pedido creado con éxito');
    
        const expectedPedido = {
            ...mockPedido,
            _id: mockPedido._id.toString(),
            productos: mockPedido.productos.map(p => ({
                ...p,
                _id: p._id.toString(),
            })),
            fecha: mockPedido.fecha.toISOString(),
        };
        const { save, ...expectedPedidoSinSave } = expectedPedido;
        expect(res.body.Pedido).toEqual(expectedPedidoSinSave);
        expect(mockPedido.save).toHaveBeenCalled();
    });
    
});
