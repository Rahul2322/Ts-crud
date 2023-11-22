import mongoose, { Schema,Document } from "mongoose";
import bcrypt from 'bcrypt';
import sanitizedConfig from "../config";

// interface UserDocument extends Document{
//     email:string;
//     name:string;
//     password:string;
//     createdAt:Date;
//     updatedAt:Date;
// }

  export interface UserInput {
    email: string;
    name: string;
    password: string;
  }
  
  export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword:string):Promise<Boolean>
  }
  

const UserSchema  = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        
    }

},{
    timestamps:true
}) 




UserSchema.pre("save",async function (next) {
    const user = this as UserDocument;
    if(!user.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(sanitizedConfig.SALT);
    const hash =  bcrypt.hashSync(user.password,salt);
    user.password = hash;
    next();
})

UserSchema.methods.comparePassword = async function(password:string):Promise<boolean>{
    const user = this as UserDocument;
    return bcrypt.compare(password,user.password)
}

const User = mongoose.model<UserDocument>('Users',UserSchema);
export default User;