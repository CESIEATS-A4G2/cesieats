import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

interface IUser {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  deliveryAddresses?: string[],
  paymentMethods?: string[],
  preferredRestaurant?: string,
  rating?: number;
}

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

const User_DB: IUser[] = [];

export const register = async (req: Request, res: Response): Promise<void> => {
  const newUser: IUser = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10), // await pour bcrypt.hash
    fullName: undefined,
    phoneNumber: undefined,
    deliveryAddresses: undefined,
    paymentMethods: undefined,
    preferredRestaurant: undefined,
    rating: undefined
  };
  const headers = {
    'Content-Type': 'application/json'
  };

  //User_DB.push(newUser);
  try {
    const response = await axios.post(`http://api:3000/api/accounts`, {newUser}, {
      headers: {
          'Content-Type': 'application/json', // JSON
      }
  });
  res.status(201).json({ msg: "New User created!" });
  return;
  } catch (error) {
    res.status(500).json({message: "Error adding user in account service.",error});
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = User_DB.find(
    (u) => u.email === email && bcrypt.compareSync(password, u.password)
  );

  if (user) {
    const accessToken = jwt.sign(
      { username: user.email, exp: Math.floor(Date.now() / 1000) + 120 },
      process.env.JWT_KEY!
    );
    res
      .status(200)
      .json({ message: "You are now connected!", authorization: accessToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
    } else {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      jwt.verify(
        token,
        process.env.JWT_KEY as string,
        async (err, decoded: any) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Invalid or expired token." });
          }

          // Appel à l'API de gestion des comptes pour vérifier si l'utilisateur existe
          try {
            const response = await axios.get(
              `http://localhost:3000/api/accounts/${decoded.id}`
            );

            // Si l'utilisateur existe, ajouter les informations à la requête
            if (response.data) {
              req.user = response.data;
              next(); // Passer au middleware suivant
            } else {
              return res.status(404).json({ message: "User not found." });
            }
          } catch (error) {
            return res
              .status(500)
              .json({
                message: "Error checking user in account service.",
                error,
              });
          }
        }
      );
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during authentication.", error });
  }
};
