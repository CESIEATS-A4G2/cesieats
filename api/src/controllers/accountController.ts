import { Request, Response } from "express";
import { Account } from "../models/account";

// Créer un compte utilisateur
export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Créer un compte utilisateur avec Sequelize
    const newAccount = await Account.create({
      name,
      email,
      password,
      phone,
      address,
      role,
    });

    res.status(201).json(newAccount);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du compte", error });
  }
};

// Obtenir tous les comptes
export const getAllAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des comptes", error });
  }
};

export const getAllAccountsByRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.params;
    const accounts = await Account.findAll({
      where: { role: role },
    });
    res.status(200).json(accounts);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des comptes", error });
  }
};

export const getAccountById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    // Obtenir une commande par ID avec Sequelize
    const user = await Account.findByPk(account_id);
    if (!user) {
      res.status(404).json({ message: "Compte non trouvé" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du compte", error });
  }
};

// Supprimer un compte par ID
export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const deletedAccount = await Account.destroy({
      where: { account_id: account_id },
    });
    if (!deletedAccount) {
      res.status(404).json({ message: "Compte non trouvé" });
      return;
    }

    res.status(200).json({ message: "Compte supprimé avec succès" });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du compte", error });
  }
};
