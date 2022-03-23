
//könyvtár inicializálás
const express=require('express');
const app=express();
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
const ObjectId = require("mongodb").ObjectID;
const CryptoJS=require('crypto-js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require('./models/user');
const Product=require('./models/products');
const bodyParser=require('body-parser');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//corsolás
app.use(cors({
  origin: '*'
}));

function getId(raw) {
  try {
    return new ObjectId(raw);
  } catch (err) {
    return "";
  }
}


//Adatbázis kapcsolat

mongoose.connect('mongodb+srv://teszt:asdasd123@cluster0.ts1ao.mongodb.net/szakdolgozat?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
app.use(bodyParser.json());

app.get('/admins', async (req, res) => {
	const user = await User.find();
	res.send(user);
})

//Termékekre vonatkozó CRUD műveletek
//get
app.get('/termekek', async (req, res) => {
	const product = await Product.find();
	res.send(product);
})
//post
app.post('/termekek',async (req,res)=>{
  
 const body={
      termekNev:req.body.termekNev,
      meret:req.body.meret,
      Ar:req.body.Ar,
 }
 const response=await Product.create(body)
res.send(response);
})
//put
app.put('/termekek/:id',async (req,res)=>{
    const id=getId(req.params.id);
  const UjTermek={
       termekNev:req.body.termekNev,
       meret:req.body.meret,
       Ar:req.body.Ar,
  }
  if (!id) {
    res.send({ error: "Nem megfelelő azonosító" });
    return;
  }
  const response=await Product.findOneAndUpdate( { _id: id },
    { $set: UjTermek }, {
      new: true});
    if (!response.ok) {
      res.send({ error: "Nem található ilyen azonosítóval termék" });
      return;
    }
 res.send(response);
 })
 //delete
 app.delete('/termekek/:id',async (req,res)=>{
  const id=getId(req.params.id);

if (!id) {
  res.send({ error: "Nem megfelelő azonosító" });
  return;
}
const response=await Product.findOneAndDelete( { _id: id },function (err, docs) {
  if (err){
    console.log(err);
    res.send({ error: "Nem található ilyen azonosítóval termék" });
}
else{
    console.log("Deleted User : ", docs);
    res.send(docs);
}
})
  

  
  
res.send(response);
});



console.log("A szerver fut az 5500 as porton");
app.listen(5500);