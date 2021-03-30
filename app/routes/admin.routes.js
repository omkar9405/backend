const auth = require("../middleware/auth.js");
module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    const { check } =require('express-validator');
    var router = require("express").Router();
    const storage = require('../middleware/storage');

   // Login
   router.post("/login",
   [
     check("username","Please enter valid username")
     .not()
     .isEmpty(),
     check("password","Please enter a valid password").isLength({min:6})
   ], admin.login);
    

   // Create a new Tutorial
    router.post("/", 
    [
      check("name","Please enter a valid Name")
      .not()
      .isEmpty(),
      check("email","Please enter valid email").isEmail(),
      check("password","Please enter a valid password").isLength({min:6})
    ],
    admin.create);
  
    // Retrieve all admin
    router.get("/", auth,admin.findAll);
  
    // Retrieve all published admin
    router.get("/published",auth, admin.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id",auth, admin.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", auth,admin.update);

    // Update a Tutorial with id
    // router.get("/cart",admin.findAllTasks);
  
    // Delete a Tutorial with id
    router.delete("/:id", auth,admin.delete);
  
    // Create a new Tutorial
    router.delete("/", auth,admin.deleteAll);
  
    app.use('/api/admin', router);
  };
