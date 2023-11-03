
var mongoose =require('mongoose');
const schema3 = new  mongoose.Schema({
    exchange_id:{
        type:String
    },website:{
        type:String
    },name:{
        type:String
    },data_quote_start:{
        type:String
    },data_quote_end:{
        type:String
    },data_orderbook_start:{
        type:String
    },data_orderbook_end:{
        type:String
    },data_trade_start:{
        type:String
    },data_trade_end:{
        type:String
    },data_symbols_count:{
        type:String
    },volume_1hrs_usd:{
        type:String
    },volume_1day_usd:{
        type:String
    },volume_1mth_usd:{
        type:String
    },
    

});
const Exchanges = new mongoose.model('Exchanges',schema3);
module.exports = Exchanges;