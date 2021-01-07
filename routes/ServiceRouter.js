const Router = require('express').Router();
const ServiceController = require('../controllers/ServiceController');

Router.get('/', ServiceController.GetServices);
Router.get('/:service_id', ServiceController.GetServiceById);
Router.post('/:user_id', ServiceController.CreateService);
Router.put('/:service_id', ServiceController.UpdateService);
Router.delete('/:service_id', ServiceController.DeleteService);

module.exports = Router;
