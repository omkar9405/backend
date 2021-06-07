const db = require("../models");
const Customer = db.customers;
const {  validationResult } =require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const { transporter } = require("../config/emailTransporter");

var newcode;


exports.login =async (req,res)=>{
 // Validate request
 const errors = validationResult(req);
 if(!errors.isEmpty())
   {
     return res.status(400).json({
       errors: errors.array()
     });
   }

   const {email,password}=req.body;

   try{
     let customer=await Customer.findOne({
       email
     });
     if(!customer)
     {
       return res.status(400).json({
         message:"User not exists"
       });
     }

     const isMatch = await bcrypt.compare(password,customer.password);
     if(!isMatch)
     {
       return res.status(400).json({
         message:"Incorrect Password"
       });
     }

     const payload={
       customer:{
         id:customer.id,
         name:customer.customername,
         email:customer.email
       }
     };

     jwt.sign(
       payload,"randomString",
       {
         expiresIn:"1d"
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
    // Create a customer
    const {
      firstName,
      lastName,
      service,
      address,
      imagePath,
      mobile,
      email,
      password,
      dob,
      gender,
      signupcondition,
      feedback,
      filename
      
  }=req.body;

 

    try{
      let customer= await Customer.findOne({
        email
      });
      if (customer){
        return res.status(400).json(
          {
            message:"Customer already exists"
          }
        );
      }
     customer = new Customer({
      firstName,
      lastName,
      service,
      address,
      imagePath,
      mobile,
      email,
      password,
      dob,
      gender,
      signupcondition,
      feedback,
      filename   
    });

    const salt =await bcrypt.genSalt(10);
    customer.imagePath= 'https://justdialapi.herokuapp.com/images/'+ customer.imagePath;
    customer.password = await bcrypt.hash(password,salt);
    await customer.save()
                .then(data => {
                res.send(data);
                })

    }
    catch(err){
      console.log(err.message);
      res.status(500).json(
	{
		message:"Error in Saving"	
	}	
	);
    }

  };

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const customername = req.query.customername;
    var condition = customername ? { customername: { $regex: new RegExp(customername), $options: "i" } } : {};
  
    Customer.find(condition)
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
exports.findOne = async (req, res) => {
    const id = req.params.id;
    Customer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500).send(
	{
		message: err.message|| "Error retrieving Tutorial with id=" + id 	
	});
         // .send({ });
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
 
    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  
    Customer.findByIdAndRemove(id)
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
  Customer.deleteMany({})
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
  Customer.find({ published: true })
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


  //sendOTP
exports.sendOTP =  (req,res)=>{
  if (!req.body) {
    return res.status(400).send({
      message: "Data can not be empty!"
    });
  }
  var email=req.body.email;
  code=Math.floor(Math.pow(10, 6-1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6-1) - 1));
  newcode = code;
try
    {
      transporter.sendMail({
      to: email,
      subject: "noreply@atyourservice - Password Reset mail",
      html: `
      your password reset code is ${code}
      `,
    }).then(data=>{
    res.status(200).send({
      message:"success" +code 
    });
  })
  }catch(error)
  {
    res.status(500).send({
      message:
        error.message
    });
  }
  
};

  //patch Password
  exports.patchPassword =async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    var email=req.body.email;
    var id; 
    Customer.findOne({email})
    .then(data=>{
      id=data.id;
      email=data.email
      console.log("got it"+id);
    })
    .catch(err=>{
      console.log("not get record" + id);
    })
    const salt =await bcrypt.genSalt(10);
    password = await bcrypt.hash(req.body.password,salt);
    req.body.password=password;
    req.body.email=email;
    console.log(req.body);
    if(req.params.code==newcode){
      console.log(req.body);
    Customer.update({id},{$set:req.body} ,{ useFindAndModify: false })
      .then(data => {
        console.log(req.body);
       res.status(200).send({
          message: "Password was updated successfully." + id + res.body
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Password status with id="+ id + res.body
        })
      })

    // res.status(200).send({
    //   message: "passowrd match" +req.body.code + newcode
    // });

    }
    else
    {
      res.status(500).send(
        {
         message:"wrong code entered" + req.params.code + newcode
        }
      )
    }
    
  };


