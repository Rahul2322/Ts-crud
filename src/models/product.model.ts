import mongoose, {Schema,Document} from 'mongoose';
import { UserDocument } from './user.model';


export interface ProductInput{
    user:UserDocument["_id"];
    title:string;
    description:string;
    price:number;
    image:string;
}


export interface ProductDocument extends ProductInput, Document {
    createdAt: Date;
    updatedAt: Date;
  }
  
const productSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
},{
    timestamps:true
});

const Product = mongoose.model<ProductDocument>('Poduct',productSchema);

export default Product;