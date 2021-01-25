module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();

  
    // Create a new Tutorial
    router.post("/register", admin.create);
  
    // Retrieve all admin
    router.get("/", admin.findAll);
  
    // Retrieve all published admin
    router.get("/published", admin.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", admin.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", admin.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", admin.delete);
  
    // Create a new Tutorial
    router.delete("/", admin.deleteAll);
  
    app.use('/api/admin', router);
  };