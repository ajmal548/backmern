const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    methode :{
        type:String,
        enum:['credit_card','debit_card','ATM_card','wallets','paypal', 'cash_on_delivery'],
        default:'cash_on_delivery'
    },
    methode_number:{
        type:String,
        enum:['card_number','Upi_number','Mobile_number'],
        default: 'Mobile_number'
    },
    transaction_ID:String,
    status:{
        type:String,
        enum:['active', 'inactive'],
        default: 'active'
    }  
});
const paymentModel =mongoose.model("Payment", paymentSchema, "payment");
module.exports = paymentModel;