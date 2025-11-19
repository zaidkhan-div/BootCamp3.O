const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Company = require("../models/company");
const { uploadToCloudinary } = require("../config/cloudinary");


// Register Admin (Company)
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res.status(400).json({ message: "Company already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = await Company.create({
      name,
      email,
      password: hashedPassword,
      companyName,
    });

    res.status(201).json({
      message: "Company registered successfully",
      company: newCompany,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Register Staff (User)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, companyId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      companyId,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Unified Login for both Company & User
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let foundUser;
    if (role === "admin") {
      foundUser = await Company.findOne({ email });
    } else if (role === "staff") {
      foundUser = await User.findOne({ email }).populate({
        path: "companyId",
        select: "companyName",
      });
    } else {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    if (!foundUser)
      return res
        .status(404)
        .json({ message: `${role} not found with this email` });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      {
        name: foundUser.name,
        email: foundUser.email,
        profileImage: foundUser.profileImage,
        gender: foundUser.gender,
        companyName:
          role === "admin"
            ? foundUser.companyName
            : foundUser.companyId.companyName,
        role,
        companyId: role === "staff" ? null : foundUser._id,
        staffId: role === "admin" ? null : foundUser._id,
      },
      process.env.JWT_AUTH_SCRET || "mysecret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: `${role} logged in successfully`,
      token,
      user: foundUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// update profile (admin or staff)
exports.updateProfile = async (req, res) => {
  try {
    const { id, role } = req.body;

    if (!id || !role) {
      return res.status(400).json({ message: "id and role are required" });
    }

    let Model = role === "admin" ? Company : User;

    // Build update data dynamically
    let updatedData = {};

    // text fields
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.gender) updatedData.gender = req.body.gender;

    // If profile image is uploaded
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      updatedData.profileImage = cloudinaryResult.secure_url;
    }

    const updatedProfile = await Model.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
