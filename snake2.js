var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var score = 0;
var speed_value = 8;
var snakeX = 160;
var snakeY = 160;
var snakeDX = grid;
var snakeDY = 0;
var snakeCells = [];
var snakeMaxCells = 4;
var food = {
    x: 320,
    y: 320
};

function snake_reset() {
    snakeX = 160,
        snakeY = 160,
        snakeCells = [],
        snakeMaxCells = 4,
        snakeDX = grid,
        snakeDY = 0,
        food.x = getRandomInt(0, 25) * grid,
        food.y = getRandomInt(0, 25) * grid,
        score = 0;
    document.getElementById("score1").innerHTML = score;
    return;
}
// Thanks Holly Stackoverflow
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // get random whole numbers in a specific range
}
// game loop
function loop() {
    requestAnimationFrame(loop);
    if (++count < speed_value) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // move snake by it's velocity
    snakeX += snakeDX;
    snakeY += snakeDY;
    // wrap snake position horizontally on edge of screen
    if (snakeX < 0) {
        snakeX = canvas.width - grid;
    } else if (snakeX >= canvas.width) {
        snakeX = 0;
    }
    // wrap snake position vertically on edge of screen
    if (snakeY < 0) {
        snakeY = canvas.height - grid;
    } else if (snakeY >= canvas.height) {
        snakeY = 0;
    }
    snakeCells.unshift({
        x: snakeX,
        y: snakeY
    }); // keep track of where snake has been. front of the array is always the head
    if (snakeCells.length > snakeMaxCells) { // remove cells as we move away from them
        snakeCells.pop();
    }
    context.fillStyle = 'red'; // draw food
    context.fillRect(food.x, food.y, grid - 1, grid - 1);
    context.fillStyle = 'green'; // draw snake one cell at a time
    snakeCells.forEach(function (cell, index) {
        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // snake ate food
        if (cell.x === food.x && cell.y === food.y) {
            snakeMaxCells++;
            score += 10;
            document.getElementById("score1").innerHTML = score;
            // canvas is 400x400 which is 25x25 grids
            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;
        }
        if (score >= 50) {
            speed_value = 6;
        }
        if (score >= 100) {
            speed_value = 4;
        }
        // check collision with all cells after this one (modified bubble sort)
        for (var i = index + 1; i < snakeCells.length; i++) {
            // snake occupies same space as a body part. reset game
            if (cell.x === snakeCells[i].x && cell.y === snakeCells[i].y) {
                snake_reset();
            }
        }
    });
}
// listen to keyboard events to move the snake
document.addEventListener('keydown', function (key) {
    // left arrow key
    if ((key.which === 37 || key.which === 65) && snakeDX === 0) {
        snakeDX = -grid;
        snakeDY = 0;
    }
    // up arrow key
    else if ((key.which === 38 || key.which === 87) && snakeDY === 0) {
        snakeDY = -grid;
        snakeDX = 0;
    }
    // right arrow key
    else if ((key.which === 39 || key.which == 68) && snakeDX === 0) {
        snakeDX = grid;
        snakeDY = 0;
    }
    // down arrow key
    else if ((key.which === 40 || key.which == 83) && snakeDY === 0) {
        snakeDY = grid;
        snakeDX = 0;
    }
});
// start the game
requestAnimationFrame(loop);
