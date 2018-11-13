var express = require('express');
var router = express.Router();
var controllerFood = require('../controllers/food');

router.get('/food', controllerFood.food_get);
router.get('/food/:id', controllerFood.food_getByID);
router.post('/food', controllerFood.food_post);
router.delete('/food/:id', controllerFood.food_delete);
router.put('/food/:id', controllerFood.food_put);

module.exports = router;