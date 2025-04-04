import { Request, Response } from "express";
import { Menu, Menu_Item } from "../models/menu";
import { Restaurant } from "../models/restaurant";
import { Item } from "../models/item";

// Creer un menu
export const createMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id } = req.params;
    const { name, description, price, image } = req.body;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const newMenu = await Menu.create({
      restaurant_id,
      name,
      description,
      price,
      image,
    });
    res.status(201).json(newMenu);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du menu", error });
  }
};

// Ajouter un item a un menu
export const addItemToMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id, menu_id } = req.params;
    const { item_id } = req.body;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      res.status(404).json({ message: "Menu non trouvé" });
      return;
    }

    const item = await Item.findByPk(item_id);
    if (!item) {
      res.status(404).json({ message: "Item non trouvé" });
      return;
    }

    const menu_item_link = await Menu_Item.findOne({
      where: { menu_id: menu_id, item_id: item_id },
    });
    if (!menu_item_link) {
      res.status(404).json({ message: "L'item est déjà ajouté à ce menu" });
      return;
    }

    const menu_item = await Menu_Item.create({ menu_id, item_id });
    res.status(201).json(menu_item);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout d'un item au menu", error });
  }
};

export const removeItemFromMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id, menu_id } = req.params;
    const { item_id } = req.body;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      res.status(404).json({ message: "Menu non trouvé" });
      return;
    }

    const item = await Item.findByPk(item_id);
    if (!item) {
      res.status(404).json({ message: "Item non trouvé" });
      return;
    }

    const menu_item_link = await Menu_Item.findOne({
      where: { menu_id: menu_id, item_id: item_id },
    });
    if (!menu_item_link) {
      res.status(404).json({ message: "L'item est déjà ajouté à ce menu" });
      return;
    }

    const menu_item = await Menu_Item.destroy({ where: { menu_id, item_id } });
    res.status(201).json(menu_item);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout d'un item au menu", error });
  }
};

// Obtenir tous les menu d'un restaurant
export const getAllMenusFromRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id } = req.params;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }
    const menus = await Menu.findAll({
      where: { restaurant_id: restaurant_id },
    });
    res.status(200).json(menus);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des menus", error });
  }
};

export const getMenuByIdByRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id, menu_id } = req.params;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      6;
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const menu = await Menu.findOne({
      where: { restaurant_id, menu_id }, // Vérifie que le menu appartient bien au restaurant
    });

    if (!menu) {
      res.status(404).json({ message: "Menu non trouvé pour ce restaurant" });
      return;
    }

    res.status(200).json(menu);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du menu", error });
  }
};

// Supprimer un menu par ID
export const deleteMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id, menu_id } = req.params;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const menu = await Menu.findOne({
      where: { restaurant_id, menu_id },
    });
    if (!menu) {
      res.status(404).json({ message: "Menu non trouvé pour ce restaurant" });
      return;
    }

    // Suppression du menu
    await menu.destroy();

    res.status(200).json({ message: "Menu supprimé avec succès" });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du menu", error });
  }
};
