import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';
import { Item } from '../models/item';

// Interface de Restaurant
interface RestaurantAttributes {
    restaurant_id?: number;
    name: string;
    description: string;
    address: string;
    open_hour: string;
}

// Modele Restaurant
class Restaurant extends Model<RestaurantAttributes, Optional<RestaurantAttributes, 'restaurant_id'>> implements RestaurantAttributes {
    public restaurant_id!: number;
    public name!: string;
    public description!: string;
    public address!: string;
    public open_hour!: string;
}

Restaurant.init({
    restaurant_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING, allowNull: false },
    open_hour: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Restaurant', timestamps: false});

Restaurant.hasMany(Item, { foreignKey: "restaurant_id", as: "items" });
Item.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });

export { Restaurant };
