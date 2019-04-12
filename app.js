const express = require('express');
const app = express();
const morgan = 	require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


/*const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://test1:test1@node-restful-test-uum9v.mongodb.net/test?retryWrites=true';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect();*/

mongoose
  .connect('mongodb+srv://test1:'+ process.env.MONGO_ATLAS_PW + '@node-restful-test-uum9v.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*',);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});
//Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});


module.exports = app ;
//this is app js
