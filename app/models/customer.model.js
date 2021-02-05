module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        customername:{
            type:String,
            required:true
        },
        requesttype: {
            type:String
        },
        address: {
            type:String
        },
        pincode: {
            type:Number
        },
        mobile: {
            type:Number,
            required:true
        },
        email: {
          type:String,
          required:true
      },
      dob:{
        type:Date,
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
    signupcondition:{
    type:String,
    required:true},
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
