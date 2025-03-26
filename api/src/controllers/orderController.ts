import { Request, Response } from 'express';
import Order, { IOrder } from '../models/order';

// Créer une commande
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerId, restaurantId, deliveryAddress, deliveryInstructions, status, items, totalAmount, deliveryFee, paymentMethod, createdAt, updatedAt, completed, rating, transactionId
        } = req.body;
        const newOrder: IOrder = new Order({ customerId, restaurantId, deliveryAddress, deliveryInstructions, status, items, totalAmount, deliveryFee, paymentMethod, createdAt, updatedAt, completed, rating, transactionId
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
};

// Obtenir toutes les commandes
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};

// Obtenir une commande par ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error });
    }
};

// Mettre à jour une commande
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
    }
};

// Supprimer une commande
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};
