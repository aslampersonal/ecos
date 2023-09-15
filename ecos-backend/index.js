// const express = require('express')
// var cors = require('cors')
// const app = express() 
// const port = 3000

// app.use(cors())
// app.use(express.json())

// const Product = require('./models/productModel')
// const newStock = require('./models/inventoryModel')
// const Invoice = require('./models/invoiceModel')

// const mongoose = require('mongoose');

// main().then(()=>console.log("connected")).catch(err => console.log(err));

// async function main() {
//   // await mongoose.connect('mongodb+srv://ecos:NBnXAf3aCZzPaD2x@cluster0.7ctkgki.mongodb.net/?retryWrites=true&w=majority');
// }

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/products-adding', async (req, res) => {
//   const data = req.body
//   try{
//     const newProduct = new Product(data)
//     await newProduct.save()
//     res.json(newProduct)
//   }catch(err){
//     console.log(err);
//     res.status(400)
//   }
// })

// app.post('/inventory', async (req, res) => {
//   const data = req.body
//   try{
//     const stock = new newStock(data)
//     await stock.save()
//     res.json(stock)
//   }catch(err){
//     console.log(err);
//     res.status(400)
//   }

// })

// app.get('/products', async (req, res) => {
//   const data = await Product.find({})
//   res.json(data)
// })

// app.get('/invoice', async (req, res) => {
//   const data = await Invoice.find({})
//   res.json(data)
// })

// app.post('/invoice', async (req, res) => {
//   const data = req.body
//   try{
//     const invoice = new Invoice(data)
//     await invoice.save()
//     res.json(invoice)
//   }catch(err){
//     console.log(err);
//     res.status(400)
//   }

// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


