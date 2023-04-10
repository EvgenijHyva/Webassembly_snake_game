use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Memory optimizations
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

// Exporting into WebAssembly 
#[wasm_bindgen]
pub fn greet(name: &str) {
	println!("{}",name);
}
