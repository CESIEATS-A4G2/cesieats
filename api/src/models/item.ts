import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';

// Interface de Item
interface ItemAttributes {
    item_id?: string;
    restaurant_id: string;
    options_label: string;
    options: JSON;
    name: string;
    description: string;
    price: number;
    image: string;
}

// Modele Item
class Item extends Model<ItemAttributes, Optional<ItemAttributes, 'item_id'>> implements ItemAttributes {
    public item_id?: string;
    public restaurant_id!: string;
    public options_label!: string;
    public options!: JSON;
    public name!: string;
    public description!: string;
    public price!: number;
    public image!: string;
}

Item.init({
    item_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    restaurant_id: { type: DataTypes.STRING, allowNull: false },
    options_label: { type: DataTypes.STRING, allowNull: true },
    options: { type: DataTypes.JSON, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    image: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Item', timestamps: false});

export { Item };
