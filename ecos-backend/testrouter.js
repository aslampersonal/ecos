const express = require("express")
const {AddProduct, getdata, finduser, deleteuser, updateuser} = require("./controller/productcontroller")

const router = express.Router()

router.route("/products-adding").post(AddProduct)
router.route("/products").get(getdata)
router.route("/finduser/:id").get(finduser)
router.route("/deleteuser/:id").delete(deleteuser)
router.route("/updateuser/:id").put(updateuser)

module.exports = router

