const auth = require("../middleware/auth.js");

module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    const { check } =require('express-validator');
    var router = require("express").Router();
    const storage = require('../middleware/storage');

    // Login
    router.post("/login",
    [
      check("email","Please enter valid email").isEmail(),
      check("password","Please enter a valid password").isLength({min:6})
    ], customers.login);

    // Create a new Tutorial
    router.post("/signup",
    [
      check("customername","Please enter a valid Name")
      .not()
      .isEmpty(),
      check("email","Please enter valid email").isEmail(),
      check("password","Please enter a valid password").isLength({min:6})
    ],customers.create);
  
    // Retrieve all customers
    router.get("/",auth, customers.findAll);
  
    // Retrieve all published customers
    router.get("/published", customers.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id",auth,customers.findOne);
  
    // Update a Tutorial with id
    router.put("/:id",auth,storage, customers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id",auth, customers.delete);
  
    // Create a new Tutorial
    router.delete("/",auth, customers.deleteAll);

    //send otp
    router.post("/sendOTP",customers.sendOTP);

    //patch for password
    router.patch("/passwordreset/:code",customers.patchPassword);
  
    app.use('/api/customers', router);
  };