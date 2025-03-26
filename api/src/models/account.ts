import mongoose, { Schema, Document } from 'mongoose';
import Order, { IOrder } from '../models/order';
import Menu, { IMenu } from '../models/menu';

// Interface pour le modèle Account
export interface IAccount extends Document {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface IUser extends IAccount {
    deliveryAddresses: string[]; // Adresses de livraison
    paymentMethods: string[];    // Methodes de paiement
    orderHistory: IOrder[];    // Commandes passées
    preferredRestaurant?: string;
    rating?: number;
}

export interface IRestaurantOwner extends IAccount {
    restaurantName: string;
    restaurantId: string;
    restaurantAddress: string;
    menu: IMenu[];           // Produits du menu
    orderHistory: IOrder[];   // Commandes reçues
    workingHours: { open: string; close: string };
}

export interface IDeliveryDriver extends IAccount {
    vehicleType: string;
    currentLocation: { lat: number; lng: number }; // Position GPS actuelle
    completedDeliveries: number;
    rating: number;
}

const UserSchema: Schema = new Schema({
    email: {type: String},
    password: {type: String},
    fullName: {type: String},
    phoneNumber: {type: String},
    createdAt: {type: Date},
    updatedAt: {type: Date},
    isActive: {type: Boolean},

    deliveryAddresses: {type: [String]}, // Adresses de livraison
    paymentMethods: {type: [String]},    // Methodes de paiement
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Commandes passees
    preferredRestaurant: {type: String},
    rating: {type: Number}
});

const RestaurantOwnerSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    restaurantName: { type: String, required: true },
    restaurantId: { type: String, required: true },
    restaurantAddress: { type: String, required: true },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    workingHours: {
        open: { type: String, required: true },
        close: { type: String, required: true }
    }
});

const DeliveryDriverSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    vehicleType: { type: String, required: true },
    currentLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    completedDeliveries: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
export const RestaurantOwnerModel = mongoose.model<IRestaurantOwner>('RestaurantOwner', RestaurantOwnerSchema);
export const DeliveryDriverModel = mongoose.model<IDeliveryDriver>('DeliveryDriver', DeliveryDriverSchema);