import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';

// Interface de Item
interface ItemAttributes {
    item_id?: string;
    name: string;
    price: number;
    created_at?: Date;
    menu_id: string;
    restaurant_id: string;
}

// Modele Item
class Item extends Model<ItemAttributes, Optional<ItemAttributes, 'item_id'>> implements ItemAttributes {
    public item_id!: string;
    public name!: string;
    public price!: number;
    public created_at!: Date;
    public updated_at!: Date;
    public menu_id!: string;
    public restaurant_id!: string;
}

Item.init({
    item_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.NUMBER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    menu_id: { type: DataTypes.STRING, allowNull: false },
    restaurant_id: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'Item', timestamps: false});

export { Item };
