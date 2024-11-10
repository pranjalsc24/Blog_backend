const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
    {
           title : {
            type : String,
            required : [true, "title is required field"]
           },
           content : {
            type : String,
            required : [true, "content is required field"]
           },
           author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : [true, "author is required field"]
           }, 
           
    },{ timestamps: true }
)

module.exports = mongoose.model("Blog", blogSchema)