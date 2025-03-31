import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/sequelize';
import { User } from './account';
import { RestaurantOwner } from './account';

// Interface pour OrderItem (article d'une commande)
interface OrderItemAttributes {
    id?: number;
    orderId: number;
    productId: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
}

// Interface pour Order
interface OrderAttributes {
    id?: number;
    customerId: number;
    restaurantId: number;
    deliveryAddress: string;
    deliveryInstructions?: string;
    status: 'pending' | 'in_progress' | 'delivered' | 'cancelled';
    totalAmount: number;
    deliveryFee: number;
    paymentMethod: 'card' | 'cash';
    completed: boolean;
    rating?: number;
    transactionId?: string;
}

// Modèle OrderItem
class OrderItem extends Model<OrderItemAttributes, Optional<OrderItemAttributes, 'id'>> implements OrderItemAttributes {
    public id!: number;
    public orderId!: number;
    public productId!: string;
    public name!: string;
    public description!: string;
    public quantity!: number;
    public price!: number;
    public total!: number;
}

OrderItem.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false }
}, { sequelize, modelName: 'OrderItem' });

// Modèle Order
class Order extends Model<OrderAttributes, Optional<OrderAttributes, 'id'>> implements OrderAttributes {
    public id!: number;
    public customerId!: number;
    public restaurantId!: number;
    public deliveryAddress!: string;
    public deliveryInstructions?: string;
    public status!: 'pending' | 'in_progress' | 'delivered' | 'cancelled';
    public totalAmount!: number;
    public deliveryFee!: number;
    public paymentMethod!: 'card' | 'cash';
    public completed!: boolean;
    public rating?: number;
    public transactionId?: string;
}

Order.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    restaurantId: { type: DataTypes.INTEGER, allowNull: false },
    deliveryAddress: { type: DataTypes.STRING, allowNull: false },
    deliveryInstructions: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('pending', 'in_progress', 'delivered', 'cancelled'), allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    deliveryFee: { type: DataTypes.FLOAT, allowNull: false },
    paymentMethod: { type: DataTypes.ENUM('card', 'cash'), allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    rating: { type: DataTypes.FLOAT },
    transactionId: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Order', timestamps: true });

// Relations
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

User.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(User, { foreignKey: 'customerId' });

RestaurantOwner.hasMany(Order, { foreignKey: 'restaurantId' });
Order.belongsTo(RestaurantOwner, { foreignKey: 'restaurantId' });

export { Order, OrderItem };
