const multer  = require('multer')
// const upload = multer({ dest: 'uploads/products' })

const ProductSchema = require("../models/productModel")

//adding products
const addProduct = async(req,res) => {

    const {name, image, brand, price, category, countInStock, description} = req.body;

    const ProductAdding = await ProductSchema.create({
        name, 
        image, 
        brand, 
        price, 
        category, 
        countInStock, 
        description
    })

    return res.json({msg:"productdetails", ProductAdding})
}

//fetching all data
const getdata = async(req,res) => {
    const data = await ProductSchema.find()
    return res.json(data)
}

//display single data using id
const finduser = async(req,res) => {
    const _id = req.params.id
    const find = await ProductSchema.findById(_id)
    res.json({msg:"user found",find})
}

//delete single data using id
const deleteuser = async(req,res) => {
    const id = req.params.id
    const deluser = await ProductSchema.findByIdAndRemove(id)

    if(deluser) {
        res.json({msg:"user deleted",deluser})
    }

}

//update data usig id
const updateuser = async(req,res) => {
    const {Email,Password} = req.body
    const id = req.params.id
    const updateuser = await ProductSchema.findByIdAndUpdate(id,{Email,Password})
    res.json({msg:"user updated",updateuser})
}

module.exports = {addProduct, getdata, finduser, deleteuser, updateuser}

