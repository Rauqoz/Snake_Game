import React from 'react';

const Food = ({ pos }) => {
	return (
		<div
			style={{
				backgroundColor: 'yellow',
				width: '2%',
				height: '2%',
				position: 'absolute',
				left: `${pos[0]}%`,
				top: `${pos[1]}%`,
				zIndex: 1
			}}
		/>
	);
};

export default Food;
