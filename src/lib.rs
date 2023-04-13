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
		let snake_body_size = 3;
		WorldMap {
			size,
			snake: Snake::new(snake_idx, snake_body_size)
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

	pub fn change_snake_direction(&mut self, direction: Direction) {
		self.snake.direction = direction
	}

	// can't return a reference to JS its not allowed
	// *const is raw pointer
	// borrowing rules not apply to it -> solution
	// (not considered to be save that much as references, but its necessary if working with interoperations between different langs)
	pub fn snake_cells(&self) -> *const SnakeCell { // working with pointers
		self.snake.body.as_ptr()
	}

	pub fn snake_length(&self) -> usize {
		self.snake.body.len()
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

pub struct SnakeCell(usize);
struct Snake {
	body: Vec<SnakeCell>,
	direction: Direction
}

impl Snake {
	fn new(spawn_index: usize, size: usize) -> Snake {
		let mut body:Vec<SnakeCell> = vec!();
		
		for i in 0..size {
			body.push(SnakeCell(spawn_index - i));
		}

		Snake { 
			body,
			direction: Direction::Up
		}
	}
}
#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
	Up, Right, Down, Left
}
