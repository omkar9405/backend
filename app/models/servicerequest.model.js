module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
            taskId:{
              type:Number
            },
            c_id:{
                type:String,
                required:true
            },
            c_firstName:{
              type:String,
              required:true
            },
            c_lastName:{
              type:String,
              required:true
            },
            phone:{
              type:Number,
              required:true
            },
            email:{
              type:String,
              required:true
            },
            address:{
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
            },
            requestDate:{
                
            },
            taskOption:{
              type:String
            },
            description:{
              type:String
            },
            taskerId:{
              type:String
            },
            isAccepted:{
                type:Boolean
            },
            status:{
                type:String
            },
            comments:[
            { 
                name:{
                    type:String
                },
                comment:{
                    type:String
                },
                commentDate:{
                    type:Date
                },
                rating:{
                    type:Number
                }
            }
            ]
          
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const ServiceRequest = mongoose.model("servicerequest", schema);
    return ServiceRequest;
};