const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const actionRoutes = require ('./routes/action-routes/action');
const generalRoutes = require ('./routes/general-routes/general');


const app = express();

mongoose.connect('mongodb+srv://harissak:123ManogDb@cluster0.k6rvyjm.mongodb.net/eShop?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Error');
});



app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});


app.use(actionRoutes);
app.use(generalRoutes);

module.exports = app;
