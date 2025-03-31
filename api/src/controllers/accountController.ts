import { Request, Response } from 'express';
import { User, RestaurantOwner, DeliveryDriver } from '../models/account';

// Créer un compte utilisateur
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName, phoneNumber, deliveryAddresses, paymentMethods, preferredRestaurant, rating } = req.body;

        // Créer un compte utilisateur avec Sequelize
        const newAccount = await User.create({
            email,
            password,
            fullName,
            phoneNumber,
            deliveryAddresses,
            paymentMethods,
            preferredRestaurant,
            rating
        });

        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du compte', error });
    }
};

// Créer un compte RestaurantOwner
export const createRestaurantOwner = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName, phoneNumber, restaurantName, restaurantAddress, workingHours } = req.body;

        // Créer un compte RestaurantOwner avec Sequelize
        const newAccount = await RestaurantOwner.create({
            email,
            password,
            fullName,
            phoneNumber,
            restaurantName,
            restaurantAddress,
            workingHours
        });

        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du compte', error });
    }
};

// Créer un compte DeliveryDriver
export const createDeliveryDriver = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName, phoneNumber, vehicleType, currentLat, currentLng, completedDeliveries, rating } = req.body;

        // Créer un compte DeliveryDriver avec Sequelize
        const newAccount = await DeliveryDriver.create({
            email,
            password,
            fullName,
            phoneNumber,
            vehicleType,
            currentLat,
            currentLng,
            completedDeliveries,
            rating
        });

        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du compte', error });
    }
};

// Obtenir tous les comptes
export const getAllAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const [users, restaurantOwners, deliveryDrivers] = await Promise.all([
            User.findAll(),
            RestaurantOwner.findAll(),
            DeliveryDriver.findAll()
        ]);
        
        const accounts = [...users, ...restaurantOwners, ...deliveryDrivers];
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des comptes', error });
    }
};

export const getAccountById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtenir une commande par ID avec Sequelize
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Compte non trouvé' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du compte', error });
    }
};

// Supprimer un compte par ID
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        // Supprimer le compte de chaque modèle
        const deletedUser = await User.destroy({
            where: { id: req.params.id }
        });
        const deletedOwner = await RestaurantOwner.destroy({
            where: { id: req.params.id }
        });
        const deletedDriver = await DeliveryDriver.destroy({
            where: { id: req.params.id }
        });

        // Vérifier si aucun compte n'a été trouvé
        if (!deletedUser && !deletedOwner && !deletedDriver) {
            res.status(404).json({ message: 'Compte non trouvé' });
            return;
        }

        res.status(200).json({ message: 'Compte supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du compte', error });
    }
};
