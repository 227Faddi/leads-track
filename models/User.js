import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
})

const User = mongoose.model('User', UserSchema);
export default User;
