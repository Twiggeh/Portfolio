/**
 * @typedef {{
							css ?: import('@emotion/core').Interpolation,
							content : JSX.Element,
							btnContainerCss: import('@emotion/core').Interpolation, 
						}} Modal
 */

const cross = (
	{ size = 40, color = 'black', width = 3, lineCap = 'round' } = {
		size: 40,
		color: 'black',
		width: 3,
		lineCap: 'round',
	}
) => (
	<svg
		width={size}
		height={size}
		viewBox={`0 0 ${size} ${size}`}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		<line
			x1='2.52952'
			y1='2.52943'
			x2='36.4706'
			y2='36.4706'
			stroke={color}
			css={{ strokeWidth: width, strokeLinecap: lineCap }}
		/>
		<line
			x1='36.4707'
			y1='2.52943'
			x2='2.52958'
			y2='36.4706'
			stroke={color}
			css={{ strokeWidth: width, strokeLinecap: lineCap }}
		/>
	</svg>
);

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
						zIndex: 2,
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
							background: 'rgb(0, 0, 0, 0)',
							marginTop: '-0.5em',
						}}
						onClick={e => {
							e.preventDefault();
							setModal(undefined);
						}}>
						{cross()}
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
