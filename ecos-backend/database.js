const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://ecos:NBnXAf3aCZzPaD2x@cluster0.7ctkgki.mongodb.net/ucos?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }            
        );
        console.log("Database connected");
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit();
    }
};

module.exports = connectDB;