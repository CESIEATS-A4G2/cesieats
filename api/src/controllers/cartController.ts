/*
import { Request, Response } from "express";
import {
  Cart,
  Cart_Item,
  Cart_Menu,
  CartWithAssociations,
} from "../models/cart";
import { Item } from "../models/item";
import { Menu } from "../models/menu";

export const createCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;

    const cartInProgress = await Cart.findOne({
      where: { account_id: account_id },
    });
    if (cartInProgress) {
      res
        .status(404)
        .json({ message: "Un panier existe déjà pour cet utilisateur" });
      return;
    }

    const newCart = createCartForAccountId(account_id);

    res.status(201).json(newCart);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création d'un panier", error });
  }
};

export const createCartForAccountId = async (account_id: string) => {
  return await Cart.create({ account_id: account_id });
};

export const getFullCartByAccountId = async (account_id: string) => {
  const cart = (await Cart.findOne({
    where: { account_id: account_id },
    include: [
      {
        model: Item,
        as: "Items",
        through: {
          attributes: ["quantity"],
        },
      },
      {
        model: Menu,
        as: "Menus",
        through: {
          attributes: ["quantity"],
        },
        include: [Item],
      },
    ],
  })) as CartWithAssociations;

  return cart;
};

export const getAllCartContentAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;

    const cart = await getFullCartByAccountId(account_id);
    res.status(200).json(cart);
    return;
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des paniers de l'utilisateur",
      error,
    });
  }
};

export const deleteCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;

    const account = await Account.findByPk(account_id);
    if (!account) {
      res.status(404).json({ message: "Ce compte n'existe pas" });
      return;
    }
    const deletedAccount = deleteCartByAccountId(account_id);
    if (!deletedAccount) {
      res.status(404).json({ message: "Le compte n'a pas de panier" });
      return;
    }

    createCartForAccountId(account_id);
    res.status(200).json({ message: "Panier supprimé avec succès" });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du panier", error });
  }
};

export const deleteCartByAccountId = async (account_id: string) => {
  return await Cart.destroy({ where: { account_id: account_id } });
};

export const addItemToCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { item_id, quantity } = req.body;

    const cart = await Cart.findOne({
      where: { account_id: account_id },
    });
    if (!cart) {
      res.status(404).json({ message: "Le compte n'a pas de panier" });
      return;
    }

    const cart_item_link = await Cart_Item.findOne({
      where: { account_id: account_id, item_id: item_id },
    });
    if (cart_item_link) {
      res.status(404).json({ message: "L'item est déjà ajouté à ce panier" });
      return;
    }

    const cart_item = await Cart_Item.create({
      account_id,
      item_id,
      quantity,
    });

    if (!cart.restaurant_id) {
      const item = await Item.findByPk(item_id);
      await Cart.update(
        { restaurant_id: item?.restaurant_id },
        { where: { account_id: account_id } }
      );
    }

    res.status(201).json(cart_item);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout d'un item au panier", error });
  }
};

export const removeItemFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { item_id } = req.body;

    const cart = await Cart.findOne({
      where: { account_id: account_id },
    });
    if (!cart) {
      res.status(404).json({ message: "Le compte n'a pas de panier" });
      return;
    }
    const deletedCart_item = await Cart_Item.destroy({
      where: { account_id: account_id, item_id: item_id },
    });
    if (!deletedCart_item) {
      res.status(404).json({ message: "L'item n'est pas dans le panier" });
      return;
    }

    const cart_item = await Cart_Item.findAll({
      where: { account_id: account_id },
    });
    if (cart_item.length === 0) {
      deleteCartByAccountId(account_id);
      createCartForAccountId(account_id);
    }

    res.status(200).json({ message: "Item supprimé du panier avec succès" });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression d'un item du panier",
      error,
    });
  }
};

export const addMenuToCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { menu_id, quantity } = req.body;

    const cart = await Cart.findOne({
      where: { account_id: account_id },
    });
    if (!cart) {
      res.status(404).json({ message: "Le compte n'a pas de panier" });
      return;
    }

    const cart_menu_link = await Cart_Menu.findOne({
      where: { account_id: account_id, menu_id: menu_id },
    });
    if (cart_menu_link) {
      res.status(404).json({ message: "Ce menu est déjà ajouté à ce panier" });
      return;
    }

    const cart_menu = await Cart_Menu.create({
      account_id,
      menu_id,
      quantity,
    });

    if (!cart.restaurant_id) {
      const menu = await Menu.findByPk(menu_id);
      await Cart.update(
        { restaurant_id: menu?.restaurant_id },
        { where: { account_id: account_id } }
      );
    }

    res.status(201).json(cart_menu);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout d'un menu au panier", error });
  }
};

export const removeMenuFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { menu_id } = req.body;

    const cart = await Cart.findOne({
      where: { account_id: account_id },
    });
    if (!cart) {
      res.status(404).json({ message: "Le compte n'a pas de panier" });
      return;
    }

    const deletedCart_menu = await Cart_Menu.destroy({
      where: { account_id: account_id, menu_id: menu_id },
    });
    if (!deletedCart_menu) {
      res.status(404).json({ message: "Le menu n'est pas dans le panier" });
      return;
    }

    const cart_menu = await Cart_Menu.findAll({
      where: { account_id: account_id },
    });
    if (cart_menu.length === 0) {
      deleteCartByAccountId(account_id);
      createCartForAccountId(account_id);
    }

    res.status(200).json({ message: "Menu supprimé du panier avec succès" });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression d'un menu du panier",
      error,
    });
  }
};

export const updateQuantityItemFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id, item_id, quantity } = req.params;

    const cart_item = await Cart_Item.findOne({
      where: { account_id: account_id, item_id: item_id },
    });
    if (!cart_item) {
      res.status(404).json({ message: "Le produit n'est pas dans le panier" });
      return;
    }

    await Cart_Item.update(
      { quantity: parseInt(quantity) },
      {
        where: { account_id: account_id, item_id: item_id },
      }
    );
    res
      .status(200)
      .json({ message: "La quantité du produit a été mise à jour" });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la mise à jour de la quantité du produit du panier de l'utilisateur",
      error,
    });
  }
};

export const updateQuantityMenuFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id, menu_id, quantity } = req.params;

    const cart_menu = await Cart_Menu.findOne({
      where: { account_id: account_id, menu_id: menu_id },
    });
    if (!cart_menu) {
      res.status(404).json({ message: "Le menu n'est pas dans le panier" });
      return;
    }

    await Cart_Menu.update(
      { quantity: parseInt(quantity) },
      {
        where: { account_id: account_id, menu_id: menu_id },
      }
    );
    res.status(200).json({ message: "La quantité du menu a été mise à jour" });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la mise à jour de la quantité du menu du panier de l'utilisateur",
      error,
    });
  }
};
*/
