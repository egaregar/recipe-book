<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/food_pic.jpg" style="width:50px; padding: 10px 20px;">
      </div>
    </router-link>
    <div class="title">
      <h1>Recipe Master</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/">Home</router-link> |
    <router-link to="/recipe">Recipe Manager</router-link>
    <p class="name_footer"> Ethan Garlick; <a href="https://github.com/egaregar/recipe-book.git">Git Hub</a> </p>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Nunito', sans-serif;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #b92d2c;
  color: #ffe1e1;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

.name_footer {
  font-size: 12px;
  text-align: center;
}

a,
a:visited {
  text-decoration: none;
}

a:hover,
a:visited:hover {
  text-decoration: none;
  color: #b92d2c
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
