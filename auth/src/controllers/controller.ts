import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const User_DB: User[] = [];

export const register = (req: Request, res: Response): void => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User(req.body.username, hashedPassword);
  User_DB.push(newUser);

  res.status(201).json({
    msg: 'New User created !',  
  });
};



export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;
  
    const user = User_DB.find(
      (u) => u.username === username && bcrypt.compareSync(password, u.password)
    );
  
    if (user) {
      const token = jwt.sign(
        { username: user.username, exp: Math.floor(Date.now() / 1000) + 120 },
        process.env.JWT_SECRET as string
      );
  
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: false, // needs to be true if HTTPS 
          sameSite: 'lax',
          maxAge: 2 * 60 * 1000 // 2 min
        })
        .status(200)
        .json({ message: 'You are now connected !' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };



  
export const authenticate = (req: Request, res: Response): void => {
    const token = req.cookies.token;
  
    if (!token) {
      res.status(403).json({ message: 'No token provided in cookie.' });
      return;
    }
  
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
        return;
      }
  
      const user = User_DB.find((u) => u.username === decoded.username);
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
  
      res.status(200).json({
        message: 'User authenticated',
        user: user.username
      });
    });
};
  