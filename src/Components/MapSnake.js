import React, { useEffect, useState } from 'react';
import Food from './Food';
import Snake from './Snake';

const MapSnake = () => {
	const random_food_ = () => {
		let pre_min = 0,
			pre_max = 98;
		let post_min = Math.floor((Math.random() * (pre_max - pre_min + 1) + pre_min) / 2) * 2;
		let post_max = Math.floor((Math.random() * (pre_max - pre_min + 1) + pre_min) / 2) * 2;
		return [ post_min, post_max ];
	};

	const initial_game = {
		speed_snake: 100,
		direction_snake: 'R',
		points_snake: 0,
		data_snake: [ [ 0, 0 ], [ 2, 0 ] ],
		food_position: random_food_()
	};

	const [ data_game, setData_game_ ] = useState(initial_game);

	const reset_game_ = () => {
		alert(`Reset :3 your points: ${data_game.points_snake}`);
		setData_game_(initial_game);
	};

	const check_key_ = (e) => {
		switch (e.key) {
			case 'ArrowLeft':
			case 'a':
				setData_game_((pre) => ({ ...pre, direction_snake: 'L' }));
				break;
			case 'ArrowRight':
			case 'd':
				setData_game_((pre) => ({ ...pre, direction_snake: 'R' }));
				break;
			case 'ArrowUp':
			case 'w':
				setData_game_((pre) => ({ ...pre, direction_snake: 'U' }));
				break;
			case 'ArrowDown':
			case 's':
				setData_game_((pre) => ({ ...pre, direction_snake: 'D' }));
				break;
			default:
				break;
		}
	};

	const move_snake_ = () => {
		const current = [ ...data_game.data_snake ];
		const head = [ ...current[data_game.data_snake.length - 1] ];

		switch (data_game.direction_snake) {
			case 'L':
				head[0] -= 2;
				break;
			case 'R':
				head[0] += 2;
				break;
			case 'U':
				head[1] -= 2;
				break;
			case 'D':
				head[1] += 2;
				break;
			default:
				break;
		}

		current.push(head);
		current.shift();
		setData_game_((pre) => ({ ...pre, data_snake: current }));
	};

	const check_colision_ = () => {
		const current = [ ...data_game.data_snake ];
		const head = [ ...current[data_game.data_snake.length - 1] ];
		if (head[0] < 0 || head[0] > 98 || head[1] < 0 || head[1] > 98) {
			reset_game_();
		} else {
			current.pop();
			current.forEach((e) => (e[0] === head[0] && e[1] === head[1] ? reset_game_() : null));
		}
	};

	const check_eat_ = () => {
		const current = [ ...data_game.data_snake ];
		const head = [ ...current[data_game.data_snake.length - 1] ];

		if (head[0] === data_game.food_position[0] && head[1] === data_game.food_position[1]) {
			current.unshift([]);
			setData_game_((pre) => ({
				...pre,
				data_snake: current,
				food_position: random_food_(),
				points_snake: pre.points_snake + 100
			}));
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', check_key_);

		return () => {
			document.removeEventListener('keydown', check_key_);
		};
	}, []);

	useEffect(
		() => {
			const game = setInterval(() => {
				move_snake_();
				check_colision_();
				check_eat_();
			}, data_game.speed_snake);

			return () => clearInterval(game);
		},
		[ data_game ]
	);

	return (
		<div
			style={{
				width: 800,
				height: 800,
				borderStyle: 'double',
				position: 'relative'
			}}
		>
			<h3
				style={{
					top: '-7%',
					left: '45%',
					position: 'absolute',
					width: 100
				}}
				onClick={reset_game_}
			>
				{`Score ${data_game.points_snake}`}
			</h3>
			<Snake snake={data_game.data_snake} />
			<Food pos={data_game.food_position} />
			<button style={{ top: '100%', left: '45%', position: 'absolute', width: 100 }} onClick={reset_game_}>
				Reset
			</button>
		</div>
	);
};

export default MapSnake;
