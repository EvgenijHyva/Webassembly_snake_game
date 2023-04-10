import "./styles.css";
import init, { WorldMap, greet } from "snake_game";
const canvas = document.getElementById("snake-game-canvas");
const ctx = canvas.getContext("2d");

init().then(_ => {
	const map = WorldMap.new();
	console.log(map.width())
})


// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html