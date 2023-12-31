import { NextFunction, Request, Response } from 'express'
import {AnyZodObject} from 'zod'


const validateRequest = (schema:AnyZodObject)=>
(req:Request,res:Response,next:NextFunction)=>{
    try {
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query
        })
        next();
    } catch (error:any) {           
        return res.status(404).json({
            message:error.errors
        })
      
    }

}

export default validateRequest;

