import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  displayName: {
    type: String,
    required: false
  },
  profilePic: {
    type: String,
    required: false
  },
  profileSetup: {
    type: Boolean,
    default: false
  },
}, {timestamp: true});


userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model('user', userSchema);

export default User;
