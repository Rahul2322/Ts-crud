import request from "supertest";
import app from '../app'
import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";


const userId = new mongoose.Types.ObjectId().toString();
const productPayload = {
user : userId,
title:'Camera',
description:'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
price:899.99,
image:" sdkasdsodj"
}

const user = {
    _id:userId,
    email:"rahulsingh@gmai.com",
    name:"rahul"
}


describe('product',()=>{

    beforeAll(async()=>{
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    })
    
    
    afterAll(async()=>{
         mongoose.disconnect;
        await mongoose.connection.close();
    })
    
    
    describe("get product route",()=>{
        describe("the given product doesn't exist",()=>{
            it("should return 404",async()=>{
                const productId = "1234";
                request(app)
                .get(`/api/products/${productId}`)
                .expect(404)  
            })
        });


        describe("given the product does exist",()=>{
            it("should return a 200 status and a product",async ()=>{
              const product = await createProduct(productPayload);
              console.log(product._id)
              request(app)
              .get(`/api/products/${product._id}`)
              .expect(200)
              .then(response=>{
                expect(response.body).toHaveProperty("title")
                expect(response.body._id).toBe(product._id)
              })
            })
        })
    });

    describe("create product route",()=>{
        describe("given the user is not logged in ",()=>{
          it("should return a 403",()=>{
            request(app)
            .post('/api/products')
            .expect(403)
          })
        });

        describe("given the user is  logged in ",()=>{
            it("should return a 403",()=>{
              const jwt = signJwt(user);
              request(app)
              .post('api/products')
              .send(productPayload)
              .set('Authorization',`Bearer ${jwt}`)
              .expect(200)
              .then(resp=>{
                expect(resp.body).toHaveProperty('title')
              })
            })
          })
    })
    
    
     
  
})