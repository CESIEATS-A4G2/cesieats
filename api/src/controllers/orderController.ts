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
      price: Number(cm.price),
      items: cm.Items.map((i) => ({
        name: i.name,
      })),
    }));

    if(items.length === 0 && menus.length === 0){
      res.status(500).json({ error: "Le panier est vide" });
      return;
    }

    const totalItems : number = items.reduce((sum : number, i) => sum + i.price * i.quantity, 0);
    const totalMenus : number = menus.reduce((sum : number, m) => sum + m.price * m.quantity, 0);
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

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { order_id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(order_id);
    if (!deletedOrder) {
      res.status(404).json({ message: "Commande non trouvée" });
      return;
    }
    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la commande", error });
  }
};
