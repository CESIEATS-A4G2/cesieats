import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle Order
export interface IOrder extends Document {
    customerId: string;                 // Identifiant du client
    restaurantId: string;               // Identifiant du restaurant
    deliveryAddress: string;            // Adresse de livraison
    deliveryInstructions?: string;
    status: 'pending' | 'in_progress' | 'delivered' | 'cancelled'; // Statut de la commande
    items: IOrderItem[];                // Articles dans la commande
    totalAmount: number;                // Montant total de la commande
    deliveryFee: number;                // Frais de livraison
    paymentMethod: 'card' | 'cash';  // Methode de paiement
    createdAt: Date;                    // Date et heure de la commande
    updatedAt: Date;                    // Dernière mise à jour de la commande
    completed: boolean;                 // Indique si la commande est terminee ou non
    rating?: number;                    // Note donnee par le client à la commande
    transactionId?: string;             // Identifiant de la transaction de paiement (si applicable)
}

export interface IOrderItem {
    productId: string;                  // Identifiant du produit
    name: string;                       // Nom du produit
    description: string;                // Description du produit
    quantity: number;                   // Quantite commandee
    price: number;                      // Prix unitaire du produit
    total: number;                      // Total pour ce produit (quantity * price)
}

// Schéma Mongoose pour une commande
const OrderItemSchema: Schema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
});

const OrderSchema: Schema = new Schema({
    customerId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryInstructions: { type: String },
    status: { type: String, enum: ['pending', 'in_progress', 'delivered', 'cancelled'], required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['card', 'paypal', 'cash'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    rating: { type: Number },
    transactionId: { type: String }
}, { timestamps: true });  // Utilisation de `timestamps` pour gérer `createdAt` et `updatedAt`

export default mongoose.model<IOrder>('Order', OrderSchema);
