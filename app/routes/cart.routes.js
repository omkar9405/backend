const auth = require("../middleware/auth.js");
module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    

   
   // Create a new Tutorial
    router.post("/",cart.create);
  
    // Retrieve all admin
    router.get("/", auth,cart.findAll);
  
    // Retrieve all published admin
    router.get("/isAvailable", auth, cart.findAllAvailable);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", auth, cart.findOne);
  
    // Update a Tutorial with id
    router.put("/:taskId", auth, cart.update);

    // Update a Tutorial with id
    router.put("/addComment/:taskId",cart.addComment);
  
    // Delete a Tutorial with id
    router.delete("/:id", auth,cart.delete);
  
    // Create a new Tutorial
    router.delete("/", auth,cart.deleteAll);
  
    app.use('/api/cart', router);
  };
