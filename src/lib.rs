use wasm_bindgen::prelude::*;

// exporting into webassembly 
#[wasm_bindgen]
pub fn greet(name: &str) {
	println!("Hi {}", name);
}