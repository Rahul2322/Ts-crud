import { Request,Response } from "express";
import { CreateProductInput, DeleteProductInput, ReadProductInput, UpdateProductInput } from "../schema/product.schema";
import Product from "../models/product.model";
import { createProduct, deleteProduct, findAndUpdateProduct, getProduct,findProduct } from "../service/product.service";
import { mongo } from "mongoose";

export const createProductHandler = async(req:Request<{},{},CreateProductInput["body"]>,res:Response)=>{
   const userId = res.locals.user._id;
   const body = req.body;
   const product = await createProduct({...body,user:userId});
   return  res.status(201).send(product)


}

export const getProductHandler = async(req:Request<ReadProductInput["params"],{},{}>,res:Response)=>{
    const productId = req.params.productId;
    const product = await getProduct({_id:productId});
    return  res.status(200).json({
        message:product
       });

}
export const findAndUpdateProductHandler = async(req:Request<UpdateProductInput["params"],{},UpdateProductInput["body"]>,res:Response)=>{
    const productId = req.params.productId;
    const body = req.body;
    const userId = res.locals.user._id;
    
    const product = await findProduct({_id:productId});
    if(!product){
        return res.status(404).send("Not Found")
    }
    
    // console.log(product.user.equals(new mongo.ObjectId(userId)))
    if(!product.user.equals(new mongo.ObjectId(userId))){
       res.status(403)
    }
    const updatedProduct = await findAndUpdateProduct(body,{_id:productId},{
        new:true
    })

    return res.status(200).send(updatedProduct);
}
export const deleteProductHandler = async(req:Request<DeleteProductInput['params'],{},{}>,res:Response)=>{
     const userId = res.locals.user._id;
     const productId = req.params.productId;
     console.log(productId,'productId')
     const product = await findProduct({_id:productId});
      console.log(product,'product46')
    if(!product){
        return res.status(404).send("Not Found")
    }

    if(!product.user.equals(new mongo.ObjectId(userId))){
        res.status(403)
     }

    await deleteProduct({_id:productId});
    return res.status(200).json({
        message:"Deleted Successfully"
    });

}