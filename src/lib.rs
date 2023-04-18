use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Memory optimizations
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen(module = "/front/utils/rnd.js")]
extern {
	fn rnd(num: usize) -> usize;
	fn now() -> usize;
}


#[wasm_bindgen]
pub struct WorldMap {
	size: usize,
	snake: Snake,
	next_cell: Option<SnakeCell>,
	reward_cell: RewardCell,
	status: Option<GameStatus>,
	points: usize,
	steps: usize,
	bonus_points: usize,
	_steps: usize,
	trap_steps: usize,
	trap_cell: Option<TrapCell>
}

#[wasm_bindgen]
impl WorldMap {
	pub fn new(size: usize, snake_idx: usize) -> WorldMap {
		let snake_body_size: usize = 3;
		let snake = Snake::new(snake_idx, snake_body_size);
		let reward_cell: RewardCell = WorldMap::generate_reward_cell(size * size, &snake.body);

		let trap_steps = now() % size + 2;

		WorldMap {
			size,
			snake,
			next_cell: Option::None,
			reward_cell,
			status: Option::None,
			points: 0,
			steps: 10,
			bonus_points: 0,
			_steps: 7,
			trap_steps,
			trap_cell: Option::None,
		}
	}

	fn generate_trap_cell(max: usize, snake_body: &Vec<SnakeCell>) -> TrapCell {
		let mut trap_cell_idx: usize;
		loop {
			trap_cell_idx = rnd(max);
			if !snake_body.contains(&SnakeCell(trap_cell_idx)) {
				break;
			}
		}
		TrapCell(trap_cell_idx, 5)
	}

	fn generate_reward_cell(max: usize, snake_body: &Vec<SnakeCell>) -> RewardCell {
		// guard, insure the reward dont generate in snake body
		let mut reward_cell_idx: usize;
		loop { 
			reward_cell_idx = rnd(max);
			if !snake_body.contains(&SnakeCell(reward_cell_idx)) {
				break;
			}
		}
		let reward_type: RewardType = WorldMap::define_reward_type(snake_body.len());
		let points: usize = WorldMap::define_reward_points(snake_body, reward_type);
		let reward_cell: RewardCell = RewardCell::new(reward_cell_idx, reward_type, points);
		reward_cell
	}

	fn define_reward_type(num: usize) -> RewardType {
		match num {
			0..=7 => RewardType::Yellow,
			8..=12 => RewardType::Red,
			13..=18 => RewardType::Blue,
			_ => RewardType::Black
		}
	}

	pub fn trap_steps(&self) -> usize {
		self.trap_steps
	}

	pub fn trap_cell_idx(&self) -> usize {
		match self.trap_cell {
			None => 0,
			Some(trap_cell) => trap_cell.0
		}
	}

	pub fn destroy_trap_cell(&self) {
		
	}

	fn define_reward_points(snake_body: &Vec<SnakeCell>, reward_type: RewardType) -> usize {
		let points: usize = snake_body.len();
		match reward_type {
			RewardType::Yellow => points,
			RewardType::Red => points + points * 2,
			RewardType::Blue => points + points * 3,
			RewardType::Black => points + points * 4 + 55,
		}
	}

	fn reduce_points(&mut self) {
		self.reward_cell.points -= self.reward_cell.points / 3;
		self.steps += self._steps;
	}

	fn increase_points(&mut self, bonus: usize) {
		self.bonus_points += bonus;
		self.points += bonus;
	}

	pub fn points(&self) -> usize {
		self.points
	}

	pub fn bonus_stat(&self) -> usize {
		self.bonus_points
	}

	pub fn comming_bonus_by_steps(&self) -> usize {
		if self.steps > self._steps {
			self.steps
		} else {
			0
		}
	}

	pub fn get_reward_color(&self) -> String {
		match self.reward_cell.reward_type {
			Some(RewardType::Yellow) => String::from("#FFEAAE"),
			Some(RewardType::Red) => String::from("chocolate"),
			Some(RewardType::Blue) => String::from("blueviolet"),
			Some(RewardType::Black) => String::from("brown"),
			_ => String::from("cadetblue")
		}
	} 

	pub fn get_reward_points(&self) -> usize {
		self.reward_cell.points
	}

	pub fn add_points(&mut self) {
		self.points += self.reward_cell.points;
	}

	pub fn start_game(&mut self) {
		self.status = Some(GameStatus::Played);
	}

	pub fn game_status(&self) -> Option<GameStatus> {
		self.status
	}

	pub fn game_status_text(&self) -> String {
		match self.status {
			Some(GameStatus::Won) => String::from("You have won!"),
			Some(GameStatus::Lost) => String::from("You have lost!"),
			Some(GameStatus::Played) => String::from("Game ongoing"),
			None => String::from("Pause")
		}
	}

	pub fn reward_cell_idx(&self) -> usize {
		self.reward_cell.idx
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

	pub fn get_steps(&self) -> usize {
		self.steps
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
		match self.status {
			Some(GameStatus::Played) => {
				self.steps -= 1;
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
				let snake_len: usize = self.snake_length();
				for i in 1..snake_len {
					self.snake.body[i] = SnakeCell(temp[i-1].0);
				}
				
				if self.steps == 0 {
					self.reduce_points();
				}


				if self.snake.body[1..snake_len].contains(&self.snake.body[0]) {
					self.status = Some(GameStatus::Lost);
				}

				// consuming reward cell
				if Some(self.reward_cell_idx()) == Some(self.snake_head_index()) {
					let bonus = self.comming_bonus_by_steps();
					if bonus != 0 {
						self.increase_points(bonus + 1);
					}
					self.steps += self._steps;
					self.add_points();
					if self.snake_length() < self.get_2d_size() {
						self.reward_cell = WorldMap::generate_reward_cell(self.get_2d_size(), &self.snake.body);
					} else {  // win condition
						self.status = Some(GameStatus::Won)
					}
					self.snake.body.push(SnakeCell(self.snake.body[1].0));
				}
			},
			None => {

			},
			_ => { // all other

			}
		}
	}
}

#[derive(Clone, Copy, PartialEq)]
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
#[derive(Clone, Copy)]
pub struct RewardCell {
	idx: usize,
	reward_type: Option<RewardType>,
	points: usize
}

#[wasm_bindgen]
impl RewardCell {
	fn new(idx: usize, reward_type: RewardType, points: usize) -> RewardCell {
		RewardCell { 
			idx, 
			reward_type: Some(reward_type),
			points
		}
	}
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct TrapCell(usize, usize);

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
	Up, Right, Down, Left
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum  GameStatus {
	Won, Lost, Played
}

#[wasm_bindgen]
#[derive(PartialEq, Clone, Copy)]
pub enum RewardType {
	Yellow, Red, Blue, Black
}