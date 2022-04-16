import './App.css';
import MapSnake from './Components/MapSnake';

function App() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 50
			}}
		>
			<MapSnake />
		</div>
	);
}

export default App;
