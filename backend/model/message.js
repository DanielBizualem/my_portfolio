import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type:String,default:null,unique:true},
    message:{type:String,default:null},
});

export default mongoose.model('Message', userSchema);