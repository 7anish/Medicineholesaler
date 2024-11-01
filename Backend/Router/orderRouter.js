const express = require('express')
const route = express.Router()
const {handleCreateOrder ,  handleUpdateOrder , handleGetOrderList , handleGetSpecficorder} = require('../Controller/OrderController')


route.get('/getorder' , handleGetOrderList);
route.get('/getorder/:id' , handleGetSpecficorder);
route.post("/createorder" , handleCreateOrder)
route.patch("/upadateorder/:id" , handleUpdateOrder)

module.exports = route