import { Request, Response } from "express";
import { Order } from "../models/order";
import { Cart } from "../models/cart";
import { getFullCartByAccountId } from "../controllers/cartController";

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

    await Cart.destroy({ where: { cart_id: cart.cart_id } });

    res.status(201).json({ message: "Commande créée", order: newOrder });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la validation" });
  }
};
