const Router = require('express').Router();
const UserController = require('../controllers/UserController');
const {
  getToken,
  createToken,
  verifyToken,
} = require('../middleware/JwtHandler');

Router.post('/register', UserController.Register);
Router.post('/login', UserController.Login, createToken);
Router.get('/:user_id', UserController.GetProfile);
Router.put('/:user_id', UserController.UpdateUser);
Router.get(
  '/refresh/session',
  getToken,
  verifyToken,
  UserController.RefreshSession
);

module.exports = Router;
