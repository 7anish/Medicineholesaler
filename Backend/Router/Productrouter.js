const express = require('express')
const route = express.Router();
const { handleaddproduct, handledeleteproduct, handleupdateproduct , handlGetProductList ,  handleGetSpecficProduct  } = require('../Controller/ProductController');
const {upload} = require('../Storage/Storage')

route.get("/getproduct" , handlGetProductList )
route.get("/getproduct/:id" , handleGetSpecficProduct)
route.post('/addproduct', upload.single('productimage') ,handleaddproduct);
route.patch('/updateproduct/:id',upload.single('productimage'), handleupdateproduct);
route.delete('/deleteproduct/:id' , handledeleteproduct);



module.exports = route