module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        customername:{
            type:String,
            required:true
        },
        requesttype: {
            type:String,
            required:true
        },
        address: {
            type:String,
            required:true
        },
        pincode: {
            type:Number,
            required:true
        },
        mobile: {
            type:Number,
            required:true
        },
        email: {
          type:String,
          required:true
      },
      password: {
        type:String,
        required:true
    },
        feedback:{
            type:String,
            required:true
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