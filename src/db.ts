import mongoose from "mongoose";
import sanitizedConfig from "./config";

const db = ()=>{
    console.log(sanitizedConfig.MONGO_URI)
   mongoose.connect(sanitizedConfig.MONGO_URI);
   const connection = mongoose.connection;
   connection.once('open',()=>{
    console.log('Connections are Successfull')
   });

   connection.on('error',()=>{
    console.log('Something Went Wrong')
   })
   
}

export default db;
