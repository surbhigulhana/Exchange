
var mongoose =require('mongoose');
const schema3 = new  mongoose.Schema({
    exchange_id:{
        type:String
    },
    url:{
        type:String
    }

});
const ExchangeIcon = new mongoose.model('ExchangeIcon',schema3);
module.exports = ExchangeIcon;