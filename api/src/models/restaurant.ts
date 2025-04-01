import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';

// Interface de Restaurant
interface RestaurantAttributes {
    restaurant_id?: number;
    name: string;
    created_at?: Date;
}

// Modele Restaurant
class Restaurant extends Model<RestaurantAttributes, Optional<RestaurantAttributes, 'restaurant_id'>> implements RestaurantAttributes {
    public restaurant_id!: number;
    public name!: string;
    public created_at!: Date; 
}

Restaurant.init({
    restaurant_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Restaurant', timestamps: false});

export { Restaurant };
