import express from 'express';
import mongoose from 'mongoose';
import userRoute from './src/routes/users.js';

const app = express();

app.use(express.json());

// const mongoUrl = "mongodb://localhost:27017/crm";
// Conection to mongoDB with docker compose service name
const mongoUrl = "mongodb://mongo:27017/crm";

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'API is working' });
});

app.use('/api/users', userRoute);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default app;
