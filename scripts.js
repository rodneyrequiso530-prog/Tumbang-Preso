let slipper = document.getElementById("slipper");
let can = document.getElementById("can");
let scoreElement = document.getElementById("score");
let timerElement = document.getElementById("timer");
let powerBar = document.getElementById("power");
let score = 0;
let timeLeft = 30;
let isThrowing = false;
let throwPower = 0;
let timerInterval;
let moveCanInterval;
let slipperThrowingSound = new Audio('slipper_throw.mp3');  // Add your own sound file
let canFallSound = new Audio('can_fall.mp3');  // Add your own sound file

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(moveCanInterval);
            alert("Game Over! Final Score: " + score);
            resetGame();
        }
    }, 1000);
}

// Function to make the can move
function moveCan() {
    moveCanInterval = setInterval(() => {
        let randomX = Math.floor(Math.random() * (350 - 50)) + 50; // Can moves horizontally
        can.style.left = randomX + "px";
    }, 2000);  // Move every 2 seconds
}

// Function to throw the slipper
function throwSlipper(event) {
    if (isThrowing || timeLeft <= 0) return;
    isThrowing = true;
    slipperThrowingSound.play();

    let slipperPosX = slipper.offsetLeft;
    let slipperPosY = slipper.offsetTop;
    let distance = throwPower * 10;

    let slipperThrow = setInterval(() => {
        slipperPosY -= 5;
        slipper.style.top = slipperPosY + 'px';

        // Check if slipper hits the can
        if (slipperPosX >= can.offsetLeft && slipperPosX <= can.offsetLeft + can.offsetWidth &&
            slipperPosY <= can.offsetTop + can.offsetHeight) {
            clearInterval(slipperThrow);
            can.style.backgroundColor = "#000"; // simulate can falling over
            canFallSound.play();
            score++;
            scoreElement.textContent = "Score: " + score;
            resetSlipper();
        }

        // Reset if slipper reaches the top of the game area
        if (slipperPosY <= 0) {
            clearInterval(slipperThrow);
            resetSlipper();
        }
    }, 20);
}

// Function to reset the slipper
function resetSlipper() {
    setTimeout(() => {
        slipper.style.top = "20px";  // Reset slipper to the bottom
        throwPower = 0;
        powerBar.style.width = throwPower + "%";
        isThrowing = false;
    }, 500);
}

// Function to reset the game
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = "Score: " + score;
    timerElement.textContent = "Time Left: 30";
    can.style.backgroundColor = "#ff6347"; // Reset can color
    slipper.style.top = "20px";
}

// Function to increase power when the user presses mouse down
slipper.addEventListener("mousedown", () => {
    if (timeLeft > 0) {
        let powerInterval = setInterval(() => {
            if (throwPower < 100) {
                throwPower++;
                powerBar.style.width = throwPower + "%";
            }
        }, 20);
        
        slipper.addEventListener("mouseup", () => {
            clearInterval(powerInterval);
            throwSlipper();
        });
    }
});

// Start the game
startTimer();
moveCan();
