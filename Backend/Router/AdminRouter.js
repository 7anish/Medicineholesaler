const express = require('express');
const route = express.Router();
const {handleCreateAdmin , handleLoginAsAdmin , handleaddtowishlist  , handlegetwishlist , handleremovefromwishlist}  = require('../Controller/AdminController')
const {checkisadmin} = require('../MiddleWare/auth')


route.post('/createaccount', handleCreateAdmin);
route.post('/logintoaccount' , handleLoginAsAdmin);
route.get('/getwishlist/:id' , handlegetwishlist)
route.patch('/addtowishlist/:id' , handleaddtowishlist)
route.patch('/removefromwishlist/:id' , handleremovefromwishlist)

module.exports = route