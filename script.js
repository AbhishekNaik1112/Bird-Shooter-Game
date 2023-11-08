document.getElementById("Play").addEventListener("click", function () {
    window.location.href = "game.html";
});

document.getElementById("HowToPlay").addEventListener("click", function () {
    window.location.href = "howtoplay.html";
});

document.getElementById("About").addEventListener("click", function () {
    window.location.href = "about.html";
});

document.getElementById("Back").addEventListener("click", function () {
    window.location.href = "index.html";
});
// /** @type {HTMLCanvasElement} */
// const canvas = document.getElementById("canvas1");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const collisionCanvas = document.getElementById("collisionCanvas");
// const collisionCtx = collisionCanvas.getContext("2d");
// collisionCanvas.width = window.innerWidth;
// collisionCanvas.height = window.innerHeight;

// let timeToNextRaven = 0;
// let ravenInterval = 500;
// let lastTime = 0;
// let gameOver = false;
// let particles = [];
// let explosions = [];

// let ravens = [];

// class Raven {
//   constructor() {
//     this.spriteWidth = 271;
//     this.spriteHeight = 194;
//     this.sizeModifier = Math.random() * 0.6 + 0.4;
//     this.width = this.spriteWidth * this.sizeModifier;
//     this.height = this.spriteHeight * this.sizeModifier;
//     this.x = canvas.width;
//     this.y = Math.random() * (canvas.height - this.height);
//     this.directionX = Math.random() * 5 + 3;
//     this.directionY = Math.random() * 5 - 2.5;
//     this.markedForDeletion = false;
//     this.image = new Image();
//     this.image.src = "assets/raven.png";
//     this.frame = 0;
//     this.maxFrame = 4;
//     this.timeSinceFlap = 0;
//     this.flapInterval = Math.random() * 50 + 50;
//     this.randomColors = [
//       Math.floor(Math.random() * 255),
//       Math.floor(Math.random() * 255),
//       Math.floor(Math.random() * 255),
//     ];
//     this.color =
//       "rgb(" +
//       this.randomColors[0] +
//       "," +
//       this.randomColors[1] +
//       "," +
//       this.randomColors[2] +
//       ")";
//     this.hasTrail = Math.random() > 0.5;
//   }
//   update(deltatime) {
//     if (this.y < 0 || this.y > canvas.height) {
//       this.directionY = this.directionY * -1;
//     }
//     this.x -= this.directionX;
//     this.y -= this.directionY;
//     if (this.x < 0 - this.width) this.markedForDeletion = true;
//     this.timeSinceFlap += deltatime;
//     if (this.timeSinceFlap > this.flapInterval) {
//       if (this.frame > this.maxFrame) this.frame = 0;
//       else this.frame++;
//       this.timeSinceFlap = 0;
//       if (this.hasTrail) {
//         for (let i = 0; i < 5; i++) {
//           particles.push(new Particle(this.x, this.y, this.width, this.color));
//         }
//       }
//     }
//     if (this.x < 0 - this.width) gameOver = true;
//   }
//   draw() {
//     collisionCtx.fillStyle = this.color;
//     collisionCtx.fillRect(this.x, this.y, this.width, this.height);
//     ctx.drawImage(
//       this.image,
//       this.frame * this.spriteWidth,
//       0,
//       this.spriteWidth,
//       this.spriteHeight,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//   }
// }

// function animate(timestamp) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
//   let deltatime = timestamp - lastTime;
//   lastTime = timestamp;
//   timeToNextRaven += deltatime;
//   if (timeToNextRaven > ravenInterval) {
//     ravens.push(new Raven());
//     timeToNextRaven = 0;
//     ravens.sort(function (a, b) {
//       return a.width - b.width;
//     });
//   }
//   [...particles, ...ravens, ...explosions].forEach((object) =>
//     object.update(deltatime)
//   );
//   [...particles, ...ravens, ...explosions].forEach((object) => object.draw());
//   ravens = ravens.filter((object) => !object.markedForDeletion);
//   explosions = explosions.filter((object) => !object.markedForDeletion);
//   particles = particles.filter((object) => !object.markedForDeletion);

//   if (!gameOver) requestAnimationFrame(animate);
// }

// animate(0);
