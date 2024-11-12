const express = require('express')
const route = express.Router();
const { handleaddproduct, handledeleteproduct, handleupdateproduct , handlGetProductList ,  handleGetSpecficProduct , handlesearchlist  } = require('../Controller/ProductController');
const {checkisadmin} = require('../MiddleWare/auth')
const { upload } = require('../Storage/Storage')


route.get("/searchlist" , handlesearchlist)
route.get("/getproduct" , handlGetProductList )
route.get("/getproduct/:id" , handleGetSpecficProduct)
route.post('/addproduct', checkisadmin , upload.array("images" , 5) ,handleaddproduct);
route.patch('/updateproduct/:id', checkisadmin ,handleupdateproduct);
route.delete('/deleteproduct/:id' , checkisadmin,handledeleteproduct);


module.exports = route