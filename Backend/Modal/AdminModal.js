const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { type } = require('os');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        require: true
    },
    lcno: {
        type: String,
        default: "none"
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SUPERADMIN', 'NONE'],
        default: 'NONE',
    },
    answer : {
        type :String,
        required : true
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
})

adminSchema.pre('save', function (next) {
    const admin = this

    const salt = randomBytes(8).toString('hex')
    const password = createHmac('sha256', salt)
        .update(admin.password)
        .digest('hex');
    this.salt = salt;
    this.password = password
    next()
})

adminSchema.static('matchpassword', async function (email, password) {
    const admin = await this.findOne({ email: email })

    if (!admin) throw 'Incorrect Mail'

    const generatedPassword = createHmac('sha256', admin.salt)
        .update(password)
        .digest('hex');

    if (generatedPassword !== admin.password) throw "Incorrect password";
    return admin
})

adminSchema.static("resetpass" , async function (body){

    const salt = randomBytes(8).toString('hex');
    const generatedpassword = createHmac('sha256' , salt)
                                .update(body.password)
                                .digest('hex')
    const result = await this.findOneAndUpdate({answer : body.answer , email : body.email } , {password : generatedpassword , salt : salt})
    console.log(result)
    if(!result) throw "Invalid Crenditial"

    return "changed"

})

const admin = mongoose.model('admin', adminSchema);
module.exports = admin
