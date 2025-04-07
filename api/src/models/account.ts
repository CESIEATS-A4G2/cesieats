import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../config/sequelize";

// Interface pour Account
interface AccountAttributes {
  account_id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role: "User" | "Delivery Man" | "Restaurateur";
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
}

// Modele de base Account
class Account
  extends Model<AccountAttributes, Optional<AccountAttributes, "account_id">>
  implements AccountAttributes
{
  public account_id?: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public address?: string;
  public role!: "User" | "Delivery Man" | "Restaurateur";
  public created_at?: Date;
  public updated_at?: Date;
  public is_active?: boolean;
}

Account.init(
  {
    account_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => UUIDV4(),
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
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("User", "Delivery Man", "Restaurateur"),
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
  { sequelize, modelName: "Account", timestamps: false }
);

export { Account };
