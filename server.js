const express = require('express');
const app = express();
const session = require('express-session');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const allergenRoutes = require('./routes/allergenRoutes');
const presenceRoutes = require('./routes/presenceRoutes');
const cors = require('cors');

// Base de données
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/restaurant';
mongoose.connect(url);

// Moteur de template
app.set('view engine', 'ejs');

// Middleware
app.use('/assets', express.static('public'));
app.use(
	session({
		secret: 'vousnavezpasditlemotmagique',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Routes
app.get('/', (request, response) => {
	response.render('pages/home', {
		title: 'Accueil',
	});
});
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/allergens', allergenRoutes);
app.use('/presences', presenceRoutes);
app.get('*', function (req, res) {
	res.status(404).render('pages/404', {
		title: "Page en construction",
	});
});

app.listen(8080);
