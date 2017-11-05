const express = require('express');
const path = require('path');

const { OrderBook, Order } = require('./orderbook');

// create order book
const orderBook = new OrderBook();

// init generating random orders
orderBook.generateOrders();

let app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// serve angular front end files from root path
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/reset', (req, res) => {
  orderBook.reset();

  console.log('RESET');

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ 'reset': true }));
});

app.get('/listOrders', (req, res) => {
  const start = parseInt(req.query.start, 10) || 0;
  const size = Math.min(parseInt(req.query.size, 10), 200) || 10;

  const orders = orderBook.getOrders(start, start + size);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(orders));
});

console.log('Starting listening on: ' + (process.env.PORT || 5001));
app.listen(process.env.PORT || 5001);
