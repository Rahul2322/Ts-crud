import { NextFunction, Request, Response } from "express";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import {  omit } from "lodash";


export const createUserHandler = async (req:Request<{},{},CreateUserInput['body']>,res:Response,next:NextFunction)=>{

    try {
        const addUser = await createUser(req.body);
        return res.status(200).json(omit(addUser.toJSON(),'password'));
    } catch (error:any) {
        next(error);
    }

}