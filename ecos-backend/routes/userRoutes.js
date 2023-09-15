const express = require("express")
const {getdata} = require("../controller/productcontroller")

const router = express.Router()

router.route("/get-product").get(getdata)

module.exports = router

