import {object,string} from 'zod';


export const createSessionSchema = object({
    body:object({
        email:string({
            required_error:"Email is Required"
        }).email('Invalid Email'),
        password:string({
            required_error:"Password is required"
        })
    })
})