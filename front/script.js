import "./styles.css";
import init, { WorldMap, greet } from "snake_game";

init().then(_ => {
	const canvas = document.getElementById("snake-game-canvas");
	const ctx = canvas.getContext("2d");
	
	const CELL_SIZE = 25; // px

	const map = WorldMap.new();
	map.set_size(20);
	const mapSize = map.size();

	canvas.height = mapSize * CELL_SIZE;
	canvas.width = mapSize * CELL_SIZE;

	function drawMap() {
		ctx.beginPath();

		// drow columns
		for(let x = 0; x < mapSize + 1; x++) {
			ctx.moveTo(CELL_SIZE * x, 0);
			ctx.lineTo(CELL_SIZE * x, mapSize * CELL_SIZE)
		}
		// drow rows
		for(let y = 0; y < mapSize + 1; y++) {
			ctx.moveTo(0, CELL_SIZE * y);
			ctx.lineTo(mapSize * CELL_SIZE,CELL_SIZE * y )
		}

		ctx.stroke();
	}	
	drawMap();
})


// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html