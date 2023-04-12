import "./styles.css";
import init, { WorldMap } from "snake_game";

init().then(_ => {
	const canvas = <HTMLCanvasElement> document.getElementById("snake-game-canvas");
	const ctx = canvas.getContext("2d");
	
	const CELL_SIZE = 100; // px
	const MAP_SIZE = 8;
	const SNAKE_SPAWN_IDX = Math.floor(Math.random() * MAP_SIZE * MAP_SIZE);
	const SPEED = 1500; // ms

	const map = WorldMap.new(MAP_SIZE, SNAKE_SPAWN_IDX);

	const lineLength = MAP_SIZE * CELL_SIZE;

	canvas.height = lineLength;
	canvas.width = lineLength;

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
		const snakeIdx = map.snake_head_index();
		const xCoord = (snakeIdx %  MAP_SIZE) * CELL_SIZE;
		const yCoord = Math.floor(snakeIdx / MAP_SIZE) * CELL_SIZE;
		
		ctx.beginPath();
		ctx.fillRect(xCoord, yCoord, CELL_SIZE , CELL_SIZE); // will draw starting from (x,y) coord
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