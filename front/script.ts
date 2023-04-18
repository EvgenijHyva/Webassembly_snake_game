import { match } from "assert";
import "./styles.css";
import init, { WorldMap, Direction, GameStatus } from "snake_game";

init().then(wasmObj => {
	const canvas = <HTMLCanvasElement> document.getElementById("snake-game-canvas");
	const gameControlBtn = <HTMLButtonElement> document.getElementById("game-control-btn");
	const gameStatusContainer = <HTMLDivElement> document.getElementById("game-status");
	const gamePointsContainer = <HTMLDivElement> document.getElementById("game-points");
	const gameStepsContainer = <HTMLDivElement> document.getElementById("snake-steps");
	const gameBonusesContainer = <HTMLDivElement> document.getElementById("extra-bonuses");
	const ctx = canvas.getContext("2d");
	
	const CELL_SIZE = 100; // px
	const MAP_SIZE = 8;
	const snakeSpawnIdx = Date.now() % (MAP_SIZE * MAP_SIZE);
	const SPEED = 1500; // ms

	const map = WorldMap.new(MAP_SIZE, snakeSpawnIdx);

	const lineLength = MAP_SIZE * CELL_SIZE;

	canvas.height = lineLength;
	canvas.width = lineLength;

	document.addEventListener("keyup", (e) => {
		const gameStatus = map.game_status();
		if (gameStatus === undefined) {
			map.start_game();
			start();
			gameControlBtn.textContent = "Reload";
		}

		switch (e.code) {
			case "KeyW":
			case "ArrowUp":
				map.change_snake_direction(Direction.Up);
				break;
			case "KeyS":
			case "ArrowDown":
				map.change_snake_direction(Direction.Down);
				break;
			case "KeyA":
			case "ArrowLeft":
				map.change_snake_direction(Direction.Left);
				break;
			case "KeyD":
			case "ArrowRight":
				map.change_snake_direction(Direction.Right);
				break;
			default:
				break;
		}
	})

	gameControlBtn.addEventListener("click", () => {
		const gameStatus = map.game_status();
		gameControlBtn.textContent = "Reload";
		if (gameStatus === undefined) {
			map.start_game();
			start();
		} else {
			location.reload();
		}
	})

	function drawMap() {
		ctx.beginPath();
		// drow columns
		for(let x = 0; x < MAP_SIZE + 1; x++) {
			const line = CELL_SIZE * x;
			ctx.moveTo(line, 0);
			ctx.lineTo(line, lineLength)
		}
		// drow rows
		for(let y = 0; y < MAP_SIZE + 1; y++) {
			const line = CELL_SIZE * y;
			ctx.moveTo(0, line);
			ctx.lineTo(lineLength, line);
		}
		ctx.stroke();
	}
	
	function drawSnake() {
		const snakeBodyColors = [
			{color: "lightgreen", xFactor: 0.75, yFactor: 0.7, radius: 0.09},
			{color: "pink", xFactor: 0.25, yFactor: 0.33, radius: 0.1},
			{color: "yellow", xFactor: 0.5, yFactor: 0.5, radius: 0.04},
			{color: "lightblue", xFactor: 0.71, yFactor: 0.4, radius: 0.13},
			{color: "gray", xFactor: 0.33, yFactor: 0.7, radius: 0.09}
		]
		const snakeCellPointer = map.snake_cells();
		const snakeLength = map.snake_length();
		const snakeCells = new Uint32Array(
			wasmObj.memory.buffer, 
			snakeCellPointer, // offset
			snakeLength // length
		);
		snakeCells
			.slice() // copy array
			.reverse() // mutate array in memory
			.forEach((cell, i) => {
			ctx.beginPath();
			const xCoord = (cell %  MAP_SIZE) * CELL_SIZE;
			const yCoord = Math.floor(cell / MAP_SIZE) * CELL_SIZE;
			
			ctx.fillStyle = i === snakeLength - 1 ? "#7878db" : map.game_status() == GameStatus.Lost ? "black" : "#9100db";
			
			ctx.fillRect(xCoord, yCoord, CELL_SIZE, CELL_SIZE); // will draw starting from (x,y) coord
			ctx.stroke();

			ctx.beginPath();
			
			// Draw circles on top of rectangles
			snakeBodyColors.forEach(el => {
				ctx.fillStyle = el.color;
				ctx.beginPath();
				ctx.arc(xCoord + CELL_SIZE * el.xFactor, yCoord + CELL_SIZE * el.yFactor, CELL_SIZE * el.radius, 0, 2 * Math.PI);
				ctx.fill();
			})
		});
	}

	function drawReward() {
		const rewardIdx = map.reward_cell_idx();
		const col = rewardIdx % MAP_SIZE;
		const row = Math.floor(rewardIdx / MAP_SIZE);
		const text = map.get_reward_points().toString() + "p";
		const bonusP = map.comming_bonus_by_steps()
		const text2 = bonusP ? "+" + bonusP.toString() + "p" : "";

		ctx.beginPath();
		ctx.fillStyle = map.get_reward_color() || "#FFEAAE";
		ctx.arc(col * CELL_SIZE + .5 * CELL_SIZE, row * CELL_SIZE + .5 * CELL_SIZE, CELL_SIZE / 2, 0, 2 * Math.PI);
		ctx.fill();

		ctx.fillStyle = "white";
		ctx.font = "15px Arial";
		
		ctx.fillText(text, col * CELL_SIZE + CELL_SIZE * 0.35, row * CELL_SIZE + CELL_SIZE * 0.50);
		ctx.fillText(text2, col * CELL_SIZE + CELL_SIZE * 0.25, row * CELL_SIZE + CELL_SIZE * 0.65)
	}

	function drawTrap() {
		console.log(map.trap_steps());
		console.log("idx", map.trap_cell_idx())
	}

	function drawGameStatus() {
		gameStatusContainer.textContent = map.game_status_text();
		gamePointsContainer.textContent = map.points().toString() ;
		gameStepsContainer.textContent = `Points reduce after (${map.get_steps()}) steps.`;
		gameBonusesContainer.textContent = map.bonus_stat().toString();
	}

	function paint() {
		drawMap();
		drawSnake();
		drawReward();
		drawGameStatus();
		drawTrap();
	}

	function defineFPS() {
		let snakeLength = map.snake_length();
		switch(true) {
			case snakeLength <= 6:
				return 3;
			case snakeLength > 6 && snakeLength <= 9:
				return 4;
			case snakeLength > 9 && snakeLength <= 12:
				return 5;
			case snakeLength > 12 && snakeLength <= 15:
				return 6;
			case snakeLength > 15 && snakeLength <= 18:
				return 7;
			case snakeLength > 18 && snakeLength <= 25:
				return 8;
			case snakeLength > 25 && snakeLength <= 30:
				return 9;
			case snakeLength > 30 && snakeLength <= 35:
				return 10;
			case snakeLength > 35 && snakeLength <= 40:
				return 11;
			default:
				return 5;
		}
	}

	function start() {
		let fps = defineFPS();
		setTimeout(()=> {
			ctx.clearRect(0,0, canvas.width, canvas.height); // cleaning canvas
			map.update();
			paint();
			if (map.game_status() !== GameStatus.Played) return;
			requestAnimationFrame(start);
		}, SPEED / fps)
	}
	paint();
})


// HEX to Decimal converter
// https://www.rapidtables.com/convert/number/hex-to-decimal.html

// webassembly sandbox
// https://webassembly.github.io/wabt/demo/wat2wasm/

// binary instructions definition
// https://webassembly.github.io/spec/core/binary/instructions.html