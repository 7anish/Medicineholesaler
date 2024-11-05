const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');


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

const admin = mongoose.model('admin', adminSchema);
module.exports = admin
