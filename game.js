const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");

window.onload = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  collisionCanvas.width = window.innerWidth;
  collisionCanvas.height = window.innerHeight;
  bgm.play();
};

const bgm = new Audio("assets/dancehall-124368.mp3");
bgm.play();
bgm.loop = true;


let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
let gameOver = false;
let lives = 5000;

let ravens = [];

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "assets/raven.png";
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color =
      "rgb(" +
      this.randomColors[0] +
      "," +
      this.randomColors[1] +
      "," +
      this.randomColors[2] +
      ")";
    this.hasTrail = Math.random() > 0.5;
  }

  update(deltatime) {
    if (this.y < 0 || this.y > canvas.height) {
      this.directionY = this.directionY * -1;
    }
    this.x -= this.directionX;
    this.y -= this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltatime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
      if (this.hasTrail) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this.color));
        }
      }
    }
    if (this.x < 0 - this.width) {
        lives--;
        if (lives == 0) {
          gameOver = true;  
          window.location.href = "gameover.html";
        }
    }
  }

  draw() {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

let explosions = [];

class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "assets/boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.x = x;
    this.y = y;
    this.size = size;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = "assets/gunshot.mp3";
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;
  }

  update(deltatime) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += deltatime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.markedForDeletion = true;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size * 0.25,
      this.size,
      this.size
    );
  }
}

let particles = [];

class Particle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size * 0.5 + Math.random() * 50 - 25;
    this.y = y + this.size * 0.3;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }

  update() {
    this.speedX += this.speedX;
    this.radius += 0.8;
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "50px Concert One";
  ctx.fillText("Score: " + score, 50, 75);
}

function drawLives() {
  ctx.fillStyle = "black";
  ctx.font = "50px Concert One";
  ctx.fillText("Lives: " + lives, 1240, 75);
}

window.addEventListener("click", function (e) {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
  const pc = detectPixelColor.data;
  ravens.forEach((object) => {
    if (
      object.randomColors[0] === pc[0] &&
      object.randomColors[1] === pc[1] &&
      object.randomColors[2] === pc[2]
    ) {
      object.markedForDeletion = true;
      score++;
      explosions.push(new Explosion(object.x, object.y, object.width));
    }
  });
});

function getScoreMessage(score) {
  if (score >= 0 && score <= 10) {
    return "Nice start!";
  } else if (score > 10 && score <= 20) {
    return "Getting better!";
  } else if (score > 20 && score <= 30) {
    return "Impressive!";
  } else {
    return "You're on fire!";
  }
}

function animate(timestamp) {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);

    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;

    if (score > 0) {
      if (score % 40 == 0) {
        if (lives >= 5) {
          score += 20;
        }
      }
    }

    const scoreMessage = getScoreMessage(score);
    ctx.fillStyle = "black";
    ctx.font = "30px Concert One";
    ctx.fillText(scoreMessage, 640, 75);

    if (timeToNextRaven > ravenInterval) {
      ravens.push(new Raven());
      timeToNextRaven = 0;
      ravens.sort(function (a, b) {
        return a.width - b.width;
      });
    }
    drawScore();
    drawLives();
    [...particles, ...ravens, ...explosions].forEach((object) =>
      object.update(deltatime)
    );
    [...particles, ...ravens, ...explosions].forEach((object) => object.draw());
    ravens = ravens.filter((object) => !object.markedForDeletion);
    explosions = explosions.filter((object) => !object.markedForDeletion);
    particles = particles.filter((object) => !object.markedForDeletion);

    requestAnimationFrame(animate);
  } else {
    drawGameOver();
  }
}

function stopGame() {
  gameOver = true;
}

animate(0);

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.href = "nameinput.html";
});

const mainMenuButton = document.querySelector(".main");
mainMenuButton.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.href = "index.html";
});



// function drawGameOver() {
//   const overlay = document.querySelector(".overlay");
//   if (!overlay) {
//     console.error("Overlay not found");
//     return;
//   }
//   overlay.style.display = "flex";

//   const nameElement = document.querySelector(".name");
//   const nnameElement = document.querySelector(".nname");
//   const yourscoreElement = document.querySelector(".yourscore");

//   if (!nameElement || !nnameElement || !yourscoreElement) {
//     console.error("One or more elements not found");
//     return;
//   }

//   const username = sessionStorage.getItem("username");
//   const nickname = sessionStorage.getItem("nickname");

//   nameElement.textContent = "Name: " + username;
//   nnameElement.textContent = "Nickname: " + nickname;
//   yourscoreElement.textContent = "Your Score: " + score;
// }
