import express from 'express';
import { login, register } from '../controllers/auth_controller.js'; // 👈 Must include .js

const authRouter = express.Router();

// Register Route
authRouter.post('/register', register);

// Login Route
authRouter.post('/login', login);

export default authRouter;
