var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
}

function getFoodTotal(res) {
/*    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
         var totalPrice = 0.0 ;
         console.log(foods);
         for( item in foods){
          totalPrice += foods[item].price;
         }
          totalPrice += totalPrice*7.5/100;
          totalPriceObj = {};
          totalPriceObj["value"] = totalPrice;
        res.json(totalPriceObj); // return all todos in JSON format
    });
*/


var result = Food.aggregate([
        { $group: {
            _id: '*',
            totalPrice: { $sum: '$price'}  
        }}
    ], function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
            afterTax = results[0].totalPrice + (results[0].totalPrice*7.5/100);
            res.json(afterTax);
        }
    }
);

}
;



module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/food', function (req, res) {
        // use mongoose to get all todos in the database
        getFood(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/food', function (req, res) {
         console.log("food name :"+req.body.name);      
         console.log("food price : "+req.body.price);      

        // create a todo, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price: parseFloat(req.body.price),
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFood(res);
        });
    });

    // delete a todo
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFood(res);
        });
    });

    // food total
       // delete a todo
    app.get('/api/total', function (req, res) {
        getFoodTotal(res);
        //res.send("this is total");
        });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
