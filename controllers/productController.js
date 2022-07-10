const Category = require('../models/Category');
const Product = require('../models/Product');
const slugify = require('slugify');

const indexProducts = (request, response) => {
	Category.find()
		.populate('products')
		.then((categories) => {
			categories.sort((a, b) => {
				return a.sort - b.sort;
			});
			Product.find()
				.populate('category')
				.then((products) => {
					products.sort((a, b) => {
						return a.sort - b.sort;
					});
					response.render('pages/products', {
						title: 'Gestion des produits',
						currentCategoryId: undefined,
						currentProduct: undefined,
						currentSlug: undefined,
						categories: categories,
						products: products,
					});
				});
		});
};
const createProduct = (request, response) => {
	const newProduct = new Product({
		name: request.body.name,
		slug: slugify(request.body.name).toLowerCase(),
		description: request.body.description,
		category: request.body.category,
		price: request.body.price,
		sort: request.body.sort,
		isTrashed: request.body.isTrashed ? true : false,
	});
	Product.create(newProduct).then((product) => {
		Category.findByIdAndUpdate(product.category, { $push: { products: product._id } }).then(() => {
			response.redirect('/products');
		});
	});
};
const showProduct = (request, response) => {
	Category.find()
		.populate('products')
		.then((categories) => {
			categories.sort((a, b) => {
				return a.sort - b.sort;
			});
			Product.find()
				.populate('category')
				.then((products) => {
					products.sort((a, b) => {
						return a.sort - b.sort;
					});
                    Product.findOne({ slug: request.params.slug }).then((currentProduct) => {
                        console.log(currentProduct.category._id);
                        response.render('pages/products', {
                            title: 'Gestion des produits',
                            categories: categories,
                            products: products,
                            currentCategoryId: currentProduct.category._id,
                            currentProduct: currentProduct,
                            currentSlug: currentProduct.slug,
                        });
                    });
			});
		});
};
const updateProduct = (request, response) => {
    Product.findOneAndUpdate(
		{ slug: request.params.slug },
		{
			name: request.body.name,
			slug: slugify(request.body.name).toLowerCase(),
			description: request.body.description,
			category: request.body.category,
			price: request.body.price,
			sort: request.body.sort,
			isTrashed: request.body.isTrashed ? true : false,
		}
	).then(() => {
		response.redirect('/products');
	});
};
const trashProduct = (request, response) => {
	Product.findOneAndUpdate({ slug: request.params.slug }, [{ $set: { isTrashed: { $eq: [false, '$isTrashed'] } } }]).then(() => {
		response.redirect('/products');
	});
};
const deleteProduct = (request, response) => {
	Product.findOneAndDelete({ slug: request.params.slug }).then(() => {
		response.redirect('/products');
	});
};

module.exports = {
	indexProducts,
	createProduct,
	showProduct,
	updateProduct,
	trashProduct,
	deleteProduct,
};
