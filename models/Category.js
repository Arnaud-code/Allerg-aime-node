const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    sort: Number,
    isTrashed: Boolean,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;