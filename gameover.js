// LISTEN FOR THE DOM CONTENT TO BE FULLY LOADED
document.addEventListener("DOMContentLoaded", function () {
  // SELECT ELEMENTS FROM THE DOM
  const phrasedisplay = document.querySelector(".gameover");
  const usernameDisplay = document.querySelector(".name");
  const nicknameDisplay = document.querySelector(".nname");
  const scoredisplay = document.querySelector(".yourscore");

  // RETRIEVE USER DATA FROM SESSION STORAGE
  const username = sessionStorage.getItem("username");
  const nickname = sessionStorage.getItem("nickname");
  const score = sessionStorage.getItem("score");
  const scorem = sessionStorage.getItem("scoreMessage");

  // DISPLAY USERNAME IF AVAILABLE
  if (username) {
    usernameDisplay.textContent = "Username: " + username;
  }

  // DISPLAY NICKNAME IF AVAILABLE
  if (nickname) {
    nicknameDisplay.textContent = "Nickname: " + nickname;
  }

  // DISPLAY SCORE IF AVAILABLE
  if (score) {
    scoredisplay.textContent = "Score: " + score;
  }

  // DISPLAY SCORE MESSAGE IF AVAILABLE
  if (scorem) {
    phrasedisplay.textContent = "" + scorem;
  }
});
