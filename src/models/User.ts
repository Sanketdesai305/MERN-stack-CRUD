import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:String,
        required:true
    },

},{timestamps:true});

export default mongoose.model("User",UserSchema);