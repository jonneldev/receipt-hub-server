const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [false, "First name is required"],       
    },
    lastName: {
        type: String,
        required: [false, "Last name is required"],       
    },
    email: {
        type: String,
        required: [true, "First name is required"],    
        unique: true,   
    },
    mobileNo: {
        type: String,
        required: [false, "Mobile No is required"],       
    },
    password: {
        type: String,
        required: [true, "Password is required"],       
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User
