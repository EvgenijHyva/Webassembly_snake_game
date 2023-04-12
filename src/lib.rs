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
	pub fn new(size: usize, snake_idx: usize) -> WorldMap {
		WorldMap {
			size,
			snake: Snake::new(snake_idx)
		}
	}

	pub fn size(&self) -> usize {
		self.size
	}

	pub fn get_2d_size(&self) -> usize {
		self.size * self.size
	}

	pub fn set_size(&mut self, new_size: usize) {
		self.size = new_size;
	}

	pub fn snake_head_index(&self) -> usize {
		self.snake.body[0].0 // body vector.
	}

	pub fn update(&mut self) {
		let snake_idx: usize = self.snake_head_index();
		let row: usize = snake_idx / self.size;
		let col: usize = snake_idx % self.size;

		if self.snake.direction == Direction::Right { // increasing index + 1
			let nex_col: usize = (col + 1) % self.size;
			self.snake.body[0].0 = (row * self.size) + nex_col;
		}
		if self.snake.direction == Direction::Left { // decreasing index - 1
			let prev_col: usize = (col - 1) % self.size;
			self.snake.body[0].0 = (row * self.size) + prev_col;
		}
		if self.snake.direction == Direction::Up { // decreasing index - size
			let prev_row: usize = (row - 1) % self.size;
			self.snake.body[0].0 = (prev_row * self.size) + col;
		}
		if self.snake.direction == Direction::Down { // increasing index + size
			let next_row: usize = (row + 1) % self.size;
			self.snake.body[0].0 = (next_row * self.size) + col;
		}
	}
}

struct SnakeCell(usize);
struct Snake {
	body: Vec<SnakeCell>,
	direction: Direction
}

impl Snake {
	fn new(spawn_index: usize) -> Snake {
		Snake { 
			body: vec!(SnakeCell(spawn_index)),
			direction: Direction::Down
		}
	}
}

#[derive(PartialEq)]
enum Direction {
	Up, Right, Down, Left
}
