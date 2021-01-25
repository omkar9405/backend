const auth = require("../middleware/auth.js");

module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    const { check, validationResult } =require('express-validator');
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");  
    var router = require("express").Router();
  

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
    ], customers.create);
  
    // Retrieve all customers
    router.get("/",auth, customers.findAll);
  
    // Retrieve all published customers
    router.get("/published", customers.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id",auth,customers.findOne);
  
    // Update a Tutorial with id
    router.put("/:id",auth, customers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id",auth, customers.delete);
  
    // Create a new Tutorial
    router.delete("/",auth, customers.deleteAll);
  
    app.use('/api/customers', router);
  };