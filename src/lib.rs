use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Memory optimizations
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct WorldMap {
	size: usize
}

#[wasm_bindgen]
impl WorldMap {
	pub fn new() -> WorldMap {
		WorldMap {
			size: 10
		}
	}

	pub fn size(&self) -> usize {
		self.size
	}
}