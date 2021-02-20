module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:{
            type:String,
            required:true
        },
        position: {
            type:String,
            required:true
        },
         imagePath:{
          type:String
        },
        email: {
            type:String,
            required:true
        },
        facebook: {
            type:String
        },
        tweeter: {
            type:String
        },
        instagram: {
          type:String
      },
      linkedin: {
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
  
    const Team = mongoose.model("team", schema);
    return Team;
  };
