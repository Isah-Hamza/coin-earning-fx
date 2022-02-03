const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone_number: Number,
    password: String,
    confirm_password: String,
    country: String,
    withdrawal_info : {
        bank:{
            bank_name:{
                type: String,
                default : ''},
            account_name:{
                type: String,
                default : ''},
            account_number:{
                type: Number,
                default : 0}
        },
        bitcoin:{
            bitcoin_address:{
                type: String,
                default : ''}
        },
        etherum:{
            etherum_address:{
                type: String,
                default : ''}
        },
        litcoin:{
            litcoin_address:{
                type: String
        }
    }
    }
})

module.exports = mongoose.model('User',userSchema)