const Allergen = require('../models/Allergen');
const slugify = require('slugify');

const indexAllergens = (request, response) => {
	Allergen.find().then((allergens) => {
		allergens.sort((a, b) => {
			return a.sort - b.sort;
		});
		response.render('pages/allergens', {
			title: 'Gestion des allergènes',
			allergens: allergens,
			currentAllergen: undefined,
			currentSlug: undefined,
		});
	});
};
const createAllergen = (request, response) => {
	const newAllergen = new Allergen({
		name: request.body.name,
		slug: slugify(request.body.name).toLowerCase(),
		sort: request.body.sort,
		description: request.body.description,
	});
	Allergen.create(newAllergen).then(response.redirect('/allergens'));
};
const showAllergen = (request, response) => {
	Allergen.findOne({ slug: request.params.slug }).then((currentAllergen) => {
		Allergen.find().then((allergens) => {
			allergens.sort((a, b) => {
				return a.sort - b.sort;
			});
			response.render('pages/allergens', {
				title: 'Gestion des allergènes',
				allergens: allergens,
				currentAllergen: currentAllergen,
				currentSlug: request.params.slug,
			});
		});
	});
};
const updateAllergen = (request, response) => {
	Allergen.findOneAndUpdate(
		{ slug: request.params.slug },
		{
			name: request.body.name,
			slug: slugify(request.body.name).toLowerCase(),
			sort: request.body.sort,
			description: request.body.description,
		}
	).then(() => {
		response.redirect('/allergens');
	});
};
const deleteAllergen = (request, response) => {
	Allergen.findOneAndDelete({ slug: request.params.slug }).then(() => {
		response.redirect('/allergens');
	});
};

module.exports = {
	indexAllergens,
	createAllergen,
	showAllergen,
	updateAllergen,
	deleteAllergen,
};
