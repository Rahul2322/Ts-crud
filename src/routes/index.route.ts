
import {Router} from 'express';
import user from './user.route';
import session from './session.route';
import product from './product.route';


export const router = Router();

router.use('/users',user);
router.use('/sessions',session);
router.use('/products',product);





