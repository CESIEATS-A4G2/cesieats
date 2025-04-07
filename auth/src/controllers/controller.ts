import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';

const API_URL = 'http://api:3000/api/accounts';


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    const user = await axios.post(API_URL, {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user'
    });
    
    res.status(201).json({
      msg: 'New User created !',
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err })
  }
};



export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { data: accounts } = await axios.get(`${API_URL}`);
    const user = accounts.find((acc: any) => acc.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '2m' }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // à mettre true en prod si HTTPS
        sameSite: 'lax',
        maxAge: 2 * 60 * 1000
      })
      .status(200)
      .json({ message: 'Successful Login !' });

  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
};



export const authenticate = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(403).json({ message: 'No token provided in cookie.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    const { id } = decoded as { id: number };


    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      res.status(200).json({
        message: 'User authenticated',
        user: user.username
      });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ message: 'Error retrieving user', error: err.message });
    }
  });
};
