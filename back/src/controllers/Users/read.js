import User from "../../models/UserSchema.js";
import mongoose from 'mongoose';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(500).send({ error: err.message });
    }
};