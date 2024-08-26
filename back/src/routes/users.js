import express from 'express';
import { createUser } from '../controllers/Users/create.js';
import { getUserById, getUsers } from '../controllers/Users/read.js';
import { updateUser } from '../controllers/Users/update.js';
import { deleteUser } from '../controllers/Users/delete.js';

const router = express.Router();

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;