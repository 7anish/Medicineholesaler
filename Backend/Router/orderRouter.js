const express = require('express')
const route = express.Router()
const {handleCreateOrder ,  handleUpdateOrder , handleGetOrderList , handleGetSpecficProduct} = require('../Controller/OrderController')


route.get('/getorder' , handleGetOrderList);
route.get('/getorder/:id' , handleGetSpecficProduct);
route.post("/createorder" , handleCreateOrder)
route.patch("/upadateorder/:id" , handleUpdateOrder)

module.exports = route