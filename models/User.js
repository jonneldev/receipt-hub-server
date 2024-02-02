const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],       
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],       
    },
    email: {
        type: String,
        required: [true, "Email is required"],    
        unique: true,   
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile No is required"],       
    },
    password: {
        type: String,
        required: [true, "Password is required"],       
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
