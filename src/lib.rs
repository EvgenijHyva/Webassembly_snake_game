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

	fn cell_to_index(&self, row: usize, col: usize) -> usize {
		(row * self.size) + col
	}

	fn index_to_cell(&self, idx: usize) -> (usize, usize) {
		(idx / self.size, idx % self.size)
	}

	fn set_snake_head(&mut self, idx: usize) {
		self.snake.body[0].0 = idx;
	}

	pub fn update(&mut self) {
		let snake_idx: usize = self.snake_head_index();
		let (row, col) = self.index_to_cell(snake_idx);
		let (calc_row, calc_col) = match self.snake.direction {
			Direction::Right => { // increasing index + 1
				(row, (col + 1) % self.size)
			},
			Direction::Left => { // decreasing index - 1
				(row, (col - 1) % self.size)
			},
			Direction::Up => { // decreasing index - size
				((row - 1) % self.size, col)
			},
			Direction::Down => { // increasing index + size
				((row + 1) % self.size, col)
			},
		};

		let next_idx = self.cell_to_index(calc_row, calc_col);
		self.set_snake_head(next_idx);
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
			direction: Direction::Up
		}
	}
}

#[derive(PartialEq)]
enum Direction {
	Up, Right, Down, Left
}
