const express = require('express')
const router = express.Router()
const championsController = require('./champions.controller');

// Retrieve all employees
router.get('/', championsController.findAll);
// Create a new employee
router.post('/', championsController.create);
// Retrieve a single employee with id
router.get('/:name', championsController.findByName);
// Update a employee with id
router.put('/:name', championsController.update);
// Delete a employee with id
router.delete('/:name', championsController.delete);

module.exports = router