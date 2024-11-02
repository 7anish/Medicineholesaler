const express = require('express');
const route = express.Router();
const {handleCreateAdmin , handleLoginAsAdmin} = require('../Controller/AdminController')
const {checkisadmin} = require('../MiddleWare/auth')


route.post('/createaccount', checkisadmin, handleCreateAdmin);
route.post('/logintoaccount' , handleLoginAsAdmin);

module.exports = route