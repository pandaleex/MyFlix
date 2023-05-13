const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");



app.use(morgan("common"));
app.use(bodyParser.json());

let movies = [
  {
    title: "The Silence of the Lamb",
    genre: {
      name: "Horror",
      description:
        "Horror is a film genre that seeks to elicit fear and/or disgust in its audience for entertainment purposes",
    },
    director: {
      name: "Jonathan Demme",
      born: "February 22, 1944",
      bio: "Robert Jonathan Demme was an American filmmaker",
    },
  },
  {
    title: "Spirited Away",
    genre: {
      name: "Anime",
      description:
        "Anime is hand-drawn and computer-generated animation originating from Japan. Outside of Japan and in English, anime refers specifically to animation produced in Japan.",
    },
    director: {
      name: "Hayao Miyazaki",
      born: "January 5, 1941",
      bio: "Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist.",
    },
  },
  {
    title: "The Truman Show",
    genre: {
      name: "Comedy",
      description:
        "Comedy film is a category of film which emphasizes humor and are designed to make the audience laugh.",
    },
    director: {
      name: "Peter Weir",
      born: "21 August 1944",
      bio: "Peter Lindsay Weir is a retired Australian film director.",
    },
  },
];

<<<<<<< Updated upstream
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
=======
let users = [
  {
    id: 1,
    name: "John",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Nick",
    favoriteMovies: ["Spirite Away"],
  },
  {
    id: 3,
    name: "Sam",
    favoriteMovies: [],
  },
];
>>>>>>> Stashed changes

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

//CREATE
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Please enter name!");
  }
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
});

//CREATE
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).json(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("Error Adding");
  }
});

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("Error Removing");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("No such user");
  }
});

//READ
app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("Movie not found :(");
  }
});

app.get("/movies/genres/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("Genre not found :(");
  }
});

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("Director not found :(");
  }
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
