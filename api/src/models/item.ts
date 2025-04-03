import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';

// Interface de Item
interface ItemAttributes {
    item_id?: string;
    restaurant_id: string;
    name: string;
    description: string;
    price: number;
    image: Buffer;
}

// Modele Item
class Item extends Model<ItemAttributes, Optional<ItemAttributes, 'item_id'>> implements ItemAttributes {
    public item_id?: string;
    public restaurant_id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public image!: Buffer;
}

Item.init({
    item_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    restaurant_id: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    image: { type: DataTypes.BLOB('long') }
}, { sequelize, modelName: 'Item', timestamps: false});

export { Item };
