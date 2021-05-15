const auth = require("../middleware/auth.js");
module.exports = app => {
    const request = require("../controllers/requests.controller.js");
    var router = require("express").Router();
    
   
   // Create a new Tutorial
    router.post("/",request.create);
  
    // Retrieve all admin
     router.get("/", auth,request.findAll);
     router.get("/customer/:c_id", auth,request.findAllCustomerRequest);
    router.get("/employee/:taskerId", auth,request.findAllEmployeeRequest);
  
    // // Retrieve all published admin
    // router.get("/isCompleted", auth, cart.findAllCompletedRequest);
  
    // // Retrieve a single Tutorial with id
    router.get("/:taskId", auth, request.findOneRequest);
    router.get("/completed/:status", auth, request.findAllCompleted);
  
    // // Update a Tutorial with id
    router.put("/:taskId", auth, request.updateRequest);

    // // Update a Tutorial with id
    router.patch("/addComment/:taskId",request.addComment);
    router.patch("/accepted/:taskId",request.isAccepted);
    router.patch("/status/:taskId",request.changeStatus);
  
    // // Delete a Tutorial with id
    router.delete("/:id", auth,request.deleteRequest);
  
    // // Create a new Tutorial
    // // router.delete("/", auth,cart.deleteAll);
  
    app.use('/api/request', router);
  };
