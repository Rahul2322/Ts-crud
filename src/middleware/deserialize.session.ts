import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

export const deserializeSession = async(req:Request,res:Response,next:NextFunction)=>{
    const accessToken = req.headers.authorization?.replace(/^Bearer\s/,"");

    const refreshToken = Array.isArray(req.headers["x-refresh"]) ? req.headers["x-refresh"][0] : req.headers["x-refresh"];

    if(!accessToken){
       return next()
    }
   
   const {decoded,expired} = verifyJwt(accessToken) ;
   if(decoded && !expired){
    res.locals.user = decoded;
    return next();
   }

   if(expired && refreshToken){
      const newAccessToken = await reIssueAccessToken(refreshToken);
      console.log(newAccessToken,'newAccessToken')
      if (newAccessToken) {
         res.setHeader("x-access-token", newAccessToken);
         const result = verifyJwt(newAccessToken);
         res.locals.user = result.decoded;
         return next();
       }
   }
   return next();
}