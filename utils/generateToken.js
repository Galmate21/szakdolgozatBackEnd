const jwt=require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const generateToken=(id)=>{
    return jwt.sign({id},JWT_SECRET,{
        expiresIn:"10d",

    });
};

module.exports=generateToken;