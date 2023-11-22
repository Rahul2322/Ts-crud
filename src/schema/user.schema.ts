import {object,string,TypeOf} from 'zod';


export const createUserSchema = object({
  body:object({
    name:string({
        required_error:"Name is required"
    }),
    password:string({
        required_error:"Password is required"
    }).min(6,'Password too short should be minimum 6 char long'),
    confirmPassword:string({
        required_error:"Confirm password is required"
      }),
      email:string({
        required_error:"Email is required"
      }).email('Not a valid email')
  }).refine(val=>val.password === val.confirmPassword,{
    message:"Passwords do not match"
  })
 
})

export type CreateUserInput = TypeOf<typeof createUserSchema>