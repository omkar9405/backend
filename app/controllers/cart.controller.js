// const { carts } = require("../models");
const db = require("../models");
const Cart = db.carts;

// Create and Save a new Tasker
exports.create = (req, res) => {
  
    // Create a Tasker
    const cart = new Cart({
        taskId: req.body.taskId,
	    taskerName:req.body.taskerName,
	    taskerID: req.body.taskerID,
	    isAvailable:req.body.isAvailable,
        requestDate:req.body.requestDate,
        customerName: req.body.customerName,
        customerMobile:req.body.customerMobile,
        customerId:req.body.customerId,
        status: req.body.status,
        message: req.body.message,
        comments:req.body.comments
    });
  
    // Save cart in the database
    cart
      .save(cart)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tasker."
        });
      });
  };

// Retrieve all Taskers from the database.
exports.findAll = (req, res) => {
    const name = req.query.taskId;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Cart.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Taskers."
        });
      });
  };

// Find a single Tasker with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Cart.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tasker with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tasker with id=" + id });
      });
  };

// Update a Tasker by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.taskId;
  
    Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Task with id=${id}. Maybe Task was not found!`
          });
        } else res.send({ message: "Task was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tasker with id=" + id
        });
      });
  };

// Delete a Tasker with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cart.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
          });
        } else {
          res.send({
            message: "Tasker was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tasker with id=" + id
        });
      });
  };

// Delete all Taskers from the database.
exports.deleteAll = (req, res) => {
    Cart.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tasks were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tasks."
        });
      });
  };

// Find all published Taskers
exports.findAllAvailable = (req, res) => {
    Cart.find({ isAvailable: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Taskers."
        });
      });
  };



  exports.addComment = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.taskId;
  
    Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Task with id=${id}. Maybe Task was not found!`
          });
        } else res.send({ message: "Task was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tasker with id=" + id
        });
      });
  };