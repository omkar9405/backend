// const { carts } = require("../models");
const db = require("../models");
const Request = db.requests;

// Create and Save a new Tasker
exports.create = (req, res) => {
  
    // Create a Tasker
    const request = new Request({
        taskId:req.body.taskId,
          c_id:req.body.c_id,
          c_firstName:req.body.c_firstName,
          c_lastName:req.body.c_lastName,
          phone:req.body.phone,
          email:req.body.email,
          address:req.body.address,
          requestDate:req.body.requestDate,
          taskOption:req.body.taskOption,
          description:req.body.description,
          taskerId:req.body.taskerId,
          isAccepted:req.body.isAccepted,
          status:req.body.status,
        comments:req.body.comments
    });
  
    // Save cart in the database
    request
      .save(request)
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
    const tid = req.query.taskId;
    // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Request.find({taskId:tid})
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

//findAllCustomerRequest
exports.findAllCustomerRequest = (req,res) =>{
    const customer_id = req.params.c_id;
 Request.find({c_id:customer_id})
 .then(data =>{
res.send(data);
 })
 .catch(err => {
     res.status(500).send({
         message:err.message || "Error in findAllCustomerRequest."
     });
 });
};

//findAllEmployeeRequest
exports.findAllEmployeeRequest = (req,res) =>{
  const tasker_id = req.params.taskerId;
Request.find({taskerId:tasker_id})
.then(data =>{
res.send(data);
})
.catch(err => {
   res.status(500).send({
       message:err.message || "Error in findAllCustomerRequest."
   });
});
};

// Find a single Tasker with an id
exports.findOneRequest = (req, res) => {
    const id = req.params.taskId;
  
    Request.findById(id)
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

// // Update a Tasker by the id in the request
exports.updateRequest = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.taskId;
  
    Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// // Delete a Tasker with the specified id in the request
exports.deleteRequest = (req, res) => {
    const id = req.params.id;
  
    Request.findByIdAndRemove(id)
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

// // Delete all Taskers from the database.
// exports.deleteAll = (req, res) => {
//     Cart.deleteMany({})
//       .then(data => {
//         res.send({
//           message: `${data.deletedCount} Tasks were deleted successfully!`
//         });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all Tasks."
//         });
//       });
//   };

// // Find all published Taskers
// exports.findAllAvailable = (req, res) => {
//     Request.find({ isAvailable: true })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving Taskers."
//         });
//       });
//   };

//findAllCompleted
exports.findAllCompleted = (req,res)=>{
  // const st="Pending";
  Request.findOne({ status: req.params.status })
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

//addcommets
  exports.addComment = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.taskId;
  
    Request.findByIdAndUpdate(id, {$set:req.body} , { useFindAndModify: false })
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

  exports.isAccepted = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.taskId;
  
    Request.findByIdAndUpdate(id, {$set:req.body} , { useFindAndModify: false })
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
