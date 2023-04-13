import "./styles.css";
import init, { WorldMap, Direction } from "snake_game";

init().then(wasmObj => {
	const canvas = <HTMLCanvasElement> document.getElementById("snake-game-canvas");
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
		const snakeCellPointer = map.snake_cells();
		const snakeLength = map.snake_length();
		const snakeCells = new Uint32Array(
			wasmObj.memory.buffer, 
			snakeCellPointer, // offset
			snakeLength // length
		);
		
		ctx.beginPath();
		snakeCells.forEach((cell, i) => {
			const xCoord = (cell %  MAP_SIZE) * CELL_SIZE;
			const yCoord = Math.floor(cell / MAP_SIZE) * CELL_SIZE;

			ctx.fillStyle = i === 0 ? "#7878db" : "#9100db";
			ctx.fillRect(xCoord, yCoord, CELL_SIZE , CELL_SIZE); // will draw starting from (x,y) coord
		});

		ctx.stroke();
	}

	function paint() {
		drawMap();
		drawSnake();
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