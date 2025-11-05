import jwt from "jsonwebtoken"
import User from "../models/User.js"
// generateToken

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validate email
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        // check if email already exist 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message: "Error registering user", error: error.message
        })
    }
}

// Login user 
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid Credential" })
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message: "Error login user", error: error.message
        })
    }
}

// getUserInfo
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
        }
        res.status(200).json(user); 

    } catch (error) {
        res.status(500).json({
            message: "Error getting user", error: error.message
        })

    }
}