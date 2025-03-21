import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    console.log('secret', process.env.JWT_SECRET_KEY);
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY as string);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Failed to login', err);
    res.status(500).json({ error: 'Failed to login' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
