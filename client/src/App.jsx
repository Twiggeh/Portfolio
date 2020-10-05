import { hot } from 'react-hot-loader/root';
// TODO : Figure out how to deal with this
import '../public/static/global.css';

const App = () => {
	const [modal, setModal] = useState(undefined);
	/** @type {import('@emotion/core').Interpolation}*/

	return (
		<>
			<Global
				styles={{
					'::selection': {
						color: 'white',
						background: 'hotpink',
					},
					'*': { fontFamily: 'Montserrat' },
				}}
			/>
			<ModalContext.Provider value={{ modal, setModal }}>
				<Modals />
				<Navigation />
			</ModalContext.Provider>
		</>
	);
};
export default hot(App);
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Modals from './components/Modals/modal_index';
import ModalContext from './components/Providers/modalProvider';
import { Global } from '@emotion/core';
