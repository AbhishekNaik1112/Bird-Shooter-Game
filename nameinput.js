const nameForm = document.getElementById("submit-button");

nameForm.addEventListener("click", function (event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username").value;
  const nicknameInput = document.getElementById("nickname").value;

  sessionStorage.setItem("username", usernameInput);
  sessionStorage.setItem("nickname", nicknameInput);

  window.location.href = "game.html";
});
