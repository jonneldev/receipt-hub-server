const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

const sendErrorResponse = (res, statusCode, message) => {
    console.error("Error:", message);
    res.status(statusCode).json({ success: false, message });
};

const sendSuccessResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({ success: true, message, data });
};

// User Registration
const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            mobileNo,
            email,
            password,
            confirmPassword
        } = req.body;

        // Check if email exists
        if (await User.exists({ email })) {
            return sendErrorResponse(res, 400, 'Email already exists');
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return sendErrorResponse(res, 400, 'Password does not match');
        }

        // Bcrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            mobileNo,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        sendSuccessResponse(res, 201, 'User registration successful', user);

    } catch (error) {
        sendErrorResponse(res, 500, 'User registration failed');
    }
};

// User login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email is valid/exist
        const user = await User.findOne({ email });
        console.log(user); // Log the user object to check if it's found

        if (!user) {
            return sendErrorResponse(res, 401, 'Invalid email');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid); // Log the result of password comparison

        if (!isPasswordValid) {
            return sendErrorResponse(res, 401, 'Invalid password');
        }

        // Login successful
        const accessToken = auth.generateAuthToken(user._id);
        console.log(accessToken); // Log the generated access token
        sendSuccessResponse(res, 200, 'Login successful', {
            accessToken, userId: user._id, email: user.email
        });
    } catch (error) {
        console.error(error); // Log any error that occurred
        sendErrorResponse(res, 500, 'Login failed');
    }
};

module.exports = {
    registerUser,
    loginUser,
};
