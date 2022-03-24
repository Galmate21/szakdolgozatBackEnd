const mongoose = require('mongoose')
const bcrypt=require('bcryptjs');
const Felhasznalochema = new mongoose.Schema(
	{
		nev: { type: String, required: true},
		cim: { type: String, required: true },
        felhasznalonev:{type:String, require:true, unique: true },
        jelszo: { type: String, required: true },
        email: { type: String, required: true, unique: true }
	},
	{ collection: 'felhasznalo' }
)
Felhasznalochema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.jelszo);
  };
  
  // will encrypt password everytime its saved
  Felhasznalochema.pre("save", async function (next) {
    if (!this.isModified("jelszo")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.jelszo = await bcrypt.hash(this.jelszo, salt);
  });
  




const model = mongoose.model('Felhasznalochema', Felhasznalochema)

module.exports = model
