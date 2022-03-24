
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
const Admin = require('./models/admin');
const Product=require('./models/products');
const bodyParser=require('body-parser');
const FelhasznaloRoute=require('./routes/FelhasznaloRoute');
const Felhasznalo=require('./models/felhasznalok');

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
app.use(express.json());
app.use('/felhasznalo',FelhasznaloRoute);



app.get('/admins', async (req, res) => {
	const admin = await Admin.find();
	res.send(admin);
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
    console.log("Törölt termék : ", docs);
    res.send(docs);
}
}) 
res.send(response);
});

//id get
app.get('/termekek/:id',async (req,res)=>{
  const id=getId(req.params.id);

if (!id) {
  res.send({ error: "Nem megfelelő azonosító" });
  return;
}
const response=await Felhasznalo.findOne( { _id: id },function (err, docs) {
  if (err){
    console.log(err);
    res.send({ error: "Nem található ilyen azonosítóval termék" });
}
else{
    
    res.send(docs);
}
}) 
res.send(response);
});



//felhasználókra vonatkozó CRUD műveletek
//get
app.get('/felhasznalok', async (req, res) => {
	const user = await Felhasznalo.find();
	res.send(user);
})
//post
app.post('/felhasznalok',async (req,res)=>{
  
 const body={
      nev:req.body.nev,
      cim:req.body.cim,
      felhasznalonev:req.body.felhasznalonev,
      jelszo:CryptoJS.MD5(req.body.jelszo),
 }
 const response=await Felhasznalo.create(body)
res.send(response);
})
//put
app.put('/felhasznalok/:id',async (req,res)=>{
    const id=getId(req.params.id);
  const friss={
    nev:req.body.nev,
    cim:req.body.cim,
    felhasznalonev:req.body.felhasznalonev,
    jelszo:CryptoJS.MD5(req.body.jelszo),
  }
  if (!id) {
    res.send({ error: "Nem megfelelő azonosító" });
    return;
  }
  const response=await Product.findOneAndUpdate( { _id: id },
    { $set: friss }, {
      new: true});
    if (!response.ok) {
      res.send({ error: "Nem található ilyen azonosítóval felhasználó" });
      return;
    }
 res.send(response);
 })
 //delete
 app.delete('/felhasznalok/:id',async (req,res)=>{
  const id=getId(req.params.id);

if (!id) {
  res.send({ error: "Nem megfelelő azonosító" });
  return;
}
const response=await Felhasznalo.findOneAndDelete( { _id: id },function (err, docs) {
  if (err){
    console.log(err);
    res.send({ error: "Nem található ilyen azonosítóval felhasználó" });
}
else{
    console.log("Törölt felhasználó : ", docs);
    res.send(docs);
}
}) 
res.setHeader('Content-Type', 'application/json');
res.send(response);

});

//id get
app.get('/felhasznalok/:id',async (req,res)=>{
  const id=getId(req.params.id);

if (!id) {
  res.send({ error: "Nem megfelelő azonosító" });
  return;
}
const response=await Felhasznalo.findOne( { _id: id },function (err, docs) {
  if (err){
    console.log(err);
    res.send({ error: "Nem található ilyen azonosítóval felhasználó" });
}
else{
    
    res.send(docs);
}
}) 
res.send(response);
});


console.log("A szerver fut az 5501 as porton");
app.listen(5501);