import express from 'express';
import { createUser } from './controllers/usercontrol.js'; // adjust path if needed

const router = express.Router();

// POST /api/users - Create a new user
router.post('/users', createUser);

export default router;
