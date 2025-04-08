import { Request, Response } from "express";
import { Order } from "../models/order";
import {
  getFullCartByAccountId,
  deleteCartByAccountId,
  createCartForAccountId,
} from "../controllers/cartController";
import { Cart, CartWithAssociations } from "../models/cart";
import { Restaurant } from "../models/restaurant";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { account_id } = req.params;
  const { delivery_address } = req.body;

  try {
    const cart = await getFullCartByAccountId(account_id);
    if (!cart) {
      res.status(404).json({ error: "Panier non trouvé" });
      return;
    }

    const items = cart.Items.map((ci) => ({
      name: ci.name,
      quantity: Number(ci.Cart_Item.quantity),
      price: Number(ci.price),
    }));
    
    const menus = cart.Menus.map((cm) => ({
      name: cm.name,
      quantity: Number(cm.Cart_Menu.quantity),
      items: cm.Items.map((i) => ({
        name: i.name,
        price: Number(i.price),
      })),
    }));

    if(items.length === 0 && menus.length === 0){
      res.status(500).json({ error: "Le panier est vide" });
      return;
    }

    const totalItems : number = items.reduce((sum : number, i) => sum + i.price * i.quantity, 0);
    const totalMenus : number = menus.reduce(
      (sum, m) => sum + m.items.reduce((s, i) => s + i.price, 0),
      0
    );
    const totalPrice : number = totalItems + totalMenus;

    const restaurant_id = cart.restaurant_id;
    
    const restaurant = await Restaurant.findByPk(restaurant_id);
    const restaurant_address = restaurant?.address;

    const newOrder = new Order({
      account_id,
      restaurant_id,
      restaurant_address,
      delivery_address,
      items,
      menus,
      totalPrice,
    });

    await newOrder.save();

    deleteCartByAccountId(account_id);
    createCartForAccountId(account_id);

    res.status(201).json({ message: "Commande créée", order: newOrder });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la validation" });
  }
};


export const createOrdersTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const orders = [
      {
        "account_id": "ACC000001",
        "restaurant_id": "RES000001",
        "restaurant_address": "Allée du grand Ethan",
        "delivery_address": "Boulevard de CESI",
        "status": "DONE",
        "items": [
          { "name": "Burger", "quantity": 2, "price": 7.5 },
          { "name": "Fries", "quantity": 1, "price": 3.0 }
        ],
        "menus": [
          {
            "name": "Burger Combo",
            "quantity": 1,
            "items": [
              { "name": "Burger", "price": 7.5 },
              { "name": "Soda", "price": 2.0 }
            ]
          }
        ],
        "totalPrice": 27.5
      },
      {
        "account_id": "ACC000002",
        "restaurant_id": "RES000002",
        "restaurant_address": "Rue de Ange",
        "delivery_address": "Impasse du Saugrenu",
        "status": "DELIVERY_IN_PROGRESS",
        "items": [
          { "name": "Sushi Roll", "quantity": 3, "price": 5.5 }
        ],
        "menus": [
          {
            "name": "Sushi Menu",
            "quantity": 2,
            "items": [
              { "name": "Sushi Roll", "price": 5.5 },
              { "name": "Miso Soup", "price": 2.5 }
            ]
          }
        ],
        "totalPrice": 36.5
      },
      {
        "account_id": "ACC000001",
        "restaurant_id": "RES000002",
        "restaurant_address": "Montée de la montage",
        "delivery_address": "Rue de la choucroute",
        "status": "IN_PREPARATION",
        "items": [
          { "name": "Tacos", "quantity": 4, "price": 4.0 }
        ],
        "menus": [],
        "totalPrice": 16.0
      },
      {
        "account_id": "ACC000002",
        "restaurant_id": "RES000001",
        "status": "PENDING_CONFIRMATION",
        "items": [],
        "menus": [
          {
            "name": "Pasta Menu",
            "quantity": 2,
            "items": [
              { "name": "Spaghetti", "price": 6.5 },
              { "name": "Garlic Bread", "price": 2.0 }
            ]
          }
        ],
        "totalPrice": 17.0
      },
      {
        "account_id": "ACC000001",
        "restaurant_id": "RES000002",
        "restaurant_address": "Avenue du malvenu",
        "delivery_address": "chez moi svp",
        "status": "DELIVERY_IN_PROGRESS",
        "items": [
          { "name": "Chicken Wings", "quantity": 6, "price": 1.2 }
        ],
        "menus": [
          {
            "name": "Wing Combo",
            "quantity": 1,
            "items": [
              { "name": "Chicken Wings", "price": 7.0 },
              { "name": "Coleslaw", "price": 2.0 }
            ]
          }
        ],
        "totalPrice": 16.2
      },
      {
        "account_id": "ACC000002",
        "restaurant_id": "RES000001",
        "restaurant_address": "Rue des restos vegan",
        "delivery_address": "Rue du gars qui commande une salade et un smoothie",
        "status": "IN_PREPARATION",
        "items": [
          { "name": "Vegan Bowl", "quantity": 1, "price": 9.5 },
          { "name": "Smoothie", "quantity": 1, "price": 4.5 }
        ],
        "menus": [],
        "totalPrice": 14.0
      }
    ];

    Order.insertMany(orders);
    res.status(201).json({ message: "Commandes tests créées" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de commandes tests" });
  }
};

export const getOrdersByAccountId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { account_id } = req.params;

  try {
    const orders = await Order.find({ account_id });
    res.status(201).json(orders);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erreur lors de la récupération des commandes d'un compte",
    });
  }
};

export const getOrdersByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ status: status });
    res.status(201).json(orders);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        "Erreur lors de la récupération des commandes par état de commande",
    });
  }
};

export const getOrdersByAccountIdByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { account_id, status } = req.params;

  try {
    const orders = await Order.find({ account_id: account_id, status: status });
    res.status(201).json(orders);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        "Erreur lors de la récupération des commandes d'un compte par état de commande",
    });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { order_id, status } = req.params;

  try {
    await Order.findByIdAndUpdate(order_id, { status: status });
    res.status(201).json({ message: "Commande mise à jour" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        "Erreur lors de la mise à jour du statut de la commande d'un compte",
    });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { order_id } = req.params;

  try {
    const order = await Order.findById(order_id);
    res.status(201).json(order);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erreur lors de la récupération d'une commande d'un compte",
    });
  }
};
