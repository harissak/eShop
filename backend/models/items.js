const mongoose = require('mongoose');

const itemScheme = mongoose.Schema(
{  title: {type:String, required: true},
  price: {type:String, required: true},
  category: {type:String, required: true},
  imageUrl: {type:String},
  sizeAvailable: [],
  sale: {type:Boolean}

});


module.exports = mongoose.model('Item',itemScheme);
