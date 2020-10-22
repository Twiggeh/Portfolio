import { Global, css } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import './assets/global.css';

const mq = queries.mainQueries;

const App = () => {
	const [modal, setModal] = useState(undefined);
	/** @type {import('@emotion/core').Interpolation}*/
	return (
		<>
			<Global styles={globalStyle} />
			<ModalContext.Provider value={{ modal, setModal }}>
				<Modals />
				<Body />
			</ModalContext.Provider>
		</>
	);
};

export default hot(App);

import React, { useState } from 'react';
import Body from './components/Body/body_index';
import Modals from './components/Modals/modal_index';
import ModalContext from './components/Providers/modalProvider';
import { queries, colors, styles } from './styles/globalStyle';

var globalStyle = css`
	* {
		::selection {
			color: white;
			background: hotpink;
		}
		font-family: 'Montserrat';
		::-webkit-scrollbar-track {
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3) inset;
			${[mq[0]]} {
				${styles.customOutline(0, 0, 0, 1)}
			}
		}
		::-webkit-scrollbar {
			width: 18px;
			background-color: ${colors.bgInfill};
		}
		::-webkit-scrollbar-thumb {
			border: 1px solid ${colors.grayBorder};
			background-color: ${colors.darkestInfill};
			:hover {
				border-color: hotpink;
			}
		}
	}
	body {
		--trueWidth: 100%;
	}
`;
