import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import {sequelize} from '../config/sequelize';
import { Item } from '../models/item';
import { Restaurant } from '../models/restaurant';

// Interface de Menu
interface MenuAttributes {
    menu_id?: string;
    restaurant_id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface MenuWithAssociation extends MenuAttributes {
  Items: Item[];
}
// Modele Menu
class Menu extends Model<MenuAttributes, Optional<MenuAttributes, 'menu_id'>> implements MenuAttributes {
    public menu_id!: string;
    public restaurant_id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public image!: string;

    public Items!: Item[];
}

Menu.init({
    menu_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: () => UUIDV4() },
    restaurant_id: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    image: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Menu', timestamps: false});

interface Menu_ItemAttributes {
    menu_id: string;
    item_id: string;
}

class Menu_Item extends Model<Menu_ItemAttributes, Optional<Menu_ItemAttributes, 'menu_id' | 'item_id'>> implements Menu_ItemAttributes {
    public menu_id!: string;
    public item_id!: string;
}

Menu_Item.init({
    menu_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    item_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false }
}, { sequelize, modelName: 'Menu_Item', timestamps: false, tableName: 'Menu_Item'});

// Relations
Menu.belongsToMany(Item, { through: Menu_Item, foreignKey: 'menu_id', as: "Items" });
Item.belongsToMany(Menu, { through: Menu_Item, foreignKey: 'item_id', as: "Menus" });

Menu.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });
Restaurant.hasMany(Menu, { foreignKey: "restaurant_id", as: "menus" });

export { Menu, Menu_Item, MenuWithAssociation };