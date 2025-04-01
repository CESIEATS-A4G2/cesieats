import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';
import { Item } from '../models/item';
import { Restaurant } from '../models/restaurant';

// Interface de Menu
interface MenuAttributes {
    menu_id?: number;
    name: string;
    restaurant_id: string;
    created_at?: Date;
}

// Modele Menu
class Menu extends Model<MenuAttributes, Optional<MenuAttributes, 'menu_id'>> implements MenuAttributes {
    public menu_id!: number;
    public name!: string;
    public restaurant_id!: string;
    public created_at!: Date;
}

Menu.init({
    menu_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    restaurant_id: {type: DataTypes.STRING, allowNull:false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Menu', timestamps: false});

// Relations
Menu.hasMany(Item, { foreignKey: "menu_id", as: "items" });
Item.belongsTo(Menu, { foreignKey: "menu_id", as: "menu" });
Menu.belongsTo(Restaurant, {foreignKey: "restaurant_id", as: "restaurant"});
Restaurant.hasMany(Menu, {foreignKey: "restaurant_id", as: "menus"});

export { Menu };
