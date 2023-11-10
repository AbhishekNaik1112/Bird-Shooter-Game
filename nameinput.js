// GRAB THE FORM ELEMENT BY ITS ID
const nameForm = document.getElementById("submit-button");

// ADD EVENT LISTENER FOR CLICK EVENT
nameForm.addEventListener("click", function (event) {
  // PREVENT DEFAULT FORM SUBMISSION BEHAVIOR
  event.preventDefault();

  // RETRIEVE INPUT VALUES FROM USERNAME AND NICKNAME FIELDS
  const usernameInput = document.getElementById("username").value;
  const nicknameInput = document.getElementById("nickname").value;

  // STORE USERNAME AND NICKNAME IN SESSION STORAGE
  sessionStorage.setItem("username", usernameInput);
  sessionStorage.setItem("nickname", nicknameInput);

  // REDIRECT TO THE GAME.HTML PAGE
  window.location.href = "game.html";
});
