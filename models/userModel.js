const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
       name : {
        type : String,
        trim : true,
        // default : "xyz",
        // minlength:2,
        // maxlength:5,
        required : [true, "name is required field"]
       },
       email : {
        type : String,

        required : [true, "email is required field"]
       },
       age : {
        type : Number,
        required : [true, "age is required field"]
       },
       password : {
        type : String,
        required : [true, "password is required field"]
       },
       blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog"
       }],

    }, {timestamps : true}
)

module.exports = mongoose.model("User", userSchema)