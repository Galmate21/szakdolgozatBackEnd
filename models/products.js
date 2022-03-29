const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		termekNev: { type: String, required: true},
		meret: { type: String, required: true },
        Ar:{type:Number, required:true},
		link:{type:String, required:true},
		Tipus:{type:String, required:true}
	},
	{ collection: 'termekek' }
)

const model = mongoose.model('ProductSchema', ProductSchema)

module.exports = model
