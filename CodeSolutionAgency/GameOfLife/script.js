const gridHeight = 50; // Set grid height
const gridWidth = 50; // Set grid width
const cellSize = 10; // Size of each cell in pixels
let grid = [];
let interval = null;
const gameSpeed = 100; // Speed of the game (milliseconds)

// Initialize the grid with random states
function initializeGrid() {
    grid = new Array(gridHeight).fill(null)
        .map(() => new Array(gridWidth).fill(null)
        .map(() => Math.random() > 0.8 ? 1 : 0));
}

// Calculate the next generation based on Game of Life rules
function updateGrid() {
    const nextGrid = grid.map(arr => [...arr]);
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            let liveNeighbors = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    let ny = y + dy;
                    let nx = x + dx;
                    if (ny >= 0 && ny < gridHeight && nx >= 0 && nx < gridWidth) {
                        liveNeighbors += grid[ny][nx];
                    }
                }
            }

            const isAlive = grid[y][x] === 1;
            if (isAlive && (liveNeighbors < 2 || liveNeighbors > 3)) {
                nextGrid[y][x] = 0;
            } else if (!isAlive && liveNeighbors === 3) {
                nextGrid[y][x] = 1;
            }
        }
    }
    grid = nextGrid;
    renderGrid();
}

// Render the grid to the webpage
function renderGrid() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = '';
    grid.forEach(row => {
        const rowDiv = document.createElement('div');
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.style.width = `${cellSize}px`;
            cellDiv.style.height = `${cellSize}px`;
            cellDiv.style.inlineSize = `${cellSize}px`;
            cellDiv.style.blockSize = `${cellSize}px`;
            cellDiv.classList.add('cell', cell === 1 ? 'alive' : 'dead');
            rowDiv.appendChild(cellDiv);
        });
        gameGrid.appendChild(rowDiv);
    });
}

// User interaction handlers
document.getElementById('start-game').addEventListener('click', () => {
    if (interval === null) {
        interval = setInterval(updateGrid, gameSpeed);
    }
});

document.getElementById('pause-game').addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});

document.getElementById('reset-game').addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    initializeGrid();
    renderGrid();
});

// Initialize and render the initial grid
initializeGrid();
renderGrid();

