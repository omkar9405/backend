const db = require("../models");
const Tasker = db.taskers;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/emailTransporter");
var code;

//login
exports.login =async (req,res)=>{
    const {username,password}=req.body;
 
    try{
      let tasker=await Tasker.findOne({
        username
      });
      if(!tasker)
      {
        return res.status(400).json({
          message:"User not exists"
        });
      }
 
      const isMatch = await bcrypt.compare(password,tasker.password);
      if(!isMatch)
      {
        return res.status(400).json({
          message:"Incorrect Password"
        });
      }
 
      const payload={
        tasker:{
          id:tasker.id,
          username:tasker.username,
          email:tasker.email,
          mobile:tasker.mobile
          
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
 
 



// Create and Save a new Tasker
exports.create = async(req, res) => {
  const {
    firstname,
    lastname,
	   jobtype,
	    education,
	    address,
        mobile,
        completedTasks,
        skills,
        gender,
        imagePath,
        email,
        dob,
        username,
        password,
      active
    
}=req.body;



  try{
    let tasker= await Tasker.findOne({
      email
    });
    if (tasker){
      return res.status(400).json(
        {
          message:"Tasker already exists"
        }
      );
    }
   tasker = new Tasker({
    firstname,
    lastname,
	   jobtype,
	    education,
	    address,
        mobile,
        completedTasks,
        skills,
        gender,
        imagePath,
        email,
        dob,
        username,
        password,
      active
      
  });

  const salt =await bcrypt.genSalt(10);
  tasker.imagePath= 'https://justdialapi.herokuapp.com/images/'+ tasker.imagePath;
  tasker.password = await bcrypt.hash(password,salt);
  await tasker.save()
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

// Retrieve all Taskers from the database.
exports.findAll = (req, res) => {
    // const firstname = req.query.firstname;
    // var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};
  
    Tasker.find({})
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
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: err.message || "Error retrieving Tasker with id=" + id 
        });
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

  // Update a Tasker by the id in the request
exports.patch = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
 // var active = req.body.active;
  
  Tasker.findByIdAndUpdate(id,{$set:req.body} ,{ useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tasker with id=${id}. not active`
        });
      } else res.send({ message: "Tasker was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating status with id=" + id
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
      html: `your password reset code is ${code}`,
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
    Tasker.findOne({email})
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
    Tasker.updateOne({id},{$set:req.body})
      .then(data => {
        console.log(req.body);
       res.status(200).send({
          message: "Password was updated successfully." + id 
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Password status with id="+ id
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


