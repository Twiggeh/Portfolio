/**
 * @typedef {{
							css ?: import('@emotion/core').Interpolation,
							content : JSX.Element,
							btnContainerCss: import('@emotion/core').Interpolation, 
						}} Modal
 */

const Modals = () => {
	const { modal, setModal } = useContext(ModalContext);

	if (!modal) return null;

	const { css, content } = modal;

	return (
		<>
			<div
				css={{
					width: '100vw',
					height: '100vh',
					zIndex: 100,
					backgroundColor: 'rgba(0, 0, 0, .70)',
					position: 'fixed',
					display: 'flex',
					alignItems: 'center',
					backdropFilter: 'grayscale(1) blur(1px)',
				}}
				onClick={e => {
					e.preventDefault();
					setModal(undefined);
				}}>
				<dialog
					css={{
						position: 'fixed',
						display: modal ? 'block' : 'none',
						paddingTop: '2em',
						borderStyle: 'solid',
						borderWidth: '1px',
						borderColor: 'hotpink',
						backdropFilter: 'unset',
						filter: 'drop-shadow(0 0 1em rgba(200, 63, 134, 0.6))',
						...css,
					}}>
					<button
						css={{
							padding: 0,
							borderWidth: 0,
							background: 'transparent',
							marginTop: '-0.5em',
						}}
						onClick={e => {
							e.preventDefault();
							setModal(undefined);
						}}>
						{globalStyle.svgs.cross({ color: 'black' })}
					</button>
					{content}
				</dialog>
			</div>
		</>
	);
};

Modals.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	actions: PropTypes.arrayOf(PropTypes.func),
	css: PropTypes.object,
	event: PropTypes.any,
};

export default Modals;

import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ModalContext from '../Providers/modalProvider';
import globalStyle from '../../styles/globalStyle';
