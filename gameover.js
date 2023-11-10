document.addEventListener("DOMContentLoaded", function () {
  const phrasedisplay = document.querySelector(".gameover");
  const usernameDisplay = document.querySelector(".name");
  const nicknameDisplay = document.querySelector(".nname");
  const scoredisplay = document.querySelector(".yourscore");

  const username = sessionStorage.getItem("username");
  const nickname = sessionStorage.getItem("nickname");
  const score = sessionStorage.getItem("score");
  const scorem = sessionStorage.getItem("scoreMessage");
  if (username) {
    usernameDisplay.textContent = "Username: " + username;
  }

  if (nickname) {
    nicknameDisplay.textContent = "Nickname: " + nickname;
  }

  if (score) {
    scoredisplay.textContent = "Score: " + score;
  }

  if (scorem) {
    phrasedisplay.textContent = "" + scorem;
  }
});
