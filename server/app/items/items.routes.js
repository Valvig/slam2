const express = require('express')
const router = express.Router()
const itemsController = require('./items.controller');

// Retrieve all employees
router.get('/', itemsController.findAll);
// Create a new item
router.post('/', itemsController.create);
// Retrieve a single item with name
router.get('/:name', itemsController.findByName);
// Delete a item with name
router.delete('/:name', itemsController.delete);

module.exports = router