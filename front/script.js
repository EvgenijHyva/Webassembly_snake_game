import "./styles.css";
import init, { WorldMap, greet } from "snake_game";

init().then(_ => {
	const canvas = document.getElementById("snake-game-canvas");
	const ctx = canvas.getContext("2d");
	
	const CELL_SIZE = 100; // px

	const map = WorldMap.new();
	map.set_size(8);
	const mapSize = map.size();

	const lineLength = mapSize * CELL_SIZE;

	canvas.height = lineLength;
	canvas.width = lineLength;

	function drawMap() {
		ctx.beginPath();
		// drow columns
		for(let x = 0; x < mapSize + 1; x++) {
			const line = CELL_SIZE * x;
			ctx.moveTo(line, 0);
			ctx.lineTo(line, lineLength)
		}
		// drow rows
		for(let y = 0; y < mapSize + 1; y++) {
			const line = CELL_SIZE * y;
			ctx.moveTo(0, line);
			ctx.lineTo(lineLength, line);
		}
		ctx.stroke();
	}
	
	function drawSnake() {
		const snakeIdx = map.snake_head_index();
		const xCoord = (snakeIdx %  mapSize) * CELL_SIZE;
		const yCoord = Math.floor(snakeIdx / mapSize) * CELL_SIZE;
		
		ctx.beginPath();
		ctx.fillRect(xCoord, yCoord, CELL_SIZE , CELL_SIZE); // will draw starting from (x,y) coord
		ctx.stroke();
	}

	function paint() {
		drawMap();
		drawSnake();
	}

	function update() {
		setTimeout(()=> {
			ctx.clearRect(0,0, canvas.width, canvas.height); // cleaning canvas
			map.update();
			paint();
			requestAnimationFrame(update);
		}, 1000)
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