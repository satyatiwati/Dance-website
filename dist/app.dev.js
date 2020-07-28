"use strict";

var express = require("express");

var path = require('path');

var app = express();

var mongoose = require('mongoose');

var bodyparser = require("body-parser");

mongoose.connect('mongodb://localhost/contactdance', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var port = 80;
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  locality: String
});
var contact = mongoose.model('contact', contactSchema);
app.use('/static', express["static"]('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.get('/', function (req, res) {
  res.status(200).render('home.pug');
});
app.get('/contact', function (req, res) {
  res.status(200).render('contact.pug');
});
app.post('/contact', function (req, res) {
  var mydata = new contact(req.body);
  mydata.save().then(function () {
    res.send("this item has been saved to database");
  })["catch"](function () {
    res.status(400).send("item was not saved to database");
  }); // res.status(200).render('contact.pug');
});
app.listen(port, function () {
  console.log("application has started sucessfully");
});
//# sourceMappingURL=app.dev.js.map
