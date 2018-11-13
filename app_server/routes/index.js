var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.get('/', ctrlFood.myfridge);
router.get('/food/delete/:id', ctrlFood.food_delete);
router.get('/addInMyFridge', ctrlFood.food_create);
router.get('/addInMyFridge/:id', ctrlFood.loadData);

router.post('/addInMyFridge', ctrlFood.create_item);
router.post('/addInMyFridge/:id', ctrlFood.putItem);

module.exports = router;
