const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');


const app = express();

app.use(morgan('common'));

let topMovies = [
    {
        title: 'The Silence of the Lamb',
        director: 'Jonathan Demme'
    },
    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki'
    },
    {
        title: 'The Truman Show',
        director: 'Peter Weir'
    },
    {
        title: 'Avengers: Infinity War',
        director: 'Anthony Russo, Joe Russo'
    },
    {
        title: 'Pokemon Detective Pikachu',
        director: 'Rob Letterman'
    },
    {
        title: 'Willy Wonka and the chocolate factory',
        director: 'Mel Stuart'
    },
    {
        title: 'Monty Python and the Holy Grail',
        director: 'Terry Gilliam, Terry Jones'
    },
    {
        title: 'Home Alone',
        director: 'Chris Columbus'
    },
    {
        title: 'Shaun of the Dead',
        director: 'Edgar Wright'
    },
    {
        title: 'The Lord of the Rings',
        director: 'Peter Jackson'
    },
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  res.send(topMovies);
});

app.get('/secreturl', (req, res) => {
  res.send('This is for testing');
});

app.use(express.static('public'));

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });