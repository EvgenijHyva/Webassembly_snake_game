import "./styles.css";
import init, { WorldMap, greet } from "snake_game";

init().then(_ => {
	const canvas = document.getElementById("snake-game-canvas");
	const ctx = canvas.getContext("2d");
	
	const CELL_SIZE = 10; // px

	const map = WorldMap.new();
	const mapSize = map.size();

	canvas.height = mapSize * CELL_SIZE;
	canvas.width = mapSize * CELL_SIZE;

	function drawMap() {
		ctx.beginPath();

		for(let i = 0; i < mapSize + 1; i++) {
			ctx.moveTo()
		}

		ctx.stroke();
	}	

})


// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html