

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
require('./Model/config')
const axios = require('axios');
const ExchangeModel = require('./Model/Exchange');
const Icons = require('./Model/Icon')
const coinApiUrl = 'https://rest.coinapi.io/v1/exchanges';
const coinApiKey = 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9';
const coinApiUrl1 = 'https://rest.coinapi.io/v1/exchanges/icons/32';


async function fetchAndStoreExchanges() {
  try {
    const response = await axios.get(coinApiUrl, {
      headers: {
        'X-CoinAPI-Key': coinApiKey,
      },
    });

    const exchangesData = response.data;

    for (const exchange of exchangesData) {
      const newExchange = new ExchangeModel({
        exchange_id: exchange.exchange_id,
        website: exchange.website,
        name: exchange.name,
        data_quote_start: exchange.data_quote_start,
        data_quote_end: exchange.data_quote_end,
        data_orderbook_start: exchange.data_orderbook_start,
        data_orderbook_end: exchange.data_orderbook_end,
        data_trade_start: exchange.data_trade_start,
        data_trade_end: exchange.data_trade_end,
        data_symbols_count: exchange.data_symbols_count,
        volume_1hrs_usd: exchange.volume_1hrs_usd,
        volume_1day_usd: exchange.volume_1day_usd,
        volume_1mth_usd: exchange.volume_1mth_usd,
      });

      await newExchange.save();
    }

    console.log('Exchanges data has been successfully stored in the database');
  } catch (error) {
    console.error('Error fetching and storing exchanges data:', error);
  }
}
fetchAndStoreExchanges();

app.get("/Exchange", async (req, resp) => {
  let result = await ExchangeModel.find({});
  resp.send(result);
});


async function fetchAndStoreExchanges1() {
  try {
    const response = await axios.get(coinApiUrl1, {
      headers: {
        'X-CoinAPI-Key': coinApiKey,
      },
    });

    const exchangesIconData = response.data;

    for (const exchange of exchangesIconData) {
      const newExchange = new Icons({
        exchange_id: exchange.exchange_id,
        url: exchange.url
      });

      await newExchange.save();
    }

    console.log('Exchanges data has been successfully stored in the database');
  } catch (error) {
    console.error('Error fetching and storing exchanges data:', error);
  }
}
fetchAndStoreExchanges1();

app.get("/icon", async (req, resp) => {
  let result = await Icons.find({});
  resp.send(result);
});

app.get("/mergedData", async (req, resp) => {
  try {
    const mergedData = await ExchangeModel.aggregate([
      {
        $lookup: {
          from: 'exchangeicons', // Name of the 'Icon' collection
          localField: 'exchange_id', // Field to match in 'Exchange' collection
          foreignField: 'exchange_id', // Field to match in 'Icon' collection
          as: 'iconData', // Output array 
        },
      },
    ]);

    resp.send(mergedData);
  } catch (error) {
    console.error('Error merging data:', error);
    resp.status(500).send('Internal Server Error');
  }
});


app.listen(4005);
console.log("server run on 4005");