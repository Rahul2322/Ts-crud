import { Request, Response, NextFunction } from "express";
import { validatePassword } from "../service/user.service";
import { createsSession, findSessions ,deleteUserSession} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";


export const createSessionHandler = async (req: Request, res: Response) => {

    // validate the users password

    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).json({
            message: "Invalid Password or Email"
        })
    }

    //create a session

    const session = await createsSession(user._id, req.get("user-agent") || "");
    
    //create an access token 

    const accessToken = signJwt({
        ...user, session: session._id,
    },
        {
            expiresIn: '15m'
        })

    //create an refresh token


    const refreshToken = signJwt({
        ...user, session: session._id,
    },
        {
            expiresIn: '1y'
        })

    return res.status(200).json({
        accessToken,
        refreshToken
    })
}

export const getSessionHandler = async (req: Request, res: Response) => {
   try {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });
    console.log(sessions);

    return res.status(200).send(sessions); 
   } catch (error) {
    console.log(error)
   }
    
}

export const deleteSessionHandler = async (req: Request, res: Response) => {
     const sessionId  = res.locals.user.session;
     console.log(sessionId)
     await deleteUserSession({_id:sessionId},{valid:false});
      return res.status(200).json({
        accessToken:null,
        refreshToken:null,
      })

}