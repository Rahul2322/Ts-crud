import {Router} from 'express';
import { createUserHandler } from '../contoller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import validate from '../middleware/validateRequest';

const router = Router();

router.post('/',validate(createUserSchema),createUserHandler);


export default router;