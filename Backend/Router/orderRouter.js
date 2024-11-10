const express = require('express')
const route = express.Router()
const {handleCreateOrder ,  handleUpdateOrder , handleGetOrderList , handleGetSpecficorder , handlegetordehistory , handlegettodaysorder    } = require('../Controller/OrderController')
const {checkisadmin} = require('../MiddleWare/auth')


route.get('/getorderhistory' , handlegetordehistory)
route.get('/getorder' , checkisadmin, handleGetOrderList);
route.get('/getorder/:id' ,checkisadmin ,handleGetSpecficorder);
route.post("/createorder" , handleCreateOrder)
route.patch("/upadateorder/:id" , checkisadmin,handleUpdateOrder)
route.get('/todaysordrs' , checkisadmin,handlegettodaysorder)

module.exports = route