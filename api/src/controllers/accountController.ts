import { Request, Response } from "express";
import { Account } from "../models/account";
import { Op } from "sequelize";

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
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la création du compte",
      error: error.message,
    });
  }
};

// Obtenir tous les comptes
export const getAllAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accounts = await Account.findAll({
      where: { role: { [Op.not]: "Admin" } },
    });
    res.status(200).json(accounts);
    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération des comptes",
      error: error.message,
    });
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
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération des comptes",
      error: error.message,
    });
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
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération du compte",
      error: error.message,
    });
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
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression du compte",
        error: error.message,
      });
  }
};

export const updateAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { name, phone, email, password, image } = req.body;

    const account = await Account.findByPk(account_id);
    if (!account) {
      res.status(404).json({ message: "Compte non trouvé" });
      return;
    }

    const updatedFields: any = {};
    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;
    if (email) {
      const account_email = await Account.findOne({
        where: { account_id: { [Op.not]: account_id }, email: email },
      });
      if (account_email) {
        res.status(404).json({
          message: "Cette adresse mail est déjà utilisée par un autre compte",
        });
        return;
      }
      updatedFields.email = email;
    }
    if (password) updatedFields.password = password;
    if (image) updatedFields.image = image;

    await account.update(updatedFields);
    res.status(200).json(account);
    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du compte",
      error: error.message,
    });
  }
};

export const suspendAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { suspend_time } = req.body;

    const account = await Account.findByPk(account_id);
    if (!account) {
      res.status(404).json({ message: "Compte non trouvé" });
      return;
    }

    if (!Number.isInteger(suspend_time)) {
      res.status(500).json({
        message: "Le temps de suspension spécifié n'est pas un entier",
      });
      return;
    }

    const now = new Date();
    const suspend_date = new Date();
    suspend_date.setDate(now.getDate() + suspend_time);

    await account.update({ is_active: false, suspended_until: suspend_date });

    res.status(200).json(account);
    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la suspension du compte",
      error: error.message,
    });
  }
};
