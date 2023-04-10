use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Memory optimizations
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct WorldMap {
	width: usize
}

#[wasm_bindgen]
impl WorldMap {
	pub fn new() -> WorldMap {
		WorldMap {
			width: 10
		}
	}

	pub fn width(&self) -> usize {
		self.width
	}
}