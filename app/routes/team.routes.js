const auth = require("../middleware/auth.js");

module.exports = app => {
    const teams = require("../controllers/team.controller.js");
    const { check } =require('express-validator');
    var router = require("express").Router();
  

    // Create a new Tutorial
    router.post("/",
    [
      check("name","Please enter a valid Name")
      .not()
      .isEmpty(),
      check("email","Please enter valid email").isEmail()
    ], teams.create);
  
    // Retrieve all team
    router.get("/", teams.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id",auth,teams.findOne);
  
    // Update a Tutorial with id
    router.put("/:id",auth, teams.update);
  
    // Delete a Tutorial with id
    router.delete("/:id",auth, teams.delete);
  
    // Create a new Tutorial
    router.delete("/",auth, teams.deleteAll);
  
    app.use('/api/teams', router);
  };
