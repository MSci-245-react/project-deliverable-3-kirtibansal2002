import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM movies';

	connection.query(sql, (error, results) => {
		if (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
			return;
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send(obj);
	});
	connection.end();
});

app.post(`/api/addReview`, (req, res) => {
	let connection = mysql.createConnection(config);

	let insertReviewSQL = `INSERT INTO Review (id, userID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;
	let insertReviewData = [req.body.id, req.body.userID, req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore];

	connection.query(insertReviewSQL, insertReviewData, (error, results, fields) => {
		if (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
			return;

		}
		res.send('Success');
	});
	connection.end();
});

app.post(`/api/search`, (req, res) => {
	let connection = mysql.createConnection(config);

	let movieTitle = req.body.movieTitle;
	let actorName = req.body.actorName;
	let directorName = req.body.directorName;

	let sql = `SELECT DISTINCT M.name, D.first_name, D.last_name, GROUP_CONCAT(DISTINCT R.reviewContent) AS reviews, AVG(R.reviewScore) AS score
	FROM movies M
	LEFT JOIN movies_directors MD ON M.id = MD.movie_id
	LEFT JOIN directors D ON MD.director_id = D.id
	LEFT JOIN roles Ro ON Ro.movie_id = M.id
	LEFT JOIN actors A ON Ro.actor_id = A.id
	LEFT JOIN Review R ON M.id = R.id
	WHERE 1=1`;


	if (movieTitle) {
		sql = sql + ` AND M.name LIKE '%${movieTitle}%'`;
	}

	if (actorName) {
		sql = sql + ` AND CONCAT(A.first_name, ' ' , A.last_name) LIKE '%${actorName}%'`;
	}

	if (directorName) {
		sql = sql + ` AND CONCAT(D.first_name, ' ' , D.last_name) LIKE '%${directorName}%'`;
	}

	sql = sql + ` GROUP BY M.name, D.first_name, D.last_name`;

	console.log(movieTitle);
	console.log(actorName);
	console.log(directorName);

	connection.query(sql, (error, results) => {
		if (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
			return;
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send(obj);
	});
	connection.end();
});

app.post(`/api/MyPage`, (req, res) => {
	let connection = mysql.createConnection(config);

	let actor = req.body.actor;
	let genre = req.body.genre;

	let sql = `SELECT DISTINCT M.name AS name, M.id AS id, M.youtube_url, GROUP_CONCAT(DISTINCT CONCAT(D.first_name, ' ', D.last_name)) AS directors, GROUP_CONCAT(DISTINCT CONCAT(A.first_name, ' ', A.last_name)) AS actors, AVG(R.reviewScore) AS score
	FROM movies M
	INNER JOIN movies_genres MG ON M.id = MG.movie_id
	INNER JOIN movies_directors MD ON M.id = MD.movie_id
	INNER JOIN directors D ON D.id = MD.director_id
	INNER JOIN roles Ro ON M.id = Ro.movie_id
	INNER JOIN actors A ON Ro.actor_id = A.id
	LEFT JOIN Review R ON M.id = R.id
	WHERE 1=1`;

	if (genre) {
		sql = sql + ` AND MG.genre LIKE '%${genre}%'`;
	}

	if (actor) {
		sql = sql + ` AND CONCAT(A.first_name, ' ' , A.last_name) LIKE '%${actor}%'`;
	}

	sql = sql + ` GROUP BY M.name, M.id, M.youtube_url, MG.genre`;

	console.log(genre);
	console.log(actor);

	connection.query(sql, (error, results) => {
		if (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
			return;
		}
		let string = JSON.stringify(results);
		console.log(string);
		let obj = JSON.parse(string);

		res.send(obj);
	});
	connection.end();
});


app.post(`/api/watchLater`, (req, res) => {
	let connection = mysql.createConnection(config);
	
	let movieID = req.body.movieID;
	
	let sql = `INSERT INTO WatchLater (movie_id) VALUES (?)`;

	connection.query(sql, [movieID], (error, results) => {
		if (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
			return;
		}
		res.send({ success: true });
	});

	connection.end();
});

app.delete(`/api/watchedMovie`, (req, res) => {
	let connection = mysql.createConnection(config);
	
	let movieID = req.body.movieID;
	
	let sql = `DELETE FROM WatchLater WHERE movie_id = ?`;

	connection.query(sql, [movieID], (error, results) => {
		if (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
			return;
		}
		res.send({ success: true });
	});
	
	connection.end();
});

app.post(`/api/watchList`, (req, res) => {
	let connection = mysql.createConnection(config);
	
	let sql = `SELECT DISTINCT M.name 
			   FROM movies M, WatchLater WL
			   WHERE WL.movie_id = M.id`;

		connection.query(sql, (error, results) => {
			if (error) {
				console.error(error.message);
				res.status(500).send('Internal Server Error');
				return;
			}
			let string = JSON.stringify(results);
			console.log(string);
			let obj = JSON.parse(string);
		
			res.send(obj);

			console.log(obj);
		});
		connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server