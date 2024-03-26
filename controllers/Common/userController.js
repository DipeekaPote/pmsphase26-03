const User = require("../../models/Common/userModel");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs")

const adminSignup = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);

  try {
    const user = await User.signup({ username, email, password, role });
    res.status(200).json({ username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminInfo = async (req, res) => {
  res.send("Hello World!");
};

//todo SOP api
//GET all Users

const getUsers = async (req, res) => {
  const user = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(user);
};

//GET a single User

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such User " });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "no such User " });
  }

  res.status(200).json(user);
};

//create new user

const createUser = async (req, res) => {
  const { username, email, password, cpassword, role, access, loginStatus, active } = req.body;
  console.log(req.body);

  try {
    const user = await User.create({ username, email, password, cpassword, role, access, loginStatus, active });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a User

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such User " });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "no such User " });
  }

  res.status(200).json(user);
};

//update a User

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such User " });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(404).json({ error: "no such User " });
  }

  res.status(200).json(user);
};



// UPDATE a password 
const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  const {id, token} = req.params;

  try {
      // Check if password and confirm password match
      // if (password !== cpassword) {
      //     return res.status(400).json({ error: "Passwords do not match" });
      // }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
    
      // Find the admin by email and update their password
      const updatedUser = await User.findOneAndUpdate(
          { id: id },
          { password: hashedPassword},
          { new: true } // This option ensures that the updated document is returned
      );

      if (!updatedUser) {
          return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json({ message: "User password updated successfully", user: updatedUser });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  try {
      // Find the User by email
      const user = await User.find({ email });

      if (!user) {
          return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// UPDATE a LoginStatus 
const updateLoginStatus = async (req, res) => {
  const { email, loginStatus } = req.body;

  try {

    // const user = await User.findOne(email);

    // if (!user) {
    //   return res.status(404).json({ error: "no such User " });
    // }
    
      // Find the admin by email and update their password
      const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { loginStatus : loginStatus},
          { new: true } // This option ensures that the updated document is returned

      );

      if (!updatedUser) {
          return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json({ message: "User Login Status updated successfully", user: updatedUser });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};




module.exports = { createUser, getUsers, getUser, deleteUser, updateUser, adminSignup, updateUserPassword, getUserByEmail, updateLoginStatus};
