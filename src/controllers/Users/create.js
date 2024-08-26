import User from '../../models/UserSchema.js';

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone } = req.body;
        if (!firstname || !lastname || !email || !phone) {
            return res.status(400).send({ error: 'All fields are required' });
        }
        
        const user = new User({ firstname, lastname, email, phone });
        await user.save();
        
        res.status(201).send({ message: 'User created successfully', user });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send({ error: 'Invalid user data' });
        }
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
};
