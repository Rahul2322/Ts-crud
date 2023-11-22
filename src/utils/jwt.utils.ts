import jwt from 'jsonwebtoken'

export const signJwt = (object:Object,options?:jwt.SignOptions | undefined)=>{
    return jwt.sign(object,'rahul1234',{
        ...(options && options),
        algorithm:'HS256'
    })
}


export const verifyJwt =  (token:string)=>{
  try {
    const decoded = jwt.verify(token,'rahul1234');
  
   return {
    valid:  true,
    expired:false,
    decoded 
   }
  } catch (error:any) {
    console.log('errorrroror',error)
    return {
        valid:false,
        expired:error.message === 'jwt expired',
        decoded:null
    }
  }

}