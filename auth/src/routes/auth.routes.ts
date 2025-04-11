import { Express } from 'express';
import * as authController from '../controllers/controller';


export default function (app: Express): void {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
  app.get('/authenticate', authController.authenticate);

  app.get('/authenticate/role/DeliveryMan', authController.authenticateDeliveryMan);
  app.get('/authenticate/role/Restaurateur', authController.authenticateRestaurateur);
  app.get('/authenticate/role/Admin', authController.authenticateAdmin);
  app.get('/authenticate/:id', authController.authenticateToID);

}
    