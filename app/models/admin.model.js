module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:{
            type:String,
            required:true
        },
        permissions: {
            type:String
        },
        username: {
            type:String,
            required:true
        },
        password: {
            type:String,
            required:true
        },
        mobile: {
            type:Number,
            required:true
        },
        email: {
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
  
    const Admin = mongoose.model("admin", schema);
    return Admin;
  };