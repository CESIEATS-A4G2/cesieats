import cron from "node-cron";
import { Account } from "../models/account";
import { Op } from "sequelize";

// Planifie la tache toutes les 1 minutes
cron.schedule("*/1 * * * *", async () => {
  console.log("Vérification des comptes suspendus...");

  try {
    const now = new Date();

    const updated = await Account.update(
      {
        is_active: true,
        suspended_until: null,
      },
      {
        where: {
          is_active: false,
          suspended_until: {
            [Op.lte]: now,
          },
        },
      }
    );

    console.log(`Réactivations faites : ${updated[0]} compte(s)`);
  } catch (error) {
    console.error("Erreur dans le job de suspension :", error);
  }
});
