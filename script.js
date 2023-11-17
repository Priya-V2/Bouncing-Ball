const canvas = document.querySelector(".my-canvas"),
  context = canvas.getContext("2d"),
  width = window.innerWidth,
  height = window.innerHeight;

let bounceCount = 0;

canvas.width = width;
canvas.height = height;

const mouse = {
  x: 100,
  y: 100,
  velX: 8,
  velY: 8,
  radius: 30,
  startAngle: 0,
  endAngle: Math.PI * 2,
};

// reset-button
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.addEventListener("click", function () {
  bounceCount = 0;
  console.log("Bounces reset!");
});

// reset-button style
resetButton.style.position = "fixed";
resetButton.style.top = `100px`;
resetButton.style.left = `48%`;
resetButton.style.border = "none";
resetButton.style.padding = "6px";
resetButton.style.fontSize = "16px";
resetButton.style.fontWeight = "600";
resetButton.style.borderRadius = "6px";
resetButton.style.backgroundColor = "#fff";

// appends reset-button to body
document.body.appendChild(resetButton);

// co-ordinates of the click event
canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  drawCircle();
});

// inserts image
const ballImage = new Image();
ballImage.src = "ball.png";

// draws the image and inserts the text for bouncing counter
let drawCircle = function () {
  context.drawImage(
    ballImage,
    mouse.x - mouse.radius,
    mouse.y - mouse.radius,
    mouse.radius * 2,
    mouse.radius * 2
  );

  context.fillStyle = "#fff";
  context.font = "26px Arial";
  const text = `Bounces: ${bounceCount}`;
  const textWidth = context.measureText(text).width;
  const x = (canvas.width - textWidth) / 2;
  context.fillText(text, x, 70);
};

// clears the canvas and update the ball in its new position
function animate() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  drawCircle();
  update();
  requestAnimationFrame(animate);
}

// implement the ball bouncing logic
let update = function () {
  mouse.x += mouse.velX;
  mouse.y += mouse.velY;

  if (mouse.x + mouse.radius >= width || mouse.x + mouse.radius <= 0) {
    mouse.velX = -mouse.velX;
    bounceCount++;
    console.log(bounceCount);
  }

  if (mouse.y + mouse.radius >= height || mouse.y + mouse.radius <= 0) {
    mouse.velY = -mouse.velY;
    bounceCount++;
    console.log(bounceCount);
  }
};

//calling the animate function
animate();
