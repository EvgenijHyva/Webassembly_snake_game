async function init() {
	const byteArray = new Int8Array();
	const wasm = await WebAssembly.instantiate(byteArray.buffer);
}


window.onload = init();

// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html