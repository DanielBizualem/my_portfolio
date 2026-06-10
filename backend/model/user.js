import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type:String,default:null,unique:true},
    phone:{type:String,default:null},
    project_scope:{type:String,default:null},
    message:{type:String,default:null},
});

export default mongoose.model('User', userSchema);