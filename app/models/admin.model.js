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
        },
        imagePath:{
            type:String
        }
        // ,
        // cart: [
        //   {
        //     taskId:{
        //       type:Number
        //     },
        //     taskerName:{
        //       type:String
        //     },
        //     taskerID:{
        //       type:String
        //     },
        //     isAvailable:{
        //       type:Boolean
        //     },
        //     requestDate:{
        //       type:Date
        //     },
        //     customerName:{
        //       type:String
        //     },
        //     customerMobile:{
        //       type:String
        //     },
        //     customerId:{
        //       type:String
        //     },
        //     status:{
        //       type:String
        //     }
        //   }
        // ]
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
