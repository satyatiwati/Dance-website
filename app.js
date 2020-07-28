const express= require("express");
 const path = require('path');
 const app= express();
  var mongoose = require('mongoose');
  const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true,useUnifiedTopology:true});
 const port= 80;
 var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    locality: String,
  });
  var contact=mongoose.model('contact',contactSchema)
 app.use('/static',express.static('static'));
 app.use(express.urlencoded());
 app.set('view engine','pug');
 app.set('views',path.join(__dirname,'views'));
 app.get('/',(req,res)=>{
    
     res.status(200).render('home.pug');

 })
 app.get('/contact',(req,res)=>{
    
    res.status(200).render('contact.pug');

})
app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to database");
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    })

    // res.status(200).render('contact.pug');

})

app.listen(port,()=>{
    console.log("application has started sucessfully");
});