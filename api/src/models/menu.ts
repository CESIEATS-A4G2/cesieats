import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem {
    name: string;
    description?: string;
    price: number;
    category: string;
    imageUrl?: string;
    isAvailable: boolean;
}

export interface IMenu extends Document {
    restaurantId: string;
    items: IMenuItem[];
    createdAt: Date;
    updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true }
});

const MenuSchema: Schema = new Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantOwner', required: true },
    items: { type: [MenuItemSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMenu>('Menu', MenuSchema);
