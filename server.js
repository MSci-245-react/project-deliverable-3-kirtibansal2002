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

	console.log(movieTitle);
	console.log(actorName);
	console.log(directorName);

	let sql = `SELECT name, first_name, last_name, reviewContent, AVG(reviewScore)
	FROM movies M, directors D, Review R, movie_directors MD, director_genres DG
	WHERE M.movie_id = R.id
	AND M.movie_id = MD.movie_id
	AND MD.director_id = DG.director_id
	AND DG.id = D.id`;

	let data = [];

	if (movieTitle) {
		sql = sql + `AND M.name LIKE '%${movieTitle}%'`;
		data.push(movieTitle);
	}

	if (actorName) {
		sql = sql + 
	}

	if (directorName) {

	}

	sql = sql + `) GROUP BY M.name, D.first_name, D.last_name, R.reviewContent`;

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




app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server