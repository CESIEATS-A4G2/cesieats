import { Request, Response } from 'express';
import { Order } from '../models/order';  // Assure-toi que `Order` est le modèle Sequelize

// Créer une commande
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerId, restaurantId, deliveryAddress, deliveryInstructions, status, items, totalAmount, deliveryFee, paymentMethod, createdAt, updatedAt, completed, rating, transactionId } = req.body;

        // Créer la commande avec Sequelize
        const newOrder = await Order.create({
            customerId,
            restaurantId,
            deliveryAddress,
            deliveryInstructions,
            status,
            totalAmount,
            deliveryFee,
            paymentMethod,
            completed,
            rating,
            transactionId
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
};

// Obtenir toutes les commandes
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtenir toutes les commandes avec Sequelize
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};

// Obtenir une commande par ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtenir une commande par ID avec Sequelize
        const order = await Order.findByPk(req.params.id);
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
        // Mettre à jour une commande avec Sequelize
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });

        if (!updated) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }

        // Récupérer la commande mise à jour
        const updatedOrder = await Order.findByPk(req.params.id);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
    }
};

// Supprimer une commande
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        // Supprimer une commande avec Sequelize
        const deleted = await Order.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }

        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};