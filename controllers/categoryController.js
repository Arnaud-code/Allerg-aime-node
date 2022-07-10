const Category = require('../models/Category');
const slugify = require('slugify');

const indexCategories = (request, response) => {
	Category.find().then((categories) => {
		categories.sort((a, b) => {
			return a.sort - b.sort;
		});
		response.render('pages/categories', {
			title: 'Gestion des catégories',
			categories: categories,
			currentCategory: undefined,
			currentSlug: undefined,
		});
	});
};
const createCategory = (request, response) => {
    const newCategory = new Category({
        name: request.body.name,
        slug: slugify(request.body.name).toLowerCase(),
        sort: request.body.sort,
        isTrashed: request.body.isTrashed ? true : false,
    });
    Category.create(newCategory).then(response.redirect('/categories'));
};
const showCategory = (request, response) => {
    Category.findOne({ slug: request.params.slug }).then((currentCategory) => {
        Category.find().then((categories) => {
            categories.sort((a, b) => {
                return a.sort - b.sort;
            });
            response.render('pages/categories', {
                title: 'Gestion des catégories',
                categories: categories,
                currentCategory: currentCategory,
                currentSlug: request.params.slug,
            });
        });
    });
};
const updateCategory = (request, response) => {
	Category.findOneAndUpdate(
		{ slug: request.params.slug },
		{
			name: request.body.name,
			slug: slugify(request.body.name).toLowerCase(),
			sort: request.body.sort,
			isTrashed: request.body.isTrashed ? true : false,
		}
	).then(() => {
		response.redirect('/categories');
	});
};
const trashCategory = (request, response) => {
	Category.findOneAndUpdate({ slug: request.params.slug }, [{ $set: { isTrashed: { $eq: [false, '$isTrashed'] } } }]).then(() => {
		response.redirect('/categories');
	});
};
const deleteCategory = (request, response) => {
	Category.findOneAndDelete({ slug: request.params.slug }).then(() => {
		response.redirect('/categories');
	});
};

module.exports = {
	indexCategories,
	createCategory,
	showCategory,
	updateCategory,
	trashCategory,
	deleteCategory,
};