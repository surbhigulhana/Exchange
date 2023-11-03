const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://surbhigulhana3:123@cluster0.ro46lnj.mongodb.net/?retryWrites=true&w=majority",
    
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successfull");
  });










