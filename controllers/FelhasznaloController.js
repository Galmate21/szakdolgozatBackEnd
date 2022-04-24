const { json } = require('body-parser');
const asyncHandler=require('express-async-handler');

const Felhasznalo=require('../models/felhasznalok');
const generateToken = require('../utils/generateToken');

const register=asyncHandler(async(req, res)=>{
    const {nev,cim,felhasznalonev,jelszo,email}=req.body;
    const isAdmin=false;

    const felhasznaloVan=await Felhasznalo.findOne({email,felhasznalonev});

    if(felhasznaloVan){
        res.status(400);
        res.send("Ilyen felhasználó már regisztrálva lett korábban");
        return;
    }
    const felhasznalo=await Felhasznalo.create({
        nev,
        cim,
        felhasznalonev,
        jelszo,
        email,
        isAdmin
    });
    if(felhasznalo){
        res.status(201).json({
            _id:felhasznalo._id,
            nev:felhasznalo.nev,
            felhasznalonev:felhasznalo.felhasznalonev,
            email:felhasznalo.email,
            isAdmin:felhasznalo.isAdmin,
            cim:felhasznalo.cim,
            token:generateToken(felhasznalo._id),
            uzenet:"Sikeres regisztráció!"

        });
        
    }else{
        res.sendStatus(400).json({error:"Hiba történt"});
        
        return;
    }

});

const login=asyncHandler(async(req, res)=>{
    const {email,jelszo}=req.body;

    const felhasznalo=await Felhasznalo.findOne({email:email});

    if(felhasznalo&&(await felhasznalo.matchPassword(jelszo))){
        res.status(201).json({
            _id:felhasznalo._id,
            nev:felhasznalo.nev,
            felhasznalonev:felhasznalo.felhasznalonev,
            email:felhasznalo.email,
            cim:felhasznalo.cim,
            token:generateToken(felhasznalo._id),
            isAdmin:felhasznalo.isAdmin,
        })
    }else{
        
        res.status(400).json({
            error:"Hibás név vagy jelszó!"
        })
        return;
    }

});

module.exports={register,login};