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

	pub fn set_size(&mut self, new_size: usize) {
		self.size = new_size;
	}
}