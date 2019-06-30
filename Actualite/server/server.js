const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const User = require('./user');
const News = require('./news');
const users = [];
const news = [];
const server = require('http').createServer(app);

// Configure body parser
app.use(bodyParser.json({limit: '50mb'}));

// Configure logs
app.use(function (req, res, next) {
    console.log("req.originalUrl: ", req.originalUrl);
    console.log("req.body: ", req.body);
    next();
});

// Debug routes
app.get('/', function (req, res) {
	res.send('Server is running');
});

app.get('/users', function (req, res) {
	res.json(users);
});

app.get('/news', function (req, res) {
	res.json(news);
});

// RestAPI routes
app.post('/login', function (req, res) {
	let {login, password} = req.body;
	let data = {success: false, message: ''};

	if (!login || !password) {
		data.message = "Vous devez spécifier tous les paramètres.";
		res.send(JSON.stringify(data));
		return;
	}

	let foundUser = getUser(login);

	if (!foundUser) {
		data.message = "Cet utilisateur n'existe pas !";
		res.send(JSON.stringify(data));
		return;
	}

	let splitted = foundUser.password.split(':');
	let salt = splitted[0];
	let hashedPassword = splitted[1];

	if (SHA256_encrypt(password+salt) == hashedPassword) {
		data.success = true;
		data.message = "Connexion réussie !";
	} else {
		data.message = "Le mot de passe est incorrect !";
	}

	res.send(JSON.stringify(data));
});

app.post('/register', function (req, res) {
	let {login, password} = req.body;
	let data = {success: false, message: ''};

	if (!login || !password) {
		data.message = "Vous devez spécifier tous les paramètres.";
		res.send(JSON.stringify(data));
		return;
	}

	let foundUser = getUser(login);

	if (foundUser) {
		data.message = "Cet utilisateur existe déjà !";
		res.send(JSON.stringify(data));
		return;
	}

	let salt = require('randomstring').generate();
	let hash = SHA256_encrypt(password+salt);
	let hashedpassword = salt + ':' + hash;

	let user = new User(login, hashedpassword);

	users.push(user);

	data.success = true;
	data.message = "Inscription effectuée !";

	res.send(JSON.stringify(data));
});

app.post('/submitnews', function (req, res) {
	let {title, short_desc, desc} = req.body;
	let data = {success: false, message: ''};

	if (!title || !short_desc || !desc) {
		data.message = "Vous devez spécifier tous les paramètres.";
		res.send(JSON.stringify(data));
		return;
	}

	let article = new News(title, short_desc, desc);
	news.push(article);

	data.success = true;
	data.message = "La nouveauté à bien été publiée !";

	res.send(JSON.stringify(data));
});

app.post('/getnews', function (req, res) {
	res.send(JSON.stringify(news));
});

server.listen(1338);

console.log('[x] Server is running at http://127.0.0.1:1338/');
console.log('[x] Debugging page    at http://127.0.0.1:1338/users');
console.log('[x]                   at http://127.0.0.1:1338/news');

function getUser(login) {
	for (let user of users) {
		if (user.login == login) {
			return user;
		}
	}

	return null;
}

function SHA256_encrypt(data) {
	const crypto = require('crypto');
    return crypto.createHash('sha256').update(data).digest('base64');
};