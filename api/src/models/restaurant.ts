import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Item } from "../models/item";
import { Account } from "../models/account";

// Interface de Restaurant
interface RestaurantAttributes {
  restaurant_id?: string;
  name: string;
  description: string;
  address: string;
  fees: number;
  prep_time: number;
  image: string;
  open_hour: string;
}

// Modele Restaurant
class Restaurant
  extends Model<
    RestaurantAttributes,
    Optional<RestaurantAttributes, "restaurant_id">
  >
  implements RestaurantAttributes
{
  public restaurant_id!: string;
  public name!: string;
  public description!: string;
  public address!: string;
  public fees!: number;
  public prep_time!: number;
  public image!: string;
  public open_hour!: string;
}

Restaurant.init(
  {
    restaurant_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING, allowNull: false },
    fees: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    prep_time: { type: DataTypes.DECIMAL(10), allowNull: false },
    image: { type: DataTypes.STRING },
    open_hour: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Restaurant", timestamps: false }
);

const generateCustomRestaurantId = async (): Promise<string> => {
  const lastRestaurant = await Restaurant.findOne({
    order: [["restaurant_id", "DESC"]],
  });

  let nextIdNumber = 1;

  if (lastRestaurant && lastRestaurant.restaurant_id) {
    const lastId = parseInt(lastRestaurant.restaurant_id.slice(3), 10);
    nextIdNumber = lastId + 1;
  }

  const paddedNumber = String(nextIdNumber).padStart(6, "0");
  return `RES${paddedNumber}`;
};

Restaurant.beforeCreate(async (restaurant) => {
  restaurant.restaurant_id = await generateCustomRestaurantId();
});

interface Account_RestaurantAttributes {
  account_id: string;
  restaurant_id: string;
}

class Account_Restaurant
  extends Model<
    Account_RestaurantAttributes,
    Optional<Account_RestaurantAttributes, "account_id" | "restaurant_id">
  >
  implements Account_RestaurantAttributes
{
  public account_id!: string;
  public restaurant_id!: string;
}

Account_Restaurant.init(
  {
    account_id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    restaurant_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Account_Restaurant",
    timestamps: false,
    tableName: "Account_Restaurant",
  }
);

// Relations
Restaurant.belongsToMany(Account, {
  through: Account_Restaurant,
  foreignKey: "restaurant_id",
});
Account.belongsToMany(Restaurant, {
  through: Account_Restaurant,
  foreignKey: "account_id",
});

Restaurant.hasMany(Item, { foreignKey: "restaurant_id", as: "items" });
Item.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });

export { Restaurant, Account_Restaurant };
