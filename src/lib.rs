use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Memory optimizations
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen(module = "/front/utils/rnd.js")]
extern {
	fn rnd(num: usize) -> usize;
}


#[wasm_bindgen]
pub struct WorldMap {
	size: usize,
	snake: Snake,
	next_cell: Option<SnakeCell>,
	reward_cell: usize
}

#[wasm_bindgen]
impl WorldMap {
	pub fn new(size: usize, snake_idx: usize) -> WorldMap {
		let snake_body_size: usize = 3;
		let reward_cell_idx: usize = rnd(size * size);
		WorldMap {
			size,
			snake: Snake::new(snake_idx, snake_body_size),
			next_cell: Option::None,
			reward_cell: reward_cell_idx,
		}
	}

	pub fn reward_cell(&self) -> usize {
		self.reward_cell
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
		let next_cell = self.generate_next_snake_cell(&direction);

		if self.snake.body[1].0 == next_cell.0 {
			return;
		}
		self.next_cell = Option::Some(next_cell);

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

	fn generate_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
		let snake_idx = self.snake_head_index();
		let row = snake_idx / self.size;

		return match direction {
			Direction::Right => { 
				SnakeCell((row * self.size) + (snake_idx + 1) % self.size)
			},
			Direction::Left => { 
				SnakeCell((row * self.size) + (snake_idx - 1) % self.size)
			},
			Direction::Up => { 
				SnakeCell((snake_idx - self.size) % self.get_2d_size())
			},
			Direction::Down => { 
				SnakeCell((snake_idx + self.size) % self.get_2d_size())
			},
		};
	}

	pub fn update(&mut self) {
		let temp = self.snake.body.clone(); // need to use derive(Clone) for cloning

		match self.next_cell {
			Option::Some(cell) => {
				self.snake.body[0] = cell; // head
				self.next_cell = Option::None;
			},
			Option::None => {
				self.snake.body[0] = self.generate_next_snake_cell(&self.snake.direction);
			}
		}	

		let snake_len = self.snake_length();
		for i in 1..snake_len {
			self.snake.body[i] = SnakeCell(temp[i-1].0);
		}
	}
}

#[derive(Clone, Copy)]
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
