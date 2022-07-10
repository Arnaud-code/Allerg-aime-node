const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
	name: String,
	slug: String,
    description: String,
	price: Number,
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	sort: Number,
	isTrashed: Boolean,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
