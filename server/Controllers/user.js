const User = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config();

const password = process.env.employeePassword;
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const signup = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const user = await User.signup(name, email, password)
    
    const token = createToken(user._id)
    
    res.status(200).json({name, email, token})
    
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}





const login = async (req,res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a toekn
    const token = createToken(user._id)
    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



module.exports = { signup, login };





