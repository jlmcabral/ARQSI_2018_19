const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

var cors = require('cors');
app.use(cors());

require('dotenv').config();

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://databaseARQSI:BASEdados2018@ds151533.mlab.com:51533/closetisepge';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'MongoDb connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./src/routes/index'));
app.use('/api/encomenda/', require('./src/routes/EncomendaRoutes'));
app.use('/api/itemProduto/', require('./src/routes/ItemProdutoRoutes'));

const port = process.env.PORT || 4000;

app.listen(port, function(){
    console.log("Server stated on port " + port);
});