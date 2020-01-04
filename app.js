const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//***********************************************************************************************************************
//========================================================================================================================
//Insert Your public and secret key api from stripe.com .....
const skKey = '...';
const pkKey = "...";
//========================================================================================================================
//***********************************************************************************************************************

//The second parameter is the secretKey provided by stripe.com
const stripe = require('stripe')(skKey);

const app = express();


mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://rajat-admin:rajat1999@cluster0-nbxxl.mongodb.net/ybt",{useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));



//Products model and Schema
const productSchema = new mongoose.Schema({
  name: String,
  amount: String
});

const Product = mongoose.model('product', productSchema);
//end of product model and schema


app.get('/', function(req, res){
  res.render('index',{publicKey: pkKey});
});

app.post('/pay' ,function(req, res){
  var productPurchased = req.body.product;
  var chargeAmount = req.body.chargeAmount;
  var token = req.body.stripeToken;

Product.findOne({name: productPurchased}, function(err, found){
  if(err)
    console.log(err);
  chargeAmount = found.amount;
});

  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "inr",
    source: token
  }, function(err, charge){
    if(err && err.type === 'StripeCardError'){
      console.log('Your card was declined');
  }
});
console.log('Your payment was successful');
console.log(productPurchased);
console.log(chargeAmount);
res.redirect('/success');
});



app.get('/success', function(req, res){
  res.render('success');
});

app.listen(3000 || process.enc.PORT, function(){
  console.log('Server is running. Make payments.');
});


function seedProducts(){
  const newproduct = new Product({
    name: "product1",
    amount: 30000
  });
  newproduct.save();
  const newproduct2 = new Product({
    name: "product2",
    amount: 50000
  });
  newproduct2.save();
  const newproduct3 = new Product({
    name: "product3",
    amount: 7
  });
  newproduct3.save();
  const newproduct4 = new Product({
    name: "product4",
    amount: 2345
  });
  newproduct4.save();
}

//function to seed the database with some inital values and data for products available on the website.
// seedProducts();
