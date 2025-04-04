import { Express } from 'express';
import * as authController from '../controllers/controller';


export default function (app: Express): void {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
  app.get('/authenticate', authController.authenticate);
}
    