const { Router } = require('express');
const { generateDiagram } = require('../controllers/diagram.controller');
const digramRouter = Router();

digramRouter.post('/', generateDiagram);

module.exports = digramRouter;