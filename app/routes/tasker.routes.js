const auth = require("../middleware/auth.js");
module.exports = app => {
    const API = require("../controllers/taskers.controller.js");
  
    const { check } =require('express-validator');
    var router = require("express").Router();
    const storage = require('../middleware/storage');
  
    router.post("/login", API.login);

    // Create a new Tutorial
    router.post("/signup", API.create);
  
    // Retrieve all API
    router.get("/", API.findAll);
  
    // Retrieve all published API
    router.get("/active", API.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", API.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", auth,storage,API.update);

    //Patch the active status
    router.patch("/status/:id", auth,storage,API.patch);
  
    // Delete a Tutorial with id
    router.delete("/:id", auth,API.delete);
  
    // Create a new Tutorial
    router.delete("/", auth,API.deleteAll);
  
    app.use('/api/taskers', router);
  };
