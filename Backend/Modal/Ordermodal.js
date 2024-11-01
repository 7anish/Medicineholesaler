const mongooes = require('mongoose')

const productSchema = new mongooes.Schema({
    quantity: {
        type: Number,
        required: true
    },
    productId: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
})


const orderScheam = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    OrderStatus: {
        type: String,
        enum: ["Pending", "Delivered", "Cancled"],
        default: "Pending"
    },
    totalPrice: {
        type: String,
        required: true
    },
    orders: [productSchema]
}, { timestamps: true })

const order = mongooes.model('order', orderScheam)

module.exports = order;