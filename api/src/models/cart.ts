import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Account } from "../models/account";
import { Menu } from "../models/menu";
import { Item } from "../models/item";

interface CartAttributes {
  cart_id?: string;
  account_id: string;
  status?: "IN PROGRESS" | "DONE";
}

// Modele Cart
class Cart
  extends Model<CartAttributes, Optional<CartAttributes, "cart_id">>
  implements CartAttributes
{
  public cart_id?: string;
  public account_id!: string;
  public status?: "IN PROGRESS" | "DONE";
}

Cart.init(
  {
    cart_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => UUIDV4(),
    },
    account_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("IN PROGRESS", "DONE"),
      allowNull: false,
      defaultValue: "IN PROGRESS",
    },
  },
  { sequelize, modelName: "Cart", timestamps: false }
);

interface Cart_MenuAttributes {
  cart_id: string;
  menu_id: string;
  quantity: number;
}

class Cart_Menu
  extends Model<
    Cart_MenuAttributes,
    Optional<Cart_MenuAttributes, "cart_id" | "menu_id">
  >
  implements Cart_MenuAttributes
{
  public cart_id!: string;
  public menu_id!: string;
  public quantity!: number;
}

Cart_Menu.init(
  {
    cart_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
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
  cart_id: string;
  item_id: string;
  quantity: number;
}

class Cart_Item
  extends Model<
    Cart_ItemAttributes,
    Optional<Cart_ItemAttributes, "cart_id" | "item_id">
  >
  implements Cart_ItemAttributes
{
  public cart_id!: string;
  public item_id!: string;
  public quantity!: number;
}

Cart_Item.init(
  {
    cart_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
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
Cart.belongsToMany(Menu, { through: Cart_Menu, foreignKey: "cart_id" });
Menu.belongsToMany(Cart, { through: Cart_Menu, foreignKey: "menu_id" });

Cart.belongsToMany(Item, { through: Cart_Item, foreignKey: "cart_id" });
Item.belongsToMany(Cart, { through: Cart_Item, foreignKey: "item_id" });

Account.hasMany(Cart, { foreignKey: "account_id", as: "carts" });
Cart.belongsTo(Account, { foreignKey: "account_id", as: "account" });

export { Cart, Cart_Menu, Cart_Item };
