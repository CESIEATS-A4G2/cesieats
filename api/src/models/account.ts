import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/sequelize';
// import { Order } from './order';
//import Menu from './menu';

// Interface de base pour Account
interface AccountAttributes {
    id?: number;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}

// Interface spécifique à User
interface UserAttributes extends AccountAttributes {
    deliveryAddresses: string[];
    paymentMethods: string[];
    preferredRestaurant?: string;
    rating?: number;
}

// Interface spécifique à RestaurantOwner
interface RestaurantOwnerAttributes extends AccountAttributes {
    restaurantName: string;
    restaurantAddress: string;
    workingHours: { open: string; close: string };
}

// Interface spécifique à DeliveryDriver
interface DeliveryDriverAttributes extends AccountAttributes {
    vehicleType: string;
    currentLat: number;
    currentLng: number;
    completedDeliveries: number;
    rating: number;
}

// Modèle de base Account
class Account extends Model<AccountAttributes, Optional<AccountAttributes, 'id'>> implements AccountAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public fullName!: string;
    public phoneNumber!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public isActive!: boolean;
}

Account.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, modelName: 'Account', timestamps: true });

// Modèle User
class User extends Model<UserAttributes, Optional<UserAttributes, 'id'>> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public fullName!: string;
    public phoneNumber!: string;
    public isActive!: boolean;
    public deliveryAddresses!: string[];
    public paymentMethods!: string[];
    public preferredRestaurant?: string;
    public rating?: number;
}

User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    deliveryAddresses: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    paymentMethods: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    preferredRestaurant: { type: DataTypes.STRING },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 }
}, { sequelize, modelName: 'User', timestamps: true });

// Modèle RestaurantOwner
class RestaurantOwner extends Model<RestaurantOwnerAttributes, Optional<RestaurantOwnerAttributes, 'id'>> implements RestaurantOwnerAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public fullName!: string;
    public phoneNumber!: string;
    public isActive!: boolean;
    public restaurantName!: string;
    public restaurantAddress!: string;
    public workingHours!: { open: string; close: string };
}

RestaurantOwner.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    restaurantName: { type: DataTypes.STRING, allowNull: false },
    restaurantAddress: { type: DataTypes.STRING, allowNull: false },
    workingHours: { type: DataTypes.JSON, allowNull: false }
}, { sequelize, modelName: 'RestaurantOwner', timestamps: true });

// Modèle DeliveryDriver
class DeliveryDriver extends Model<DeliveryDriverAttributes, Optional<DeliveryDriverAttributes, 'id'>> implements DeliveryDriverAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public fullName!: string;
    public phoneNumber!: string;
    public isActive!: boolean;
    public vehicleType!: string;
    public currentLat!: number;
    public currentLng!: number;
    public completedDeliveries!: number;
    public rating!: number;
}

DeliveryDriver.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    vehicleType: { type: DataTypes.STRING, allowNull: false },
    currentLat: { type: DataTypes.FLOAT, allowNull: false },
    currentLng: { type: DataTypes.FLOAT, allowNull: false },
    completedDeliveries: { type: DataTypes.INTEGER, defaultValue: 0 },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 }
}, { sequelize, modelName: 'DeliveryDriver', timestamps: true });

// Relations
//User.hasMany(Order, { foreignKey: 'customerId' });
//Order.belongsTo(User, { foreignKey: 'customerId' });

//RestaurantOwner.hasMany(Menu, { foreignKey: 'restaurantId' });
//Menu.belongsTo(RestaurantOwner, { foreignKey: 'restaurantId' });

//RestaurantOwner.hasMany(Order, { foreignKey: 'restaurantId' });
//Order.belongsTo(RestaurantOwner, { foreignKey: 'restaurantId' });

//DeliveryDriver.hasMany(Order, { foreignKey: 'driverId' });
//Order.belongsTo(DeliveryDriver, { foreignKey: 'driverId' });

export { User, RestaurantOwner, DeliveryDriver };
