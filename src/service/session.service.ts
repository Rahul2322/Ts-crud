import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model"
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";

export const createsSession = async (userId:string,userAgent:string)=>{
const session = await Session.create({
    user:userId,
    userAgent
});

return session.toJSON();
}

export const findSessions = async (query:FilterQuery<SessionDocument>)=>{
   const result =  await Session.find(query)
   return result;
}



export const deleteUserSession = async(query:FilterQuery<SessionDocument>,update:UpdateQuery<SessionDocument>)=>{
    const updateSession = await Session.updateOne(query,update);
    return updateSession;
}

export async function reIssueAccessToken(refreshToken:string) {
    const {decoded} =  verifyJwt(refreshToken);
    if(!decoded || !get(decoded,"session")) return false;

    const session = await Session.findById(get(decoded, "session"));

    if(!session || !session.valid) return false;

    const user = await findUser({_id:session.user});

    if(!user) return false;

    const accessToken  = signJwt({...user,session:session._id},{expiresIn:"15m"});

    return accessToken;



}

