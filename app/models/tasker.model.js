module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:{
            type:String,
            required:true
        },
        jobtype: {
            type:String,
            required:true
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