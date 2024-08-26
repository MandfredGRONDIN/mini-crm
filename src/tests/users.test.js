import request from 'supertest';
import app from '../../app.js';
import User from '../models/UserSchema.js';

describe('User API Tests', () => {
    let userId;

    beforeAll(async () => {
        const response = await request(app).post('/api/users/').send({
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'janedoe@example.com',
            phone: '0987654321'
        });
        userId = response.body.user._id;
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should return status code 201 and a success message when POST /api/users with valid data', async () => {
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

    it('should return status code 400 and an error message when POST /api/users with missing fields', async () => {
        const invalidUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com'
        };

        const response = await request(app).post('/api/users/').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('All fields are required');
    });

    it('should return status code 400 and an error message when POST /api/users with invalid email', async () => {
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

    it('should return status code 500 and an error message when POST /api/users with an unexpected error', async () => {
        jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error('Unexpected error'));

        const newUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            phone: '1234567890'
        };

        const response = await request(app).post('/api/users/').send(newUser);
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('An unexpected error occurred');
    });

    it('should return status code 200 and user details when GET /api/users/:id', async () => {
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(userId);
        expect(response.body.email).toBe('janedoe@example.com');
    });    

    it('should return status code 404 and an error message when GET /api/users/:id with invalid ID', async () => {
        const invalidId = 'invalidid';
        const response = await request(app).get(`/api/users/${invalidId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    }, 10000); 

    it('should return status code 200 and updated user details when PUT /api/users/:id with valid data', async () => {
        const updatedUser = {
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'janesmith@example.com',
            phone: '0987654321'
        };
    
        const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
        expect(response.body.email).toBe('janesmith@example.com'); 
    });    

    it('should return status code 400 and an error message when PUT /api/users/:id with invalid data', async () => {
        const invalidUpdate = {
            email: 'invalidemail'
        };
    
        const response = await request(app).put(`/api/users/${userId}`).send(invalidUpdate);
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch(/Validation failed: email: invalidemail is not a valid email address!/);
    });    

    it('should return status code 200 and a success message when DELETE /api/users/:id', async () => {
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    });
    
    it('should return status code 500 and an error message when DELETE /api/users/:id with invalid ID', async () => {
        const invalidId = 'invalidid';
        const response = await request(app).delete(`/api/users/${invalidId}`);
        expect(response.status).toBe(500);
        expect(response.body.error).toMatch(/Cast to ObjectId failed for value "invalidid" \(type string\) at path "_id" for model "User"/);
    });    
});
