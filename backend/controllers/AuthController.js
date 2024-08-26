import User from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


// signup controller
const maxAge = 3 * 24 * 60 * 60 * 1000; // token will expire in 3 days

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
}

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    const user = await User.create({ email, password });

    res.cookie("jwt", createToken(user.email, user._id), {
      secure: true,
      sameSite: "None",
      maxAge,
    });

    return res.status(201).json({
      user: {
        email: user.email,
        _id: user._id,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}; 





// login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Invalid password");
     }
  
    res.cookie("jwt", createToken(user.email, user._id), {
      secure: true,
      sameSite: "None",
      maxAge,
    });
  
    return res.status(200).json({ user : { 
      email: user.email, 
      _id: user._id,
      profileSetup:user.profileSetup,
      displayName:user.displayName,
      profilePic:user.profilePic,
    }});
      
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}



// get user info controller

export const getUserInfo = async (req, res) => {
  try { 
    console.log(req.userId);
    const userData = await User.findById(req.userId);
    console.log(userData);
    if (!userData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({ 
      email: userData.email,
      _id: userData._id,
      profileSetup: userData.profileSetup,
      displayName: userData.displayName,
      profilePic: userData.profilePic,
    });
      
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}
