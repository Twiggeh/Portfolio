/* eslint-disable indent */
import { css } from '@emotion/core';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import globalStyle from '../../../styles/globalStyle';

const mq = globalStyle.queries.mainQueries;
const nq = globalStyle.queries.numQueries;

const Links = () => {
	const [open, setOpen] = useState(false);
	/** @type {import('@emotion/core').Interpolation} */
	const ListStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: '2em',
		paddingBottom: '2em',
		background: globalStyle.colors.darkestInfill,
		...globalStyle.styles.customOutline(0, 0, 1),
		a: {
			textDecoration: 'none',
			'&:hover': { color: 'hotpink' },
			fontSize: globalStyle.styles.navElFontSize,
			fontWeight: '400',
			paddingLeft: '1em',
			textTransform: 'uppercase',
			letterSpacing: '0.135em',
		},
		[mq[1]]: {
			position: 'fixed',
			width: '100vw',
			top: 0,
			left: 0,
			right: 0,
			a: {
				padding: '0',
				paddingLeft: globalStyle.styles.contentPaddingSides,
				paddingRight: globalStyle.styles.contentPaddingSides,
			},
			div: {
				flexFlow: 'column nowrap',
				position: 'fixed',
				top: 0,
				right: 0,
				height: '100vh',
				li: {
					paddingTop: '2rem',
				},
				backgroundColor: globalStyle.colors.darkestInfill,
			},
			paddingBottom: '1rem',
			paddingTop: '1rem',
		},
	};
	return (
		<ul css={ListStyle}>
			<li
				css={{
					a: {
						fontWeight: 700,
						fontSize: 'clamp(20px, 2vw, 32px)',
					},
				}}>
				<Link to='/art'>Twiggeh&apos;s Portfolio</Link>
			</li>
			<div
				css={css`
					display: flex;
					transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
					transition: transform 0.3s ease-in-out;
					@media (max-width: ${nq[1]}px) {
						transform: translateX(100%);
					}
					@media (min-width: ${nq[1]}px) {
						transform: translateX(0);
					} ;
				`}>
				<li css={{ display: 'flex' }}>
					<Link to='/art'>Art</Link>
					<a
						css={{
							display: 'none',
							svg: {
								height: '1rem',
								// padding Left spaces the entire slide menu out
								marginLeft: '4rem',
								':hover': { line: { stroke: 'hotpink' }, cursor: 'pointer' },
							},
							[mq[1]]: {
								display: 'inline',
							},
						}}
						onClick={e => {
							e.preventDefault();
							setOpen(c => !c);
						}}>
						{globalStyle.svgs.cross()}
					</a>
				</li>
				<li>
					<Link to='/projects'>Projects</Link>
				</li>
				<li>
					<Link to='/about'>Contact</Link>
				</li>
				<li
					css={{
						padding: 0,
						display: 'none',
						[mq[1]]: {
							display: 'block',
						},
					}}>
					<a href='https://github.com/Twiggeh'>Github</a>
				</li>
			</div>
			<li css={{ padding: 0, display: 'none', [mq[1]]: { display: 'block' } }}>
				<a
					css={{
						height: '4vw',
						width: '4vw',
						minWidth: '40px',
						padding: 0,
						svg: { height: '3.5vw' },
						paddingRight: '2rem',
					}}
					onClick={() => {
						setOpen(c => !c);
					}}>
					{globalStyle.svgs.hamburgerMenu}
				</a>
			</li>
			<li
				css={{
					padding: 0,
					[mq[1]]: {
						display: 'none',
					},
				}}>
				<a
					href='https://github.com/Twiggeh'
					css={{
						height: '4vw',
						width: '4vw',
						minWidth: '40px',
						padding: 0,
						svg: { height: '3.5vw' },
						paddingRight: '2rem',
					}}>
					{globalStyle.svgs.githubLogo}
				</a>
			</li>
		</ul>
	);
};

export default Links;
