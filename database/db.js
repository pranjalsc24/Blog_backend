const mongoose = require("mongoose")

exports.connectDb = async() => {
  try {
    await mongoose.connect(process.env.mongoUrl)
    console.log("database connected succesfully");
    
  }
  catch(e) {
    console.log(`Error while connecting database : ${e}`);
    
  }
}

