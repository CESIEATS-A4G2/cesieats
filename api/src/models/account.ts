import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";
// import { Order } from './order';
//import Menu from './menu';

// Interface pour Account
interface AccountAttributes {
  account_id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  adress?: string;
  role: "User" | "Livreur" | "Restaurateur";
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
}

// Modele de base Account
class Account extends Model<AccountAttributes> implements AccountAttributes {
  public account_id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public adress?: string;
  public role!: "User" | "Livreur" | "Restaurateur";
  public created_at?: Date;
  public updated_at?: Date;
  public is_active?: boolean;
}

Account.init(
  {
    account_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    adress: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("User", "Livreur", "Restaurateur"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "accounts",
    timestamps: true
  }
);

export { Account };
