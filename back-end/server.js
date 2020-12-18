const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipe', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  ingredients: String,
  directions: String,
  path: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    path: req.body.path,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    })
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/recipes/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id
    })
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.genre = req.body.genre;
    recipe.ingredients = req.body.ingredients;
    recipe.directions = req.body.directions;
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3002, () => console.log('Server listening on port 3002!'));