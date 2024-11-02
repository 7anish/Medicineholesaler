const express = require('express')
const route = express.Router();
const { handleaddproduct, handledeleteproduct, handleupdateproduct , handlGetProductList ,  handleGetSpecficProduct  } = require('../Controller/ProductController');
const {upload} = require('../Storage/Storage')
const {checkisadmin} = require('../MiddleWare/auth')

route.get("/getproduct" , handlGetProductList )
route.get("/getproduct/:id" , handleGetSpecficProduct)
route.post('/addproduct', checkisadmin ,handleaddproduct);
route.patch('/updateproduct/:id', checkisadmin ,handleupdateproduct);
route.delete('/deleteproduct/:id' , checkisadmin,handledeleteproduct);



module.exports = route