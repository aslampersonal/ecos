const express = require("express")
const {addProduct, finduser, deleteuser, updateuser} = require("../controller/productcontroller")

const router = express.Router()

router.route("/add-product").post(addProduct)

router.route("/finduser/:id").get(finduser)
router.route("/deleteuser/:id").delete(deleteuser)
router.route("/updateuser/:id").put(updateuser)

module.exports = router

