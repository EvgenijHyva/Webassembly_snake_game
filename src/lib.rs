use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Memory optimizations
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct WorldMap {
	size: usize,
	snake: Snake
}

#[wasm_bindgen]
impl WorldMap {
	pub fn new() -> WorldMap {
		WorldMap {
			size: 10,
			snake: Snake::new(10)
		}
	}

	pub fn size(&self) -> usize {
		self.size
	}

	pub fn set_size(&mut self, new_size: usize) {
		self.size = new_size;
	}

	pub fn snake_head_index(&self) -> usize {
		self.snake.body[0].0 // body vector.
	}
}

struct SnakeCell(usize);
struct Snake {
	body: Vec<SnakeCell>
}

impl Snake {
	fn new(spawn_index: usize) -> Snake {
		Snake { 
			body: vec!(SnakeCell(spawn_index)) 
		}
	}
}

