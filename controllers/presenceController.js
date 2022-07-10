const Allergen = require('../models/Allergen');
const Presence = require('../models/Presence');

const indexPresences = (request, response) => {
	response.render('pages/presences', {
		title: 'Gestion des présences d\'allergène',
	});
};
const addPresence = (request, response) => {

};
const deletePresence = (request, response) => {

};

module.exports = {
	indexPresences,
	addPresence,
	deletePresence,
};
