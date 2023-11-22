import { omit } from "lodash";
import User, { UserDocument, UserInput } from "../models/user.model"
import { FilterQuery } from "mongoose";

export const createUser = async(input:UserInput)=>{
   try {
    const addUser = await User.create(input);
    return addUser;

   } catch (error:any) {
     throw new Error(error)
   }
}

export const validatePassword = async ({
    email,
    password
}:{
    email:string;
    password:string;
})=>{
    const user = await User.findOne({email});
    if(!user){
        return false;
    }
    
    const isValid = user.comparePassword(password);

    if(!isValid){
        return false;
    }

    return omit(user.toJSON(),'password');
}


export const findUser = async (query:FilterQuery<UserDocument>)=>{
    return User.findOne(query).lean();
}



