import path from "path";
import dotenv from 'dotenv';


dotenv.config({path:path.resolve(__dirname,'../config/config.env')});

interface ENV{
    PORT : number | undefined;
    NODE_ENV: string | undefined;
    MONGO_URI:string | undefined;
    SALT:number | undefined;
}

interface Config{
    PORT:number;
    NODE_ENV:string;
    MONGO_URI:string;
    SALT:number;

}


// Loading process.env as ENV interface

const getConfig = ():ENV=>{
    return {
        PORT:process.env.PORT ? Number(process.env.PORT) : undefined,
        NODE_ENV:process.env.NODE_ENV,
        MONGO_URI:process.env.MONGO_URI,
        SALT:process.env.SALT ? Number(process.env.SALT) : undefined
    }
}

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitizedConfig = (config:ENV):Config=>{
    for(let [key,value] of Object.entries(config)){
        if(value === undefined){
            throw new Error(`Missing key ${key} in config.env`)
        }
    }
    return config as Config;
}

const config  = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
