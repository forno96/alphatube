const express = require('express');
	cors = require('cors');				//~ Module required for Cross-Origin-Resource-Sharing policy
	path = require('path');
	jsonDB = require('node-json-db');	//~ Module that implements a json based database
	port = 8000;
var process = require('process');
	bodyParser = require('body-parser');
	atlas = express();

// Fix path
process.env.PWD = path.join(path.dirname(process.argv[1]), '..');
process.chdir(process.env.PWD);
__dirname = process.env.PWD;
__filename = process.argv[1];


// CORS
var whitelist = ['site1826', 'gabriele.fulgaro', 'mattia.polverini', 'arianna.avoni', 'francesco.fornari2'];
for (i in whitelist) {
	whitelist[i] = 'http://' + whitelist[i] + '.tw.cs.unibo.it'
}
whitelist.push('http://localhost:8000');
whitelist.push(undefined);		// in localhost the origin is undefined

var corsOption = {
	methods: ['GET','PUT'],
	allowedHeaders: ['Content-Type'],
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}


//~ Server setup
atlas.use(cors(corsOption));
atlas.use(bodyParser.urlencoded({ extended: false }));
atlas.use(bodyParser.json());
atlas.use(express.static('alphatube'));


//~ JSON-DB - Initialization procedure
//~ If db file is present, conect to it else create it.
//~ The db purpouse is to track videos watched by the individual user
var db = new jsonDB("./db", true, true);

// ~ atlas.options('*',cors(corsOption));

//~ Routes management
atlas.get('/globpop', function(req, res) {

	// ~ console.log(req.protocol + '://' + req.headers.host);
	var response = {
		site: req.headers.host,
		recommender: req.query.id,
		lastWatched: 'Never watched.',
		recommended: []
	}

	if (req.query.id) {
		try {
			var video = db.getData(`/${req.query.id}`);

			if (video) {
				response.lastWatched = video.lastWatched;
				response.recommended = Object.entries(video.recommended).map(
					([k, v]) => (
						{
							videoID: k,
							prevalentReason: Object.keys(v)[0],
							timesWatched: Object.values(v)[0].timesWatched,
							lastSelected: Object.values(v)[0].lastSelected
						}
					)
				);
				// ~ console.log(response);
			}
		} catch(error) {
			console.log(error);
			// ~ res.statusCode = 400;
		}
	}
	// ~ else {

	// ~ }
	res.json( response );
});

atlas.put('/watched', (req, res) => {

	const date = new Date().toUTCString();

	if (req.body.begin) {
		try {
			var timesWatched = db.getData(`/${req.body.begin}/recommended/${req.body.end}/${req.body.reason}`);
		} catch(error) {
			timesWatched = 0;
		}

		var value = {
			recommended: {
				[req.body.end]: {
					[req.body.reason]: {
						timesWatched: timesWatched+1,
						lastSelected: date
					}
				}
			}
		}

		db.push("/" + req.body.begin, value, false);
	}


	try {
		timesWatched = db.getData(`/${req.body.end}/timesWatched`);
	} catch(error) {
		timesWatched = 0;
	}

	value = {
		timesWatched: timesWatched+1,
		lastWatched: date
	}

	db.push("/" + req.body.end, value, false);



	res.json( { message: 'OK' } );

		// ~ res.statusCode = 400;
		// ~ res.send('Bad Request');
});

atlas.get('*', (req, res) => {
	res.sendFile(path.join(process.env.PWD, 'alphatube/index.html'));		// sendFile need absolute path
});

//~ Server bindings to port and listening
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
