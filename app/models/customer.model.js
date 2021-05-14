module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
          type:String,
          required:true
      },
        service: {
            type:String
        },
        imagePath:{
          type:String
        },
        address: [{
          street:{
            type:String
            },
            city:{
              type:String
            },
            state:{
              type:String
            },
            zipcode:{
              type:Number
            }
        }],
        mobile: {
            type:Number,
            required:true
        },
        email: {
          type:String,
          required:true
      },
      dob:{
        type:String,
	pattern: "^[1-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$",
	format:Date,
	example:"1998/04/16",
        required:true
      },
      gender:{
        type:String,
        required:true
      },
      password: {
        type:String,
        required:true
    },
    signupcondition: {
    type:String,
    required:true
    },
        feedback:{
            type:String
        }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Customer = mongoose.model("customer", schema);
    return Customer;
  };
