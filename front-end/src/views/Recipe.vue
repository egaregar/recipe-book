<template>
<div class="recipe">
  <h1>RECIPE MANAGER</h1>
  <div class="heading">
    <h2>Add an Recipe</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Recipe title" size="27">
      <input v-model="description" placeholder="Description" size="40">
      <input v-model="genre" placeholder="Food genre" size="20">
      <br>
      <textarea v-model="ingredients" placeholder="Ingredients" rows="6" cols="100">
      </textarea>
      <br>
      <textarea v-model="directions" placeholder="Directions" rows="6" cols="100">
      </textarea>
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button> Note: must include photo to upload recipe
    </div>
    <div class="upload" v-if="addRecipe">
      <h2>{{addRecipe.title}}</h2>
      <h2>{{addRecipe.description}}</h2>
      <img :src="addRecipe.path" class="preview-image" />
    </div>
  </div>
  <div class="heading">
    <h2>Edit/Delete an Recipe</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findRecipe">
      <input v-model="findRecipe.title" placeholder="Recipe title" size="27">
      <input v-model="findRecipe.description" placeholder="Description" size="40">
      <input v-model="findRecipe.genre" placeholder="Food genre" size="20">
      <br>
      <textarea v-model="findRecipe.ingredients" placeholder="Ingredients" rows="6" cols="100">
      </textarea>
      <br>
      <textarea v-model="findRecipe.directions" placeholder="Directions" rows="6" cols="100">
      </textarea>
      <p></p>
      <img :src="findRecipe.path" class="preview-image" />
    </div>
    <div class="actions" v-if="findRecipe">
      <button @click="deleteRecipe(findRecipe)">Delete</button>
      <button @click="editRecipe(findRecipe)">Edit</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      title: "",
      description: "",
      genre: "",
      ingredients: "",
      directions: "",
      file: null,
      addRecipe: null,
      name: 'Recipe',
      recipes: [],
      findTitle: "",
      findRecipe: null,
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          title: this.title,
          description: this.description,
          genre: this.genre,
          ingredients: this.ingredients,
          directions: this.directions,
          path: r1.data.path
        });
        this.addRecipe = r2.data;
        this.getRecipes();
        // console.log(this.addRecipe.title)
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRecipe(recipe) {
      this.findTitle = "";
      this.findRecipe = recipe;
    },
    async deleteRecipe(recipe) {
      try {
        await axios.delete("/api/recipes/" + recipe._id);
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRecipe(recipe) {
      try {
        await axios.put("/api/recipes/" + recipe._id, {
          title: this.findRecipe.title,
          description: this.findRecipe.description,
          genre: this.findRecipe.genre,
          ingredients: this.findRecipe.ingredients,
          directions: this.findRecipe.directions,
        });
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    suggestions() {
      let recipes = this.recipes.filter(recipe => recipe.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return recipes.sort((a, b) => a.title > b.title);
    }
  },
}
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

img {
  max-width: 200px;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
  font-size: 18px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #b92d2c;
  color: #fff;
}
</style>
