import { Request, Response } from "express";
import { Restaurant, Account_Restaurant } from "../models/restaurant";

// Creer un restaurant
export const createRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, address, open_hour } = req.body;
    // Créer un compte utilisateur avec Sequelize
    const newRestaurant = await Restaurant.create({
      name,
      description,
      address,
      open_hour,
    });
    res.status(201).json(newRestaurant);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du restaurant", error });
  }
};

// Obtenir tous les restaurants
export const getAllRestaurants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
    return;
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des restaurants",
        error,
      });
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtenir un restaurant par son ID avec Sequelize
    const restaurant = await Restaurant.findByPk(req.params.restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }
    res.status(200).json(restaurant);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du restaurant", error });
  }
};

export const addRestaurantToUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id } = req.params;
    const { account_id } = req.body;

    const restaurant = await Restaurant.findByPk(req.params.restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    if (!account_id) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const account_restaurant_link = await Account_Restaurant.findOne({
      where: { account_id: account_id, restaurant_id: restaurant_id },
    });
    if (account_restaurant_link) {
      res
        .status(404)
        .json({ message: "L'utilisateur est déjà lié à ce restaurant" });
      return;
    }

    const account_restaurant = await Account_Restaurant.create({
      restaurant_id: restaurant_id,
      account_id: account_id,
    });
    res.status(201).json(account_restaurant);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout d'un restaurant à un utilisateur", error });
  }
};

export const removeRestaurantFromUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id, account_id } = req.params;

    const restaurant = await Restaurant.findByPk(req.params.restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    if (!account_id) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const account_restaurant_link = await Account_Restaurant.findOne({
      where: { account_id: account_id, restaurant_id: restaurant_id },
    });
    if (!account_restaurant_link) {
      res
        .status(404)
        .json({ message: "L'utilisateur n'est pas lié à ce restaurant" });
      return;
    }

    const account_restaurant = await Account_Restaurant.destroy({where:{
      restaurant_id: restaurant_id,
      account_id: account_id,
    }});
    res.status(200).json({ message: "Le restaurant a bien été retiré de l'utilisateur" });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout d'un restaurant à un utilisateur", error });
  }
};

// Supprimer un restaurant par ID
export const deleteRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedRestaurant = await Restaurant.destroy({
      where: { restaurant_id: req.params.id },
    });
    if (!deletedRestaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }
    res.status(200).json({ message: "Restaurant supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du restaurant", error });
  }
};
