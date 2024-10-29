const mongoose = require('mongoose')


const rangeSchema = new mongoose.Schema({
    min :{
        type : Number,
        required : true
    },
    max :{
        type : Number,
        required : true
    },
    value : {
        type : Number,
        required : true
    }
})

const productScheam = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        enum : ["cosmetic" , "surgical" , "patent" , "medicine" , "generic" , "medicine" , "ayurvedic-medicine"],
        required : true
    },
    subcategory : {
        type : String,
        enum : ["hair-care", "oral-care", "sexual-wellness", "skin-care", "feminine-care", "baby-care", "elderly-care", "men-grooming", "bandage", "sugar-care", "bp-machine", "syringe", "injection", "other"],
        required : true   
    },
    discountprice : {
        type : Number,
        required : true
    },
    actualprice :{
        type : Number,
        required : true
    },
    itemtype : {
        type : String,
        enum :["medicine", "injection", "cream", "drop", "tablet", "capsule", "powder", "syrup", "lotion", "other", "surgical", "injection", "bandage", "syringe", "cannuala", "other", "cosmetic", "face-wash", "cream", "lotion", "shampoo", "serum", "hair-oil", "soap", "deodorant", "other", "ayurvedic", "bati", "asav", "powder", "churan", "syrup", "tablet", "capsule", "cream", "lotion"],
        required : true
    },
    productimage :{
        type : String,
        required : true
    },
    range : [rangeSchema]
})


const product = mongoose.model('product',productScheam )

module.exports  =  product
