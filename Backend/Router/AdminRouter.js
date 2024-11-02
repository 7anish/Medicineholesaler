const express = require('express');
const route = express.Router();
const {handleCreateAdmin , handleLoginAsAdmin , handleaddtowishlist  , handlegetwishlist} = require('../Controller/AdminController')
const {checkisadmin} = require('../MiddleWare/auth')


route.post('/createaccount', handleCreateAdmin);
route.post('/logintoaccount' , handleLoginAsAdmin);
route.get('/getwishlist' , handlegetwishlist)
route.patch('/addtowishlist' , handleaddtowishlist)

module.exports = route