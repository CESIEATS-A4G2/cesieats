import { Request, Response } from "express";
import { Restaurant, Account_Restaurant } from "../models/restaurant";
import { Account } from "../models/account";

// Creer un restaurant
export const createRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, address, fees, prep_time, image, open_hour } =
      req.body;
    const createdRestaurant = await Restaurant.create({
      name,
      description,
      address,
      fees,
      prep_time,
      image,
      open_hour,
    });
    const newRestaurant = await Restaurant.findOne({
      where: { name: createdRestaurant.name },
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
    res.status(500).json({
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
    const { restaurant_id } = req.params;
    const restaurant = await Restaurant.findByPk(restaurant_id);
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

export const getRestaurantsByAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;

    const account = await Account.findByPk(account_id, {
      include: {
        model: Restaurant,
        through: { attributes: [] }, // pour ne pas inclure les données de la table pivot
      },
    });

    if (!account) {
      res.status(404).json({ message: "Compte introuvable" });
      return;
    }

    res.status(200).json(account.get("Restaurants"));
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des restaurants",
        error,
      });
  }
};

export const addRestaurantToRestaurateur = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id } = req.params;
    const { account_id } = req.body;
    const role = "Restaurateur";

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const account = await Account.findOne({
      where: { account_id: account_id, role: role },
    });
    if (!account) {
      res
        .status(404)
        .json({ message: "Utilisateur non trouvé ou n'est pas restaurateur" });
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
    res.status(500).json({
      message: "Erreur lors de l'ajout d'un restaurant à un utilisateur",
      error,
    });
  }
};

export const removeRestaurantFromRestaurateur = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id, account_id } = req.params;
    const role = "Restaurateur";

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const account = await Account.findOne({
      where: { account_id: account_id, role: role },
    });
    if (!account) {
      res
        .status(404)
        .json({ message: "Utilisateur non trouvé ou n'est pas restaurateur" });
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

    const account_restaurant = await Account_Restaurant.destroy({
      where: {
        restaurant_id: restaurant_id,
        account_id: account_id,
      },
    });
    res
      .status(200)
      .json({ message: "Le restaurant a bien été retiré de l'utilisateur" });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du retirement d'un restaurant à un utilisateur",
      error,
    });
  }
};

// Supprimer un restaurant par ID
export const deleteRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id } = req.params;
    const deletedRestaurant = await Restaurant.destroy({
      where: { restaurant_id: restaurant_id },
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

export const updateRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurant_id } = req.params;
    const { name, description, address, fees, prep_time, image, open_hour } =
      req.body;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant non trouvé" });
      return;
    }

    const restaurant_name = await Restaurant.findOne({ where: { name: name } });
    if (restaurant_name) {
      res
        .status(404)
        .json({
          message:
            "Ce nom de restaurant est déjà utilisé par un autre restaurant",
        });
      return;
    }

    await restaurant.update({
      name,
      description,
      address,
      fees,
      prep_time,
      image,
      open_hour,
    });

    res.status(200).json(restaurant);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du compte", error });
  }
};
