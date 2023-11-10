document.getElementById("Play").addEventListener("click", function () {
  window.location.href = "nameinput.html";
});

document.getElementById("HowToPlay").addEventListener("click", function () {
  window.location.href = "howtoplay.html";
});

document.getElementById("About").addEventListener("click", function () {
  window.location.href = "about.html";
});



const nameForm = document.getElementById("submit-button");

nameForm.addEventListener("click", function (event) {
  

  const usernameInput = document.getElementById("username").value;
  const nicknameInput = document.getElementById("nickname").value;

  sessionStorage.setItem("username", usernameInput);
  sessionStorage.setItem("nickname", nicknameInput);
  console.log(usernameInput,nicknameInput,"ll:");
  alert("hhh")

  window.location.href = "game.html";
});