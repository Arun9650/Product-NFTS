import mongoose from 'mongoose'
import React from 'react'

const ProductSchema = new mongoose.Schema(

   {

    name: {type:String , require:true }, 
   
   
    image: {type:String, required:true },
    price: {type:Number, required:true},
    brand: {type:String, },
    rating:{type:Number, },
    numReviews:{type:Number, },
    countInStock: {type:Number, },
    description:{type:String, },
   },{

    timestamps:true
   }


)

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema) 


export default Product