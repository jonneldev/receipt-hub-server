const User = require("../models/User");

const registerUser = async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    try {
        //Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        //Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).josn({ message: "User registration success" });
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    registerUser,
}