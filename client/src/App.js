import { hot } from 'react-hot-loader/root';

const App = () => {
	const [count, setCount] = useState(0);
	return (
		<>
			<h1>Counter</h1>
			<div>{count}</div>
			<button onClick={() => setCount(c => c + 1)}>Increase Count</button>
			<button onClick={() => setCount(c => c - 1)}>Decrease Count</button>
		</>
	);
};
export default hot(App);
import React, { useState } from 'react';
