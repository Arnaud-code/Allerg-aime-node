const mongoose = require('mongoose');
const { Schema } = mongoose;

const presenceSchema = new mongoose.Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
	allergen: {
		type: Schema.Types.ObjectId,
		ref: 'Allergen',
	},
});

const Presence = mongoose.model('Presence', presenceSchema);

module.exports = Presence;
