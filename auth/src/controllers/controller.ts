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
  } catch (err: any) {
    console.error("Register error:", err?.response?.data || err.message);
    res.status(500).json({ msg: "Server error", error: err?.response?.data || err.message });
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

    if(user.is_active === false){
      res.status(401).json({ message: "Le compte est suspendu jusqu'à " + user.suspended_until });
      return;
    }

    const token = jwt.sign(
      { id: user.account_id, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '5m' }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // à mettre true en prod SEULEMENT avec HTTPS
        sameSite: 'lax',
        maxAge: 2 * 60 * 1000 //2 mins
      })
      .status(200)
      .json({ message: 'Successful Login !' });

  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
};



export const authenticate = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No token provided in cookie.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    const { id } = decoded as { id: string };
    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      res.status(200).json({
        message: 'User authenticated',
        user
      });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ message: 'Error retrieving user', error: err.message });
    }
  });
};



export const authenticateDeliveryMan = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    const { id, role } = decoded as { id: string; role: string };

    if (role !== 'DeliveryMan') {
      res.status(403).json({ message: `Access denied to deliveries, current role is : ${role}` });
      return;
    }

    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      res.status(200).json({ message: 'Access granted as Delivery Man', user });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ message: 'Error retrieving user', error: err.message });
    }
  });
};


export const authenticateRestaurateur = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    const { id, role } = decoded as { id: string; role: string };

    if (role !== 'Restaurateur') {
      res.status(403).json({ message: `Access denied to restaurants, current role is : ${role}` });
      return;
    }

    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      res.status(200).json({ message: 'Delivery man authenticated', user });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ message: 'Error retrieving user', error: err.message });
    }
  });
}


export const authenticateAdmin = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    const { id, role } = decoded as { id: string; role: string };

    if (role !== 'Admin') {
      res.status(403).json({ message: `Access denied to admin, current role is : ${role}` });
      return;
    }

    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      res.status(200).json({ message: 'Admin authenticated', user });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ message: 'Error retrieving user', error: err.message });
    }
  });
}


export const authenticateToID = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  const targetID = req.params.id;

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    const { id } = decoded as { id: string };

    if (id !== targetID) {
      res.status(403).json({ message: 'Access denied: user ID mismatch.' });
      return;
    }

    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      res.status(200).json({ message: 'User corresponds', user });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ message: 'Error retrieving user', error: err.message });
    }
  });
};

