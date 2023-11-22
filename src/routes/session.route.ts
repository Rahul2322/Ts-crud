import {Router} from 'express';
import { createSessionHandler, getSessionHandler,deleteSessionHandler } from '../contoller/session.controller';
import validate from '../middleware/validateRequest';
import { createSessionSchema } from '../schema/session.schema';
import requireUser  from '../middleware/requiredUser';


const router = Router();

router.post('/',validate(createSessionSchema),createSessionHandler);
router.get('/',requireUser,getSessionHandler);
router.delete('/',requireUser,deleteSessionHandler);





export default router;