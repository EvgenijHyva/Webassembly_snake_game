async function init() {
	const wasmFileUrl = "fileURL";

	const resp = await fetch(wasmFileUrl);
	const buffer = await resp.arrayBuffer(); // for webasembly used Buffer 

	const wasm = await WebAssembly.instantiate(buffer);
}


window.onload = init();

// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html