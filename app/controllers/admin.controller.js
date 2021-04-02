const db = require("../models");
const Admin = db.admins;
const {  validationResult } =require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  


exports.login =async (req,res)=>{
  // Validate request
  const errors = validationResult(req);
  if(!errors.isEmpty())
    {
      return res.status(400).json({
        errors: errors.array()
      });
    }
 
    const {username,password}=req.body;
 
    try{
      let admin=await Admin.findOne({
        username
      });
      if(!admin)
      {
        return res.status(400).json({
          message:"User not exists"
        });
      }
 
      const isMatch = await bcrypt.compare(password,admin.password);
      if(!isMatch)
      {
        return res.status(400).json({
          message:"Incorrect Password"
        });
      }
 
      const payload={
        admin:{
          id:admin.id,
          name:admin.name,
          email:admin.email
        }
      };
 
      jwt.sign(
        payload,"randomString",
        {
          expiresIn:3600
        },
        (err,token)=>{
          if(err) throw err;
          res.status(200).json({
            token
          });
        }
      )
    }
    catch(err){
      console.error(err);
      res.status(500).json(
        {
          message:"Server error"
        }
      );
    }
 }
 

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
 
    const {
      name,
      permissions,
      username,
      password,
      mobile,
      email,
      cart
  }=req.body;

    try{
      let Username= await Admin.findOne({
        username
      });
      if (Username){
        return res.status(400).json(
          {
            message:"Username already exists"
          }
        );
      }
      let Email=  await Admin.findOne({
        email
      });
      if (Email){
        return res.status(400).json(
          {
            message:"Email already exists"
          }
        );
      }
     admin = new Admin({
      name,
      permissions,
      username,
      password,
      mobile,
      email,
      cart
    });

    const salt =await bcrypt.genSalt(10);
    //admin.imagePath= 'https://justdialapi.herokuapp.com/images/'+ req.file.filename;
    admin.password = await bcrypt.hash(password,salt);
    await admin.save()
                .then(data => {
                res.send(data);
                })

    }
    catch(err){
      console.log(err.message);
      res.status(500).json(
	{
		message:"Error in Saving"	
	});
  }    
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Admin.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Admin.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Admin.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Admin.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Admin.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Admin.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find All Tasks 
  // exports.findAllTasks = (req,res) => {
  
  //  Admin.findAll({cart})
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:err.message || "Some error occured."
  //     });
  //   });
  // };