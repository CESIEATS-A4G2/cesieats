import { Request, Response } from "express";
import axios from "axios";

const ACCOUNT_SERVICE_URL = "http://user-service:3000/api";

// Créer un compte utilisateur
export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    await axios.post(`${ACCOUNT_SERVICE_URL}/accounts`, {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      role: role,
    });

    res.status(201).json({ msg: "Nouveau compte créé !" });
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
    const response = await axios.get(`${ACCOUNT_SERVICE_URL}/accounts`);
    const accounts = response.data;
    res.status(200).json(accounts);
    return;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(500).json({
        message: error.response.data?.message || error.message,
        error: error.response.data?.error
      });
    } else {
      res.status(500).json({
        message:
          "Erreur inconnue lors de la communication avec le service account",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
};

export const getAllAccountsByRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.params;
    const response = await axios.get(`${ACCOUNT_SERVICE_URL}/accounts/roles/${role}`);
    const accounts = response.data;
    res.status(200).json(accounts);
    return;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(500).json({
        message: "Erreur lors de la récupération des comptes par rôle",
        error: error.response.data?.message || error.message,
      });
    } else {
      res.status(500).json({
        message:
          "Erreur inconnue lors de la communication avec le service account",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
};

export const getAccountById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const response = await axios.get(`${ACCOUNT_SERVICE_URL}/accounts/${account_id}`);
    const account = response.data;
    res.status(200).json(account);
    return;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      if (status === 404) {
        res.status(404).json({ message: "Compte non trouvé" });
      } else {
        res.status(500).json({
          message: "Erreur lors de la récupération du compte",
          error: error.response.data?.message || error.message,
        });
      }
    } else {
      res.status(500).json({
        message:
          "Erreur inconnue lors de la communication avec le service account",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
};

// Supprimer un compte par ID
export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    await axios.delete(`${ACCOUNT_SERVICE_URL}/accounts/${account_id}`);
    res.status(200).json({ message: "Compte supprimé avec succès" });
    return;
  } catch (error: any) {
    const status = error.response.status;
    if (axios.isAxiosError(error) && error.response) {
      if (status === 404) {
        res.status(404).json({ message: "Compte non trouvé" });
      } else {
        res.status(500).json({
          message: "Erreur lors de la suppression du compte",
          error: error.response.data?.message || error.message,
        });
      }
    } else {
      res.status(500).json({
        message:
          "Erreur inconnue lors de la communication avec le service account",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
};

export const updateAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { name, phone, email, password, image } = req.body;

    const account = await axios.put(`${ACCOUNT_SERVICE_URL}/accounts/${account_id}`, {
      name: name,
      phone: phone,
      email: email,
      password: password,
      image: image,
    });
    res.status(200).json(account);
    return;
  } catch (error: any) {
    const status = error.response.status;
    if (axios.isAxiosError(error) && error.response) {
      if (status === 404) {
        res.status(404).json({ message: error.response.data?.message });
      } else {
        res.status(409).json({
          message: error.response.data?.message,
        });
      }
    } else {
      res.status(500).json({
        message:
          "Erreur inconnue lors de la communication avec le service account",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
};

export const suspendAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { account_id } = req.params;
    const { suspend_time } = req.body;

    const account = await axios.put(
      `${ACCOUNT_SERVICE_URL}/accounts/${account_id}/actions/suspend`,
      { suspend_time: suspend_time }
    );
    res.status(200).json(account);
    return;
  } catch (error: any) {
    const status = error.response.status;
    if (axios.isAxiosError(error) && error.response) {
      if (status === 404) {
        res.status(404).json({ message: error.response.data?.message });
      } else {
        res.status(500).json({
          message: error.response.data?.message,
        });
      }
    } else {
      res.status(500).json({
        message:
          "Erreur inconnue lors de la communication avec le service account",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
};
