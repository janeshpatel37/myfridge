var mongoose = require('mongoose');
var modelFood = mongoose.model('Food');
  
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.food_get = function(req, res) {
    modelFood.find({}, function (err, food) {
        if (err) return sendJSONresponse(res, 400, err);;
        sendJSONresponse(res, 200, food);
      })
  };

module.exports.food_getByID = function(req, res) {
    if (req.params.id){
        modelFood.find({'_id': req.params.id}, function (err, food) {
            if (err) {
                return sendJSONresponse(res, 400, err);
            }
            return sendJSONresponse(res, 200, food);
          })
    }else{
        sendJSONresponse(res, 404, {"message": "Id Not Found."})
    }
    
  };
  
module.exports.food_post = function(req, res){
    if (req.body.name){
        if (req.body.date){
            if (req.body.quantity && req.body.quantity >= 1){
                modelFood.create(req.body ,function(err, obj) {
                    if (err) {
                      return sendJSONresponse(res, 400, err);
                    } else {
                      return sendJSONresponse(res, 201, obj);
                    }
                  });
            }else{
                sendJSONresponse(res, 404, {"message": "Quantity Invalid."});
            }    
        }else{
            sendJSONresponse(res, 404, {"message": "Date is required."});
        }    
    }else{
        sendJSONresponse(res, 404, {"message": "Name is required."});
    }
};

/* DELETE */
module.exports.food_delete = function(req, res) {
    if (req.params.id){
        modelFood
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    sendJSONresponse(res, 404, err);
                }else{
                    if (food){
                        if (food.quantity > 1){
                            food.quantity = food.quantity - 1;
                            food.save(function(err, food){
                                if (err){
                                    sendJSONresponse(res, 404, err);
                                }else{
                                    sendJSONresponse(res, 200, food);
                                }
                            });
                        }else{
                            food.remove({"_id": req.params.id}, function(err, result){
                                if(err){
                                    sendJSONresponse(res, 404, err);
                                    return;
                                }else{
                                    sendJSONresponse(res, 204, null);
                                    return;
                                }
                            });
                        }
                    }else{
                        sendJSONresponse(res, 404, {"message": "Food Item Not Found"});
                        return;
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "No Id Found"});
        return;
    }
  };


module.exports.food_put = function(req, res) {
    if (req.params.id){
        modelFood
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    sendJSONresponse(res, 404, err);
                    return;
                }else{
                    if (food){
                        food.name = req.body.name;
                        food.date = req.body.date;
                        food.expiry = req.body.expiry;
                        food.left_overs = req.body.left_overs;
                        food.quantity = req.body.quantity;
                        food.save(function(err, food){
                            if (err){
                                return sendJSONresponse(res, 404, err);
                            }else{
                                return sendJSONresponse(res, 200, food);
                            }
                        });         
                    }else{
                        return sendJSONresponse(res, 404, {"message": "Failed to update the Item."});
                    }
                }
            });
    }
    else {
        return sendJSONresponse(res, 404, {"message": "Id Not Found"});
    }
  };