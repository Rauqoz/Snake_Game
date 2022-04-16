import React from 'react';

const Snake = ({ snake }) => {
	return (
		<div>
			{snake.map((e, i) => {
				return (
					<div
						style={{
							backgroundColor: 'green',
							width: '2%',
							height: '2%',
							position: 'absolute',
							left: `${e[0]}%`,
							top: `${e[1]}%`,
							zIndex: 2,
						}}
						key={i}
					/>
				);
			})}
		</div>
	);
};

export default Snake;
