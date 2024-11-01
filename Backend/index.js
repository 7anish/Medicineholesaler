const express = require('express')
const app = express();
const Adminrouter = require('./Router/AdminRouter') // admin router
const Producrouter = require('./Router/Productrouter') // Product router
const OrderRouter = require('./Router/orderRouter')
const CategoryRoute = require('./Router/CatRoute')
const connectDataBase =  require('./Config/Databaseconnection') // datebase connection
var cors = require('cors')
require('dotenv').config() //Env variable

app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    })
  );

const PORT = process.env.PORT || 8001;
const URL = process.env.DB_URL;

connectDataBase(URL);
app.use(express.json())
app.use(express.urlencoded({ extended: false}));


app.get('/testbackend' , (req,res)=>{
    res.status(200).json({Message : "Happy happy happy"})
})

app.use('/api/v1/admin' , Adminrouter)
app.use('/api/v1/med' , Producrouter)
app.use('/api/v1/med' , OrderRouter)
app.use('/api/v1/med' , CategoryRoute)


app.listen(PORT , ()=>{
    console.log(`Server Started At ${PORT}`)
})