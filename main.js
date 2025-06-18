// Inicializa o canvas e o contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações iniciais
const gridSize = 20; // Tamanho de cada célula
const canvasSize = 400; // Tamanho do canvas
let snake = [{x: 160, y: 160}]; // Corpo da cobra (começa com 1 célula)
let direction = 'RIGHT'; // Direção inicial
let food = generateFood(); // Posição inicial da comida
let score = 0;

// Função principal do jogo
function gameLoop() {
    // Atualiza a posição da cobra
    moveSnake();
    
    // Verifica se a cobra colidiu com ela mesma ou as bordas
    if (checkCollisions()) {
        gameOver();
        return;
    }

    // Verifica se a cobra comeu a comida
    if (checkFoodCollision()) {
        score++;
        food = generateFood();
    } else {
        // Remove a última parte da cobra se não comer comida
        snake.pop();
    }

    // Atualiza a tela
    drawGame();
    setTimeout(gameLoop, 100); // Chama o loop a cada 100ms
}

// Função que desenha o jogo (cobra e comida)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Desenha a cobra
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Atualiza a pontuação
    document.getElementById("score").textContent = `Pontuação: ${score}`;
}

// Função que move a cobra de acordo com a direção
function moveSnake() {
    let head = {...snake[0]}; // Cria uma cópia da cabeça da cobra

    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;

    snake.unshift(head); // Adiciona a nova cabeça no início

    // Se a cobra não comer a comida, remove o último segmento
    if (!checkFoodCollision()) {
        snake.pop();
    }
}

// Função que verifica se a cobra colidiu com ela mesma ou com as bordas
function checkCollisions() {
    const head = snake[0];

    // Colisão com as bordas
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Colisão com o corpo da cobra
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Função que verifica se a cobra comeu a comida
function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

// Função que gera a comida em uma posição aleatória
function generateFood() {
    let x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return {x, y};
}

// Função que finaliza o jogo
function gameOver() {
    alert(`Fim de Jogo! Sua pontuação foi: ${score}`);
    snake = [{x: 160, y: 160}]; // Reseta a cobra
    direction = 'RIGHT'; // Reseta a direção
    score = 0; // Reseta a pontuação
    food = generateFood(); // Gera uma nova comida
    gameLoop(); // Reinicia o jogo
}

// Função para lidar com as teclas pressionadas
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Inicia o jogo
gameLoop();


