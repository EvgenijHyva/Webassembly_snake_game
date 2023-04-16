import "./styles.css";
import init, { WorldMap, Direction } from "snake_game";

init().then(wasmObj => {
	const canvas = <HTMLCanvasElement> document.getElementById("snake-game-canvas");
	const gameControlBtn = <HTMLButtonElement> document.getElementById("game-control-btn");
	const gameStatus = <HTMLDivElement> document.getElementById("game-status");
	const ctx = canvas.getContext("2d");
	
	const CELL_SIZE = 100; // px
	const MAP_SIZE = 8;
	const snakeSpawnIdx = Date.now() % (MAP_SIZE * MAP_SIZE);
	const SPEED = 1500; // ms

	const map = WorldMap.new(MAP_SIZE, snakeSpawnIdx);

	const lineLength = MAP_SIZE * CELL_SIZE;

	canvas.height = lineLength;
	canvas.width = lineLength;

	document.addEventListener("keyup", (e) => {
		switch (e.code) {
			case "KeyW":
			case "ArrowUp":
				map.change_snake_direction(Direction.Up);
				break;
			case "KeyS":
			case "ArrowDown":
				map.change_snake_direction(Direction.Down);
				break;
			case "KeyA":
			case "ArrowLeft":
				map.change_snake_direction(Direction.Left);
				break;
			case "KeyD":
			case "ArrowRight":
				map.change_snake_direction(Direction.Right);
				break;
			default:
				break;
		}
	})

	gameControlBtn.addEventListener("click", () => map.start_game())

	function drawMap() {
		ctx.beginPath();
		// drow columns
		for(let x = 0; x < MAP_SIZE + 1; x++) {
			const line = CELL_SIZE * x;
			ctx.moveTo(line, 0);
			ctx.lineTo(line, lineLength)
		}
		// drow rows
		for(let y = 0; y < MAP_SIZE + 1; y++) {
			const line = CELL_SIZE * y;
			ctx.moveTo(0, line);
			ctx.lineTo(lineLength, line);
		}
		ctx.stroke();
	}
	
	function drawSnake() {
		const snakeBodyColors = [
			{color: "lightgreen", xFactor: 0.75, yFactor: 0.7, radius: 0.09},
			{color: "pink", xFactor: 0.25, yFactor: 0.33, radius: 0.1},
			{color: "yellow", xFactor: 0.5, yFactor: 0.5, radius: 0.04},
			{color: "gray", xFactor: 0.71, yFactor: 0.4, radius: 0.13},
			{color: "gray", xFactor: 0.33, yFactor: 0.7, radius: 0.09}
		]
		const snakeCellPointer = map.snake_cells();
		const snakeLength = map.snake_length();
		const snakeCells = new Uint32Array(
			wasmObj.memory.buffer, 
			snakeCellPointer, // offset
			snakeLength // length
		);
		snakeCells.forEach((cell, i) => {
			ctx.beginPath();
			const xCoord = (cell %  MAP_SIZE) * CELL_SIZE;
			const yCoord = Math.floor(cell / MAP_SIZE) * CELL_SIZE;

			ctx.fillStyle = i === 0 ? "#7878db" : "#9100db";
			ctx.fillRect(xCoord, yCoord, CELL_SIZE, CELL_SIZE); // will draw starting from (x,y) coord
			ctx.stroke();

			ctx.beginPath();
			
			// Draw circles on top of rectangles
			snakeBodyColors.forEach(el => {
				ctx.fillStyle = el.color;
				ctx.beginPath();
				ctx.arc(xCoord + CELL_SIZE * el.xFactor, yCoord + CELL_SIZE * el.yFactor, CELL_SIZE * el.radius, 0, 2 * Math.PI);
				ctx.fill();
			})
		});
	}

	function drawReward() {
		const rewardIdx = map.reward_cell();
		const col = rewardIdx % MAP_SIZE;
		const row = Math.floor(rewardIdx / MAP_SIZE);

		ctx.beginPath();
		ctx.fillStyle = "#FFEAAE";
		ctx.arc(col * CELL_SIZE + .5 * CELL_SIZE, row * CELL_SIZE + .5 * CELL_SIZE, CELL_SIZE / 2, 0, 2 * Math.PI);
		ctx.fill();
	}

	function paint() {
		drawMap();
		drawSnake();
		drawReward();
	}

	function update() {
		const fps = 3;
		setTimeout(()=> {
			ctx.clearRect(0,0, canvas.width, canvas.height); // cleaning canvas
			map.update();
			paint();
			requestAnimationFrame(update);
		}, SPEED / fps)
	}
	paint();
	update();
})


// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html