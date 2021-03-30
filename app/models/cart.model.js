module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
            taskId:{
              type:Number
            },
            taskerName:{
              type:String
            },
            taskerID:{
              type:String
            },
            isAvailable:{
              type:Boolean
            },
            requestDate:{
              type:Date
            },
            customerName:{
              type:String
            },
            customerMobile:{
              type:String
            },
            customerId:{
              type:String
            },
            status:{
              type:String
            },
            message:{
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
  
    const Cart = mongoose.model("cart", schema);
    return Cart;
};