const { json } = require('body-parser');
const asyncHandler=require('express-async-handler');

const Felhasznalo=require('../models/felhasznalok');
const generateToken = require('../utils/generateToken');

const register=asyncHandler(async(req, res)=>{
    const {nev,cim,felhasznalonev,jelszo,email}=req.body;

    const felhasznaloVan=await Felhasznalo.findOne({email,felhasznalonev});

    if(felhasznaloVan){
        res.status(400);
        res.send("Ilyen felhastnáló már regisztrálva lett korábban");
        return;
    }
    const felhasznalo=await Felhasznalo.create({
        nev,
        cim,
        felhasznalonev,
        jelszo,
        email
    });
    if(felhasznalo){
        res.status(201).json({
            _id:felhasznalo._id,
            nev:felhasznalo.nev,
            felhasznalonev:felhasznalo.felhasznalonev,
            email:felhasznalo.email,
            token:generateToken(felhasznalo._id)
        });
        console.log("krs");
    }else{
        res.sendStatus(400);
        res.send("Hiba történt!");
        return;
    }

});

const login=asyncHandler(async(req, res)=>{
    const {felhasznalonev,jelszo}=req.body;

    const felhasznalo=await Felhasznalo.findOne({felhasznalonev});

    if(felhasznalo&&(await felhasznalo.matchPassword(jelszo))){
        res.send({
            _id:felhasznalo._id,
            nev:felhasznalo.nev,
            felhasznalonev:felhasznalo.felhasznalonev,
            email:felhasznalo.email,
            token:generateToken(felhasznalo._id)
        })
    }else{
        
        res.send("Hibás név vagy jelszó!");
        return;
    }

});

module.exports={register,login};