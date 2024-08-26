import request from 'supertest';
import app from '../../app.js';

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
});