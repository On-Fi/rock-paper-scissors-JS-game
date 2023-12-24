document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');

    let snakeX = 0;
    let snakeY = 0;
    let foodX = 0;
    let foodY = 0;
    let snakeSpeed = 2;
    let direction = 'right';
    let snakeBody = [];

    function update() {
        // Update snake position
        if (direction === 'right') snakeX += snakeSpeed;
        if (direction === 'left') snakeX -= snakeSpeed;
        if (direction === 'up') snakeY -= snakeSpeed;
        if (direction === 'down') snakeY += snakeSpeed;

        // Check for collisions with the walls
        if (snakeX < 0 || snakeX >= gameContainer.clientWidth || snakeY < 0 || snakeY >= gameContainer.clientHeight) {
            resetGame();
            return;
        }

        // Check for collisions with the food
        if (checkCollision(snake, food)) {
            // Move food to a new random position
            placeFood();

            // Add a new segment to the snake's body
            const newSegment = document.createElement('div');
            newSegment.classList.add('snake-segment');
            gameContainer.appendChild(newSegment);
            snakeBody.push(newSegment);
        }

        // Move the snake's body
        for (let i = snakeBody.length - 1; i > 0; i--) {
            const prevX = snakeBody[i - 1].style.left;
            const prevY = snakeBody[i - 1].style.top;
            snakeBody[i].style.left = prevX;
            snakeBody[i].style.top = prevY;
        }

        // Update the head of the snake
        snakeBody[0].style.left = `${snakeX}px`;
        snakeBody[0].style.top = `${snakeY}px`;

        // Repeat the update function
        requestAnimationFrame(update);
    }

    function placeFood() {
        // Generate random positions for the food
        foodX = Math.floor(Math.random() * (gameContainer.clientWidth - 20));
        foodY = Math.floor(Math.random() * (gameContainer.clientHeight - 20));

        // Update food position on the screen
        food.style.left = `${foodX}px`;
        food.style.top = `${foodY}px`;
    }

    function checkCollision(element1, element2) {
        // Check for collisions between two elements
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    function resetGame() {
        // Reset snake position and body
        snakeX = 0;
        snakeY = 0;
        snake.style.left = '0';
        snake.style.top = '0';

        // Remove snake body segments
        snakeBody.forEach(segment => segment.remove());
        snakeBody = [];

        // Reset food position
        placeFood();
    }

    // Add keyboard event listener for controlling the snake
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    });

    // Initialize the game
    placeFood();
    update();
});
