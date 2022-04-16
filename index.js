
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

const Product=require('./models/products');
const bodyParser=require('body-parser');
const FelhasznaloRoute=require('./routes/FelhasznaloRoute');
const Felhasznalo=require('./models/felhasznalok');

//corsolás
app.use(cors({
  origin: '*'
}));

require('dotenv').config();
function getId(raw) {
  try {
    return new ObjectId(raw);
  } catch (err) {
    return "";
  }
}

function getClient() {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    process.env.MONGO;
  return new MongoClient(uri, { useNewUrlParser: true });
}



//Adatbázis kapcsolat

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
app.use(bodyParser.json());
app.use(express.json());

//login,register
app.use('/felhasznalo',FelhasznaloRoute);




//Termékekre vonatkozó CRUD műveletek
//get
app.get("/termekek", function (req, res) {
  
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("termekek");
    const termekek = await collection
    .find()
    .toArray();
    res.send(termekek);
    client.close();
  });
});

//post
app.post("/termekek", bodyParser.json(), function (req, res) {
  const body={
    termekNev:req.body.termekNev,
    meret:req.body.meret,
    Ar:req.body.Ar,
    link:req.body.link,
    Tipus:req.body.Tipus,
  }

const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("termekek");
    const result = await collection.insertOne(body);
    if (!result) {
      res.send({ error: "insert error" });
      return;
    }
    res.send(body);
    client.close();
  });
});

//put
app.put("/termekek/:id", bodyParser.json(), function (req, res) {
  const ujTermek = {
    termekNev:req.body.termekNev,
    meret:req.body.meret,
    Ar:req.body.Ar,
    link:req.body.link,
    //Tipus:req.body.Tipus,
  };

  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("termekek");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: ujTermek }
    );

    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
    client.close();
  });
});
 //delete
 app.delete("/termekek/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("termekek");
    const result = await collection.deleteOne({ _id: id });
    if (!result.deletedCount) {
      res.send({ error: "not found" });
      return;
    }
    res.send({ id: req.params.id });
    client.close();
  });
});

//id get
app.get("/termekek/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("termekek");
    const termek = await collection.findOne({ _id: id });
    if (!termek) {
      res.send({ error: "not found" });
      return;
    }
    res.send(termek);
    client.close();
  });
});


//felhasználókra vonatkozó CRUD műveletek

//get
app.get("/felhasznalok", function (req, res) {
  
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("felhasznalo");
    const felhasznalok = await collection
    .find()
    .toArray();
    res.send(felhasznalok);
    client.close();
  });
});

//put
app.put("/felhasznalok/:id", bodyParser.json(),async function (req, res) {
  
  var jelszo=req.body.jelszo;
 const salt=await bcrypt.genSaltSync(10);
  jelszo=await bcrypt.hash(jelszo,salt);

  const ujFelhasznalo = {
    nev:req.body.nev,
    cim:req.body.cim,
    felhasznalonev:req.body.felhasznalonev,
    jelszo:jelszo,
    email:req.body.email,
    isAdmin:Boolean(req.body.isAdmin)
  };

  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("felhasznalo");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: ujFelhasznalo }
    );

    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
 
    client.close();
  });
});

//put allapot
app.put("/allapotfel/:id", bodyParser.json(),async function (req, res) {
  const id = getId(req.params.id);
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("felhasznalo");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set:{isAdmin:true} }
    );

    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
 
    client.close();
  });
})

app.put("/allapotle/:id", bodyParser.json(),async function (req, res) {
  const id = getId(req.params.id);
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("felhasznalo");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set:{isAdmin:false} }
    );

    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
 
    client.close();
  });
})
 //delete
 app.delete("/felhasznalok/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("felhasznalo");
    const result = await collection.deleteOne({ _id: id });
    if (!result.deletedCount) {
      res.send({ error: "not found" });
      return;
    }
    res.send({ id: req.params.id });
    client.close();
  });
});

//id get
app.get("/felhasznalok/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("felhasznalo");
    const felhasznalo = await collection.findOne({ _id: id });
    if (!felhasznalo) {
      res.send({ error: "not found" });
      return;
    }
    res.send(felhasznalo);
    client.close();
  });
});
//Megrendeléssel kapcsolatos CRUD műveletek
//get


app.get("/megrendelesek", function (req, res) {
  
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("megrendelesek");
    const megrendelesek = await collection
    .find()
    .toArray();
    res.send(megrendelesek);
    client.close();
  });
});
//get id
 
app.get("/megrendelesek/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("megrendelesek");
    const megrendeles = await collection.findOne({ _id: id });
    if (!megrendeles) {
      res.send({ error: "not found" });
      return;
    }
    res.send(megrendeles);
    client.close();
  });
});

//post

app.post("/megrendelesek/:fId", bodyParser.json(), function (req, res) {

  const fid = getId(req.params.fId);
 var date=new Date();
 var y=date.getFullYear();
 var m=date.getMonth()+1;
 var d=date.getDate();
 var datum=y+"-"+m+"-"+d;
  const body={
   
    felhasznalo: fid,
    megrendelt_termekek:req.body.megrendelt_termekek,
    osszeg:req.body.osszeg,
    aktiv: false,
    lezart:false,
    datum:datum
  }

const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("megrendelesek");
    const result = await collection.insertOne(body);
    if (!result.insertedId) {
      res.send({ error: "insert error" });
      return;
    }
    res.send(body);
    client.close();
  });
});

//delete

app.delete("/megrendelesek/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("megrendelesek");
    const result = await collection.deleteOne({ _id: id });
    if (!result.deletedCount) {
      res.send({ error: "not found" });
      return;
    }
    res.send({ id: req.params.id });
    client.close();
  });
});
//put

app.put("/megrendelesek/:id", bodyParser.json(),async function (req, res) {
  
  

  

  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("megrendelesek");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: {aktiv:true} }
    );

    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
 
    client.close();
  });
});

app.put("/megrendelesekLez/:id", bodyParser.json(),async function (req, res) {
  
  

  

  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db(process.env.DB).collection("megrendelesek");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: {lezart:true} }
    );

    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
 
    client.close();
  });
});




console.log("A szerver fut az 5501 as porton");

app.listen(5501);