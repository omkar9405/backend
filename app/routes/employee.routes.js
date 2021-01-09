module.exports = app => {
    const API = require("../controllers/employees.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", API.create);
  
    // Retrieve all API
    router.get("/", API.findAll);
  
    // Retrieve all published API
    router.get("/active", API.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", API.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", API.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", API.delete);
  
    // Create a new Tutorial
    router.delete("/", API.deleteAll);
  
    app.use('/api/employees', router);
  };