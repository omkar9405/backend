module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:{
            type:String,
            required:true
        },
        username:{
          type:String,
          required:true
        },
        password:{
          type:String,
          required:true
        },
        gender:{
          type:String,
          required:true
        },
        jobtype: {
            type:String,
            required:true
        },

        imagePath:{
          type:String
        },
        completedTasks:{
          type:Number
        },
        skills:[
          {
            skillname:{
            type:String
            },
            charges:{
            type:String
            }
          }
        ],
        education: {
            type:String,
        },
        address: {
            type:String,
        },
        pincode: {
            type:Number,
        },
        mobile: {
            type:Number,
            required:true
        },
        email:{
          type:String,
          required:true
        },
        dob:{
          type:String,
          pattern: "^[1-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$",
          format:Date,
          example:"1998-04-16",
          required:true
        },
        active: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tasker = mongoose.model("tasker", schema);
    return Tasker;
  };
