let gameStarted = false;
let score = 0;
let timer = 30;
let intervalTimer;
let snowflakes = document.querySelectorAll(".snowflake");
let startButton = document.getElementById("startButton");
let scoreDisplay = document.getElementById("score");
let timerDisplay = document.getElementById("timer");
let snowflakeArea = document.getElementById("snowflakeArea");
let startModal = document.getElementById("startModal");

// Function to start the game
function startGame() {
	console.log("Start");
	if (!gameStarted) {
		gameStarted = true;
		score = 0;
		timer = 30;
		scoreDisplay.textContent = `Score: ${score}`;
		timerDisplay.textContent = `${timer}`;

		// Hide the modal and show the game
		startModal.style.visibility = "hidden";
		startModal.style.opacity = "0";

		// Start the timer
		intervalTimer = setInterval(updateTimer, 1000);

		// Start the snowflakes with a slight delay to ensure the DOM is ready
		setTimeout(() => {
			snowflakes.forEach((snowflake) => {
				snowflake.style.animationPlayState = "running"; // Start the animation
			});
		}, 100);

		// Add event listener to catch snowflakes
		snowflakes.forEach((snowflake) => {
			snowflake.addEventListener("click", catchSnowflake);
		});
	}
}

// Function to catch a snowflake
function catchSnowflake(event) {
	score++;
	scoreDisplay.textContent = `Score: ${score}`;

	// Reset the snowflake animation
	const snowflake = event.target;
	snowflake.style.animation = "none";
	snowflake.offsetHeight;
	snowflake.style.animation = "";
	snowflake.style.top = `-${Math.random() * 100}px`;
	snowflake.style.left = `${Math.random() * 100}%`;

	// Make the snowflake bigger and visible
	snowflake.style.opacity = "1";

	// Resume the animation after a delay
	setTimeout(() => {
		snowflake.style.fontSize = "";
		snowflake.style.opacity = "0.8";
	}, 300);
}

// Function to update the timer
function updateTimer() {
	if (timer > 0) {
		timer--;
		timerDisplay.textContent = `${timer}`;
	} else {
		// Stop the game when the timer reaches 0
		clearInterval(intervalTimer);
		showEndModal();
	}
}

// Function to show the end modal with the score
function showEndModal() {
	// Show the end modal
	startModal.style.visibility = "visible";
	startModal.style.opacity = "1";
	startModal.querySelector(
		"h2"
	).textContent = `Wow! You caught ${score} snowflakes!`;
	startModal.querySelector("p").textContent =
		"Thank you for helping Santa prepare for his journey!";
	startModal.querySelector("button").textContent = "Keep helping Santa!";
	startModal.querySelector("span").textContent =
		"Stop and deprive the world of a joyful Christmas... 😭";

	// Reset the game if the player clicks Try Again
	startButton.addEventListener("click", resetGame);
}

// Reset the game
function resetGame() {
	gameStarted = false;
	// Hide the end modal
	startModal.style.visibility = "hidden";
	startModal.style.opacity = "0";

	// Stop the snowflakes' animation and reset the score and timer
	snowflakes.forEach((snowflake) => {
		snowflake.style.animationPlayState = "paused"; // Pause the snowflakes
	});

	// Reset values
	score = 0;
	timer = 30;
	scoreDisplay.textContent = `Score: ${score}`;
	timerDisplay.textContent = `${timer}`;

	// Relaunch the game
	startGame();
}

// Add an event listener to the start button
startButton.addEventListener("click", startGame);

// Function to update the countdown
function updateCountdown() {
	const countdownElement = document.getElementById("countdown");

	// Target date: December 25, 2024 at 00:00
	const targetDate = new Date("December 25, 2024 00:00:00").getTime();

	// Current date
	const now = new Date().getTime();

	// Calculate remaining time
	const distance = targetDate - now;

	// Calculate days, hours, minutes, and seconds
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

	// Display the countdown
	countdownElement.textContent = `Santa's departure in ${days} days, ${hours} hours, and ${minutes} minutes`;

	// If the countdown is over
	if (distance < 0) {
		clearInterval(interval);
		countdownElement.textContent =
			"It's Christmas! Santa has left on his sleigh. Thank you for helping him.";
	}
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// Initialize the countdown
updateCountdown();