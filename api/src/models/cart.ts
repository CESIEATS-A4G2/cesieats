/*
import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Account } from "../models/account";
import { Menu } from "../models/menu";
import { Item } from "../models/item";
import { Restaurant } from "./restaurant";

interface CartAttributes {
  account_id: string;
  restaurant_id?: string;
}

interface CartWithAssociations extends CartAttributes {
  Items: (Item & { Cart_Item: { quantity: number } })[];
  Menus: (Menu & { Cart_Menu: { quantity: number }; Items: Item[] })[];
}

// Modele Cart
class Cart extends Model<CartAttributes> implements CartAttributes {
  public account_id!: string;
  public restaurant_id?: string;

  public Items!: (Item & { Cart_Item: { quantity: number } })[];
  public Menus!: (Menu & { Cart_Menu: { quantity: number }; Items: Item[] })[];
}

Cart.init(
  {
    account_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
  },
  { sequelize, modelName: "Cart", timestamps: false }
);

interface Cart_MenuAttributes {
  account_id: string;
  menu_id: string;
  quantity: number;
}

class Cart_Menu
  extends Model<
    Cart_MenuAttributes,
    Optional<Cart_MenuAttributes, "account_id" | "menu_id">
  >
  implements Cart_MenuAttributes
{
  public account_id!: string;
  public menu_id!: string;
  public quantity!: number;
}

Cart_Menu.init(
  {
    account_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    menu_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Cart_Menu",
    timestamps: false,
    tableName: "Cart_Menu",
  }
);

interface Cart_ItemAttributes {
  account_id: string;
  item_id: string;
  quantity: number;
}

class Cart_Item
  extends Model<
    Cart_ItemAttributes,
    Optional<Cart_ItemAttributes, "account_id" | "item_id">
  >
  implements Cart_ItemAttributes
{
  public account_id!: string;
  public item_id!: string;
  public quantity!: number;
}

Cart_Item.init(
  {
    account_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    item_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Cart_Item",
    timestamps: false,
    tableName: "Cart_Item",
  }
);

// Relations
Cart.belongsToMany(Menu, {
  through: Cart_Menu,
  foreignKey: "account_id",
  as: "Menus",
});
Menu.belongsToMany(Cart, {
  through: Cart_Menu,
  foreignKey: "menu_id",
  as: "Carts",
});

Cart.belongsToMany(Item, {
  through: Cart_Item,
  foreignKey: "account_id",
  as: "Items",
});
Item.belongsToMany(Cart, {
  through: Cart_Item,
  foreignKey: "item_id",
  as: "Carts",
});

Account.hasMany(Cart, { foreignKey: "account_id", as: "carts" });
Cart.belongsTo(Account, { foreignKey: "account_id", as: "account" });

Restaurant.hasMany(Cart, { foreignKey: "restaurant_id", as: "carts" });
Cart.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });

export { Cart, Cart_Menu, Cart_Item, CartWithAssociations };
*/