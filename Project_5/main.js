const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cabuSize = 20; // ukuran cacing dan buah
const canvasSize = 400;

let snake = [{ x: 200, y: 200 }]; // bentuk cacing awalnya
let dx = cabuSize; // bergerak ke kanan
let dy = 0;
let fruit = spawnFruit();
let score = 0;
let gameOver = false;

// buat buah secara random
function spawnFruit() {
    const x = Math.floor(Math.random() * (canvasSize / cabuSize)) * cabuSize;
    const y = Math.floor(Math.random() * (canvasSize / cabuSize)) * cabuSize;
    return { x, y };
}

// styling cacing dan buah
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // buah
    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x, fruit.y, cabuSize, cabuSize);

    // cacing
    ctx.fillStyle = "#000";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, cabuSize, cabuSize));
}

// update posisi cacing
function update() {
    if (gameOver) return;

    // posisi kepala cacing baru kalau makan buah
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // efek tabrakan ke tembok
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        gameOver = true;
        alert("YAHHH KALAH, PAOK > Point: " + score);
        return;
    }

    // efek tabrakan ke badan sendiri LOLLLLL
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver = true;
            alert("YAHHH KALAH, PAOK > Point: " + score);
            return;
        }
    }

    snake.unshift(head); // tambahkan kepala

    // efek makan buah
    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        document.getElementById("score").textContent = score;
        fruit = spawnFruit();
    } else {
        snake.pop(); // hapus ekor kalau tidak makan buah
    }
}

// Kontrol pakai keyboard
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            if (dy === 0) { dx = 0; dy = -cabuSize; }
            break;
        case "s":
            if (dy === 0) { dx = 0; dy = cabuSize; }
            break;
        case "a":
            if (dx === 0) { dx = -cabuSize; dy = 0; }
            break;
        case "d":
            if (dx === 0) { dx = cabuSize; dy = 0; }
            break;
    }
});

// Loop game
function gameLoop() {
    update();
    draw();
    if (!gameOver) setTimeout(gameLoop, 200); // gerak cacing setiap 200ms
}

gameLoop();
