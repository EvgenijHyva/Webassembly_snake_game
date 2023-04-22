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
	trap_cell: Option<TrapCell>,
	life_steps: usize,
	super_bonus_cell: Option<SuperBonus>,
	super_bonus_steps: usize,
	consumed_rewards: usize,
	consumed_traps: usize,
	consumed_super_bonuses: usize,
	consumed_moving_targets: usize,
	moving_cell: Option<MovingTarget>,
	steps_to_moving_target: usize,
	reason: Reason,
	eaten_by_enemy: usize,
	max_snake_size:usize
}

#[wasm_bindgen]
impl WorldMap {
	pub fn new(size: usize, snake_idx: usize) -> WorldMap {
		let snake_body_size: usize = 3;
		let snake = Snake::new(snake_idx, snake_body_size);
		let reward_cell: RewardCell = WorldMap::generate_reward_cell(size * size, &snake.body);

		let trap_steps = now() % size + 2;
		let super_bonus_steps = WorldMap::gen_super_bonus_steps(size);
		let steps_to_moving_target = WorldMap::gen_moving_target_steps(size);

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
			life_steps: 0,
			super_bonus_cell: Option::None,
			super_bonus_steps,
			consumed_rewards: 0,
			consumed_traps: 0,
			consumed_super_bonuses: 0,
			consumed_moving_targets: 0,
			moving_cell: Option::None,
			steps_to_moving_target,
			reason:Reason::StillAlive,
			eaten_by_enemy: 0,
			max_snake_size: snake_body_size
		}
	}

	fn gen_moving_target_steps(size: usize) -> usize {
		rnd(size * 4) + 5
	}

	fn generate_moving_target(max: usize, snake_body: &Vec<SnakeCell>) -> MovingTarget {
		let mut cell_idx: usize;
		loop { 
			cell_idx = rnd(max);
			if !snake_body.contains(&SnakeCell(cell_idx)) {
				break;
			}
		}
		MovingTarget::new(cell_idx)
	}

	pub fn steps_to_moving_target(&self) -> usize { // test
		self.steps_to_moving_target
	}

	pub fn moving_target_life(&self) -> usize {
		if let Some(moving_target) = &self.moving_cell {
			moving_target.life
		} else {
			0
		}
	}
	pub fn moving_target_points(&self) -> usize {
		match &self.moving_cell {
			None => 0,
			Some(moving_target) => moving_target.calculate_points()
		}
	}

	pub fn moving_target_cell_idx(&self) -> usize  {
		match &self.moving_cell {
			None => 1000000,
			Some(moving_target) => moving_target.position()
		}
	}

	fn remove_moving_target(&mut self) {
		self.moving_cell = None;
		self.steps_to_moving_target = WorldMap::gen_moving_target_steps(self.size);
	}

	fn consume_moving_target(&mut self) {
		self.snake.body.push(SnakeCell(self.snake.body[1].0));
		let points = self.moving_target_points();
		self.points += points;
		self.bonus_points += points;
		self.consumed_moving_targets += 1;
		self.remove_moving_target();
	}

	fn increase_moving_cell_points(&mut self, points: usize) {
		if let Some(moving_target) = &mut self.moving_cell {
			moving_target.points += points;
		}
	}

	fn check_max_poinst(&mut self) {
		if self.snake_length() > self.max_snake_size {
			self.max_snake_size = self.snake_length();
		}
	}

	fn moving_cell_bite_snake(&mut self) {
		self.points = 0;
		self.eaten_by_enemy += 1;
		self.increase_moving_cell_points(1500);
		if let Some(moving_target) = &mut self.moving_cell {
			let cut_index: usize = moving_target.idx;
			if let Some(snake_cell) = WorldMap::find_snake_cell_index(&self.snake.body, cut_index) {
				moving_target.life += 30;
				let snake_cut_index: usize;
				if snake_cell > 4 {
					snake_cut_index = snake_cell;
				} else {
					snake_cut_index = 4;
				}
				if self.snake_length() > 4 {
					let (first_half, _) = self.snake.body.split_at_mut(snake_cut_index);
					self.snake.body = first_half.to_vec();
				} else {
					self.reason = Reason::Eaten;
					self.status = Some(GameStatus::Lost);
				}
			}
		}
	}

	fn check_moving_target_consume_trap(&mut self) {
		let trap_idx = self.trap_cell_idx();
		if let Some(moving_target) = &mut self.moving_cell {
			if moving_target.idx == trap_idx {
				if moving_target.life < 20 {
					self.moving_cell = None;
				} else {
					moving_target.points = 0;
					moving_target.life = 10;
				}
			}
		}
	}

	fn check_moving_target_consume_reward(&mut self) {
		let reward_idx = self.reward_cell_idx();
		if let Some(moving_target) = &mut self.moving_cell {
			if moving_target.idx == reward_idx {
				moving_target.life += 10;
				moving_target.points += 100;
				self.reward_cell = WorldMap::generate_reward_cell(self.get_2d_size(), &self.snake.body);
			}
		}
	}

	fn check_moving_target_consume_super_bonus(&mut self) {
		let bonus_idx = self.super_bonus_cell_idx();
		let bonus_poinst = self.super_bonus_points();
		if let Some(moving_target) = &mut self.moving_cell {
			if moving_target.idx == bonus_idx {
				moving_target.life += 15;
				moving_target.points += bonus_poinst + 300;
				self.reward_cell = WorldMap::generate_reward_cell(self.get_2d_size(), &self.snake.body);
			}
		}
	}

	fn check_moving_target(&mut self) {
		if let Some(moving_target) = &mut self.moving_cell {
			if moving_target.life == 0 {
				drop(moving_target);
				self.remove_moving_target();
				return;
			}
			if moving_target.decision_steps == 0 {
				moving_target.change_direction();
				// 
				
				let map_length = self.size;
				moving_target.next_move(map_length);
			} else {
				moving_target.decision_steps -= 1;
			}
			moving_target.decrease_life_steps();
		} else {
			if self.steps_to_moving_target == 0 {
				if self.snake_length() < self.get_2d_size() - self.size {
					self.moving_cell = Some(WorldMap::generate_moving_target(self.get_2d_size(), &self.snake.body));
				}
			} else {
				self.steps_to_moving_target -= 1;
			}
		}
	}

	fn find_snake_cell_index(snake: &[SnakeCell], idx: usize) -> Option<usize> {
		snake.iter().position(|cell| cell.0 == idx)
	}

	fn generate_super_bonus(max: usize, snake_body: &Vec<SnakeCell>) -> SuperBonus {
		let mut cell_idx: usize;
		loop { 
			cell_idx = rnd(max);
			if !snake_body.contains(&SnakeCell(cell_idx)) {
				break;
			}
		}
		let life = 5;
		SuperBonus(cell_idx, life)
	}

	pub fn super_bonus_cell_life(&self) -> usize {
		match &self.super_bonus_cell { 
			None => 0,
			Some(super_bonus_cell) => super_bonus_cell.1
		}
	}

	pub fn super_bonus_consumption(&mut self) {
		self.bonus_points += self.super_bonus_points();
		self.points += self.super_bonus_points();
		self.super_bonus_cell = None;
	}

	pub fn super_bonus_points(&self) -> usize{
		300 + self.snake_length() * 10 
	}

	fn check_super_bonus(&mut self) {
		if self.snake_head_index() == self.super_bonus_cell_idx() {
			self.super_bonus_consumption();
		}

		if let Some(super_bonus_cell) = &mut self.super_bonus_cell {
			super_bonus_cell.1 -= 1;

			if self.super_bonus_steps < super_bonus_cell.1 {
				self.super_bonus_steps = super_bonus_cell.1
			}

			if super_bonus_cell.1 == 0 {
				self.super_bonus_cell = None;
			}
		} 
		self.super_bonus_steps -= 1;

		if self.super_bonus_steps != 0 {
			return;
		}
		if self.snake_length() < self.get_2d_size() - self.size {
			self.super_bonus_cell = Some(WorldMap::generate_super_bonus(self.get_2d_size(), &self.snake.body));
			self.super_bonus_steps = WorldMap::gen_super_bonus_steps(self.size);
		} 
	}
	

	fn gen_super_bonus_steps(size: usize) -> usize {
		rnd(size * 2) + 4
	}

	pub fn super_bonus_cell_idx(&self) -> usize  {
		match &self.super_bonus_cell {
			None => 1000000,
			Some(super_bonus) => super_bonus.0
		}
	}

	pub fn super_bonus_steps(&self) -> usize {
		self.super_bonus_steps
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

	fn define_reward_points(snake_body: &Vec<SnakeCell>, reward_type: RewardType) -> usize {
		let points: usize = snake_body.len();
		match reward_type {
			RewardType::Yellow => points,
			RewardType::Red => points + points * 2,
			RewardType::Blue => points + points * 3,
			RewardType::Black => points + points * 4 + 55,
		}
	}

	fn consume_reward(&mut self) {
		self.consumed_rewards += 1;
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

	pub fn trap_steps(&self) -> usize {
		self.trap_steps
	}

	pub fn trap_cell_idx(&self) -> usize  {
		match &self.trap_cell {
			None => 1000000,
			Some(trap_cell) => trap_cell.idx
		}
	}

	pub fn trap_color(&self) -> String {
		match &self.trap_cell {
			None => String::from("None"),
			Some(trap_cell) => String::from(&trap_cell.color)
		}
	}

	pub fn trap_life(&self) -> usize { // TODO
		match &self.trap_cell { 
			None => 0,
			Some(trap_cell) => trap_cell.life
		}
	}

	fn check_trap(&mut self) {
		if let Some(trap_cell) = &mut self.trap_cell {
			trap_cell.life -= 1;
			
			if trap_cell.life == 0 {
				self.clear_trap_cell()
			}
		}
		if self.snake_head_index() == self.trap_cell_idx() {
			self.consuming_trap();
		}

		if self.trap_steps == 0 {
			self.recreate_trap_cell();
		} else {
			self.trap_steps -= 1;
		} 
	}
	
	fn consuming_trap(&mut self) {
		self.consumed_traps += 1;
		if self.consumed_traps % 5 == 0 {
			self.points += self.bonus_points;
		} else {
			self.points /= 2;
		}
		self.snake.body.pop();
		self.clear_trap_cell();
	}

	fn clear_trap_cell(&mut self) {
		self.trap_cell = None;
	}
	
	fn generate_trap_cell(max: usize, snake_body: &Vec<SnakeCell>) -> TrapCell {
		let mut trap_cell_idx: usize;
		loop {
			trap_cell_idx = rnd(max);
			if !snake_body.contains(&SnakeCell(trap_cell_idx)) {
				break;
			}
		}
		let rnd_num = rnd(4);
		let life: usize = rnd(10) + 2;
		let color = match rnd_num {
			0 => String::from("#FFEAAE"),
			1 => String::from("chocolate"),
			2 => String::from("blueviolet"),
			_ => String::from("brown"),
		};
		TrapCell::new(trap_cell_idx, life, color)
	}

	pub fn recreate_trap_cell(&mut self) {
		if self.snake_length() < 3 || self.snake_length() > self.get_2d_size() - 10 { return; }
		self.trap_cell = None;
		self.trap_cell = Some(WorldMap::generate_trap_cell(self.get_2d_size(), &self.snake.body));
		if let Some(trap_cell) = &self.trap_cell {
			let new_steps = trap_cell.life + now() % self.size;
			self.trap_steps += new_steps;
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

	pub fn get_game_stat(&self) -> GameStat {
		GameStat {
			consumed_rewards: self.consumed_rewards,
			consumed_traps: self.consumed_traps,
			life_steps: self.life_steps,
			bonus: self.bonus_points,
			snake_size: self.max_snake_size,
			super_bonuses: self.consumed_super_bonuses,
			consumed_moving_targets: self.consumed_moving_targets,
			points: self.points,
			eaten_by_enemy: self.eaten_by_enemy
		}
	}

	pub fn get_reward_points(&self) -> usize {
		self.reward_cell.points
	}

	fn add_points(&mut self) {
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

	fn consumed_items(&self) -> usize {
		self.consumed_traps + self.consumed_rewards + self.consumed_super_bonuses + self.consumed_moving_targets
	}

	fn check_activity(&mut self) {
		if self.life_steps % 100 == 0 && self.consumed_items() < self.life_steps / 20 {
			self.reason = Reason::NotActive;
			self.status = Some(GameStatus::Lost);
		}
	}

	pub fn get_reason(&self) -> String {
		match self.reason {
			Reason::Eaten => String::from("Eaten by enemy"),
			Reason::NotActive => String::from("Not active, death from hungry"),
			Reason::StillAlive => String::from("More than alive!"),
			Reason::Suiside => String::from("Suiside due to depression")
		}
	}

	pub fn update(&mut self) {
		self.check_max_poinst();
		self.check_activity();
		match self.status {
			Some(GameStatus::Played) => {
				self.life_steps += 1;
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
				if Some(self.snake_head_index()) == Some(self.moving_target_cell_idx()){
					self.consume_moving_target();
				}

				let snake_len: usize = self.snake_length();
				for i in 1..snake_len {
					self.snake.body[i] = SnakeCell(temp[i-1].0);
				}

				self.check_super_bonus();
				self.check_moving_target();

				if self.steps == 0 {
					self.reduce_points();
				}

				if self.snake.body[1..snake_len].contains(&self.snake.body[0]) {
					self.reason = Reason::Suiside;
					self.status = Some(GameStatus::Lost);
				}

				if self.snake.body[1..snake_len].contains(&SnakeCell(self.moving_target_cell_idx())) {
					self.moving_cell_bite_snake();
				}

				// consuming reward cell
				if Some(self.reward_cell_idx()) == Some(self.snake_head_index()) {
					self.consume_reward();
				}
				self.check_trap();

				self.check_moving_target_consume_trap();
				self.check_moving_target_consume_reward();
				self.check_moving_target_consume_super_bonus();
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
#[derive(Clone)]
pub struct TrapCell{
	idx: usize,
	life: usize,
	color: String
}

#[wasm_bindgen]
impl TrapCell {
	pub fn new(idx: usize, life: usize, color: String) -> TrapCell {
		TrapCell { 
			idx, 
			life, 
			color 
		}
	}
	pub fn copy(&self) -> TrapCell {
		self.clone()
	}
}

#[wasm_bindgen]
pub struct SuperBonus(usize, usize);

#[wasm_bindgen]
#[derive(PartialEq, Clone, Copy)]
pub enum Direction {
	Up, Right, Down, Left
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum  GameStatus {
	Won, Lost, Played
}

#[wasm_bindgen]
pub enum Reason {
	StillAlive, Eaten, NotActive, Suiside
}

#[wasm_bindgen]
#[derive(PartialEq, Clone, Copy)]
pub enum RewardType {
	Yellow, Red, Blue, Black
}

#[wasm_bindgen]
pub struct GameStat {
	pub consumed_rewards: usize,
	pub consumed_traps: usize,
	pub life_steps: usize,
	pub bonus: usize,
	pub snake_size: usize,
	pub super_bonuses: usize,
	pub consumed_moving_targets: usize,
	pub points: usize,
	pub eaten_by_enemy: usize
}

#[wasm_bindgen]
pub struct MovingTarget {
	idx: usize,
	direction: Direction,
	points: usize,
	life: usize,
	decision_steps: usize,
	steps_to_move: usize
}

#[wasm_bindgen]
impl MovingTarget {
	pub fn new(idx: usize) -> MovingTarget {
		let direction: Direction = MovingTarget::decide_direction();
		let decision_steps: usize = rnd(3);
		let steps_to_move: usize = MovingTarget::gen_move_steps();
		MovingTarget { 
			idx,
			direction, 
			points: 500,
			life: 50,
			decision_steps,
			steps_to_move
		}
	}

	fn decide_direction() -> Direction {
		let rnd_direction: usize = rnd(5);
		match rnd_direction {
			0 => Direction::Right,
			1 => Direction::Left,
			2 => Direction::Down,
			_ => Direction::Up
		}
	}

	pub fn calculate_points(&self) -> usize {
		self.points + self.life * 15
	}

	pub fn position(&self) -> usize {
		self.idx
	}

	fn decrease_life_steps(&mut self) {
		self.life -= 1;
	}

	fn change_direction(&mut self) {
		let rnd_range: usize = rnd(10);
		self.direction = match rnd_range {
			0..=5 => MovingTarget::decide_direction(),
			_ => self.direction
		}
	}

	fn gen_move_steps() -> usize{
		rnd(2) + 2
	}

	fn next_move(&mut self, map_length: usize) {
		let row = self.idx / map_length;
		if self.steps_to_move == 0 {
			self.idx = match self.direction {
				Direction::Right => { (row * map_length) + (self.idx + 1) % map_length },
				Direction::Left => { (row * map_length) + (self.idx - 1) % map_length },
				Direction::Up => { (self.idx - map_length) % (map_length * map_length) },
				Direction::Down => { (self.idx + map_length) % (map_length * map_length) },
			};
			self.steps_to_move = MovingTarget::gen_move_steps();
		} else {
			self.steps_to_move -= 1;
		}
		
	}
}