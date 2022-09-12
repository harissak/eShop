const express = require('express');

const router = express.Router();
const ItemModel = require('../../models/items');


router.get('/api/deals',(req,res,next) => {

  ItemModel.find({sale :true})
  .then( itemsList => {
    res.status(200).json(
      { message:'Success',
        deals:itemsList
      });

  });

});

router.get('/api/search',(req,res,next) => {

  ItemModel.find()
  .then( itemsList => {
    res.status(200).json(
      { message:'Success',
        deals:itemsList
      });

  });

});



module.exports = router;

