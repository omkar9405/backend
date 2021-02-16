const { taskers } = require("../models");
const db = require("../models");
const Tasker = db.taskers;

// Create and Save a new Tasker
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tasker
    const tasker = new Tasker({
        name: req.body.name,
	    jobtype:req.body.jobtype,
	    education: req.body.education,
	    address:req.body.address,
        pincode:req.body.pincode,
        mobile: req.body.mobile,
      active: req.body.active ? req.body.active : false
    });
  
    // Save Tasker in the database
    tasker
      .save(tasker)
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
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Tasker.find(condition)
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
  
    Tasker.findById(id)
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
  
    const id = req.params.id;
  
    Tasker.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tasker with id=${id}. Maybe Tasker was not found!`
          });
        } else res.send({ message: "Tasker was updated successfully." });
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
  
    Tasker.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tasker with id=${id}. Maybe Tasker was not found!`
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
    Tasker.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Taskers were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Taskers."
        });
      });
  };

// Find all published Taskers
exports.findAllActive = (req, res) => {
    Tasker.find({ published: true })
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