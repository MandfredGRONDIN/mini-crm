import request from 'supertest';
import app from './app';

describe('API Tests', () => {
    it('should return status code 200 and a success message when GET /api', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('API is working');
    });

    it('should return status code 404 and an error message when GET /api/invalid-route', async () => {
        const response = await request(app).get('/api/invalid-route');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Route not found');
    });

    it('should return status code 201 and a success message when POST /api/users', async () => {
        const newUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            phone: '1234567890'
        };

        const response = await request(app).post('/api/users/').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should return status code 400 and an error message when POST /api/users with invalid data', async () => {
        const invalidUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'invalidemail',
            phone: '1234567890'
        };

        const response = await request(app).post('/api/users/').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid user data');
    });
});