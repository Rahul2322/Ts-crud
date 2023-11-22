import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Product, { ProductDocument, ProductInput } from "../models/product.model"


export const createProduct = async(input:ProductInput)=>{
   try {
    const product = await Product.create(input);
    return product;
   } catch (error:any) {
    throw new Error(error);
   }

}
export const findAndUpdateProduct = async(update:UpdateQuery<ProductDocument>,query:FilterQuery<ProductDocument>,options:QueryOptions)=>{
   try {
    const product = await Product.findOneAndUpdate(query,update,options);
    console.log('first',product)
    return product;
   } catch (error:any) {
    throw new Error(error)
   }

}
export const getProduct = async(query:FilterQuery<ProductDocument>)=>{
   try {
      console.log('getProduct',query)
    const product = await Product.findOne(query);
   
    return product;
   } catch (error:any) {
    throw new Error(error)
   }

}
export const deleteProduct = async(query: FilterQuery<ProductDocument>)=>{
   try {
    const product = await Product.deleteOne(query);
   } catch (error:any) {
    throw new Error(error)
   }

}

export const findProduct = async(query:FilterQuery<ProductDocument>)=>{
   console.log(query)
    const product = await Product.findOne(query);
    console.log(product,'findONe')
    return product;
}