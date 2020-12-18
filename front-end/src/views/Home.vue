<template>
<div class="home">
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search spaced-icon"></i><input v-model="searchText" placeholder="Search by title, description, or genre" />
      </form>
    </div>
  </div>
  <section class="recipe-gallery">
    <div class="recipe" v-for="recipe in recipeList" :key="recipe.id">
      <h2>{{recipe.title}}</h2>
      <p> <em>{{recipe.description}}</em></p>
      <p>Genre: {{recipe.genre}}</p>
      <img :src="recipe.path" />
      <h3>Ingredients:</h3>
      <p>
        <span style="white-space: pre;"><em>{{recipe.ingredients}}</em></span>
      </p>
      <h3>Directions:</h3>
      <p> <span style="white-space: pre;"> <em>{{recipe.directions}}</em> </span>
      </p>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      recipes: [],
      searchText: '',
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    withLines(description) {
      var descriptionArray = description.split(/[\r\n]+/);
      var descriptionLines = new Array();
      for (var line = 0; line < descriptionArray.length; line++) {
        descriptionLines.push({
          Line: descriptionArray[line]
        });
      }
      return descriptionLines;
    },
    recipeList() {
      return this.recipes.filter(recipe => recipe.title.toLowerCase().search(this.searchText.toLowerCase()) >= 0 ||
        recipe.description.toLowerCase().search(this.searchText.toLowerCase()) >= 0 ||
        recipe.genre.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  }
}
</script>

<style scoped>
body {
  white-space: pre;
}

.recipe {
  width: 67%;
  padding: 20px 0px;
  margin: 30px 0px;
  border-top: 2px solid silver;
}

.recipe-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe h2 {
  font-style: normal;
  font-size: 24px;
}

p {
  font-style: normal;
}

img {
  max-width: 150px;
}

.spaced-icon {
  padding: 0px 15px !important;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
