import { Request, Response } from "express";
import { Order } from "../models/order";
import {
  getFullCartByAccountId,
  deleteCartByAccountId,
  createCartForAccountId,
} from "../controllers/cartController";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { account_id } = req.params;

  try {
    const cart = await getFullCartByAccountId(account_id);
    if (!cart) {
      res.status(404).json({ error: "Panier non trouvé" });
      return;
    }

    const items = cart.Items.map((ci) => ({
      name: ci.name,
      quantity: ci.Cart_Item.quantity,
      price: ci.price,
    }));

    const menus = cart.Menus.map((cm) => ({
      name: cm.name,
      quantity: cm.Cart_Menu.quantity,
      items: cm.Items.map((i) => ({
        name: i.name,
        price: i.price,
      })),
    }));

    const totalItems = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalMenus = menus.reduce(
      (sum, m) => sum + m.items.reduce((s, i) => s + i.price, 0),
      0
    );
    const totalPrice = totalItems + totalMenus;

    const newOrder = new Order({
      account_id,
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
  const { status } = req.body;

  try {
    const orders = await Order.find({ status });
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
  const { account_id } = req.params;
  const { status } = req.body;

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
  const { order_id } = req.params;
  const { status } = req.body;

  try {
    await Order.findByIdAndUpdate({ order_id }, { status: status });
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
