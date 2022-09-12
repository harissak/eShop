const express = require('express');

const router = express.Router();
const ItemModel = require('../../models/items');




router.get('/api/:category',(req,res,next) => {

  const category = req.params.category;
  const sale = false
  ItemModel.find({category:category, sale:sale})
  .then( itemsList => {

    res.status(200).json(
      { message:'Success',
        deals:itemsList
      });

  });

});


router.post('/api/new/item', (req, res,next) => {
  const item = new ItemModel({
      title: req.body.title,
      price : req.body.price,
      category : req.body.category,
      imageUrl: req.body.imageUrl,
      sizeAvailable: req.body.sizeAvailable,
      sale: req.body.sale
  });

  item.save()
  .then(result => {
    res.status(201)
     .json({
      message: 'Post added successfuly',
    itemID : result._id});
  });


});


router.delete('/api/item/delete/:id', (req,res,next) => {

  ItemModel.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).json(
      { message:'Deleted'
      });
  });
});

router.put('/api/update/item/:id', (req, res,next) => {

  const itemNew = new ItemModel ({
    _id:req.body.id,
    title:req.body.title,
    price : req.body.price,
    category : req.body.category,
    imageUrl: req.body.imageUrl,
    sizeAvailable: req.body.sizeAvailable,
    sale: req.body.sale

  });

  ItemModel.updateOne({_id:req.params.id}, itemNew)
  .then( result => {
    res.status(200)
    .json({message:'Update successful!'});
  });
});

module.exports = router;

