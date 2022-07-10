const mongoose = require('mongoose');
const { Schema } = mongoose;

const allergenSchema = new mongoose.Schema({
	name: String,
	slug: String,
	description: String,
	sort: Number,
	presences: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Presence',
		},
	],
});

const Allergen = mongoose.model('Allergen', allergenSchema);

module.exports = Allergen;
