import {Router} from 'express';
import validate from '../middleware/validateRequest';
import requireUser from '../middleware/requiredUser';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
import { createProductHandler, deleteProductHandler, findAndUpdateProductHandler, getProductHandler } from '../contoller/product.controller';



const router = Router();

router.post(
    '/',
    requireUser,
    validate(createProductSchema),
    createProductHandler
)

router.get(
    '/:productId',
    requireUser,
    validate(getProductSchema),
    getProductHandler
)

router.put(
    '/:productId',
    requireUser,
    validate(updateProductSchema),
    findAndUpdateProductHandler
)
router.delete(
    '/:productId',
    requireUser,
    deleteProductHandler
)






export default router;