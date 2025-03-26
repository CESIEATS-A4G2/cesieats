import { Request, Response } from 'express';
import {UserModel, RestaurantOwnerModel, DeliveryDriverModel, IAccount } from '../models/account';

// Créer un compte
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {} = req.body;
        const newAccount: IAccount = new UserModel({});
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du compte', error });
    }
};

export const createRestaurantOwner = async (req: Request, res: Response): Promise<void> => {
    try {
        const {} = req.body;
        const newAccount: IAccount = new RestaurantOwnerModel({});
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du compte', error });
    }
};

export const createDeliveryDriver = async (req: Request, res: Response): Promise<void> => {
    try {
        const {} = req.body;
        const newAccount: IAccount = new DeliveryDriverModel({});
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du compte', error });
    }
};

// Obtenir tous les comptes
export const getAllAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const [users, restaurantOwners, deliveryDrivers] = await Promise.all([
            UserModel.find(),
            RestaurantOwnerModel.find(),
            DeliveryDriverModel.find()
        ]);
        const accounts: IAccount[] = [...users, ...restaurantOwners, ...deliveryDrivers];

        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des comptes', error });
    }
};

// Supprimer un compte par ID
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        const deletedOwner = await RestaurantOwnerModel.findByIdAndDelete(req.params.id);
        const deletedDriver = await DeliveryDriverModel.findByIdAndDelete(req.params.id);

        if (!deletedUser && !deletedOwner && !deletedDriver) {
            res.status(404).json({ message: 'Compte non trouvé' });
            return;
        }

        res.status(200).json({ message: 'Compte supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du compte', error });
    }
};

