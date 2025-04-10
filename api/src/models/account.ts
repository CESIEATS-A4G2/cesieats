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
  role: "User" | "DeliveryMan" | "Restaurateur" | "Admin";
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  suspended_until?: Date | null;
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
  public role!: "User" | "DeliveryMan" | "Restaurateur" | "Admin";
  public image?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public is_active?: boolean;
  public suspended_until?: Date | null;
}

Account.init(
  {
    account_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
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
      type: DataTypes.ENUM("User", "DeliveryMan", "Restaurateur", "Admin"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744120309/thumb_15951118880user_ffpe0r.png",
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
    suspended_until: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  { sequelize, modelName: "Account", timestamps: false }
);

const generateCustomAccountId = async (): Promise<string> => {
  const lastAccount = await Account.findOne({
    order: [["account_id", "DESC"]],
  });

  let nextIdNumber = 1;

  if (lastAccount && lastAccount.account_id) {
    const lastId = parseInt(lastAccount.account_id.slice(3), 10);
    nextIdNumber = lastId + 1;
  }

  const paddedNumber = String(nextIdNumber).padStart(6, "0");
  return `ACC${paddedNumber}`;
};

Account.beforeCreate(async (account) => {
  account.account_id = await generateCustomAccountId();
});

export { Account };
