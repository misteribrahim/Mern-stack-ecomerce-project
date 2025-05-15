// import express from 'express';

// const router = express.Router();

// router.post("/", async(req, res)=>{
//     const product = req.body;

//     if(!product.name || !product.price || !product.image){
//        return res.status(400).json({success:false, message:"please provide all fields"});
//     }

//     const newProduct = new Product(product)
//     try{
//        await newProduct.save();
//        res.status(201).json({success: true, data: newProduct});
//     } catch (error){
//        console.error("error in creating  product:", error.message);
//        res.status(500).json({success : false, message: "server error"})
//     }
// });

// router.put("/:id", async (req, res) =>{
//    const {id} =req.params;

//    const product = req.body;

//    if(!mongoose.Types.ObjectId.isValid(id)){
//        return res.status(404).send({ success:false,  message: "No product found with that id"});
//    }

//    try{
//        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
//        res.status(200).json({success: true, data: updatedProduct });
//    } catch (error){
//        res.status(500).json({ success: false, message: "server error"});
//    }

// });
// router.get("/", async(req,res)=>{
//    try{
//        const products= await Product.find({});
//    res.status(200).json({success: true, data: products});
//    }catch(error){
//        console.log("error in fetching products:",error.message);
//        res.status(500).json({success: false, message: "server error"});
//    }
// });
// router.get("/", async(req,res)=>{
// const {id} = req.params;

// try{
//    const product = await Product.findById(id);
//    if(!product){
//        return res.status(404).json({success: false, message: "product not found"});
//    }
//    res.status(200).json({success:true, data: product});
// } catch (error){
//    console.error("error fecthing product",error.message);
//    res.status(500).json({success:false, message: "server error"});
// }
// });

// router.delete("/:id", async(req,res)=>{
//    const {id} = req.params;

//    try{
//         await Product.findByIdAndDelete(id);
//         res.status(200).json({success: true, message: "product deleted"});
//    } catch(error){
//        res.status(404).json({success: true, message: "product not found"});
//    }
// });


// export default router;

import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js'; // Update if needed

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ success: false, message: "No product found with that ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

export default router;
