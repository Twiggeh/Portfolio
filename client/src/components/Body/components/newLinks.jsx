const NewLinks = () => {
	const [width] = useScreenSize();
	const [open, setOpen] = useState(false);
	return (
		<>
			<Nav>
				<NavTitle>
					<Link to='/'>Twiggeh&apos;s Portfolio</Link>
				</NavTitle>
				<NavUl>
					<NavLi>
						<Link to='/art'>Art</Link>
					</NavLi>
					<NavLi>
						<Link to='/projects'>Projects</Link>
					</NavLi>
					<NavLi>
						<Link to='/contact'>Contact</Link>
					</NavLi>
				</NavUl>
				{width > nq[1] ? (
					<TopRight href={'https://github.com/Twiggeh'}>{<svgs.GithubLogo />}</TopRight>
				) : (
					<TopRight
						onClick={() => {
							setOpen(c => !c);
						}}>
						{<svgs.HamburgerMenu />}
					</TopRight>
				)}
				<SideSlideNav open={open}>
					<li>
						<Link to='/art'>Art</Link>
						<a
							onClick={() => {
								setOpen(c => !c);
							}}>
							{svgs.cross()}
						</a>
					</li>
					<li>
						<Link to='/projects'>Projects</Link>
					</li>
					<li>
						<Link to='/contact'>Contact</Link>
					</li>
					<li>
						<a href='https://github.com/Twiggeh'>GitHub</a>
					</li>
				</SideSlideNav>
			</Nav>
		</>
	);
};

export default NewLinks;

var mq = queries.mainQueries;
var nq = queries.numQueries;

var Nav = styled.nav`
	z-index: 10;
	display: flex;
	width: var(--trueWidth);
	align-items: center;
	justify-content: space-between;
	background-color: ${colors.darkestInfill};
	${styles.customOutline(0, 0, 1)};
	a {
		transition: color 250ms ease-in-out;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.135rem;
		line {
			transition: stroke 250ms ease-in-out;
		}
		:hover {
			color: hotpink;
			fill: hotpink;
			cursor: pointer;
			line {
				stroke: hotpink;
			}
		}
	}
	li {
		display: block;
	}
	${[mq[1]]} {
		position: fixed;
		top: 0;
		left: 0;
	}
`;

var NavTitle = styled.div`
	padding-left: ${styles.contentPaddingSides};
	a {
		font-weight: 700;
		font-size: ${fontSizes.navTitle};
	}
`;

var NavUl = styled.ul`
	display: flex;
	padding-top: 2em;
	padding-bottom: 2em;
	a {
		font-size: ${fontSizes.navEl};
	}
	/* traditional way of hiding elements, doesn't work with screen readers
	TODO replace with useDisplayTrans 
	*/
	transition: transform 0.3s 0.1s ease-in-out, width 0s 0.3s;
	${[mq[1]]} {
		transform: translateX(100vw);
		width: 0;
	}
	@media (min-width: ${nq[1]}px) {
		transform: translateX(0);
		width: unset;
	}
`;

var NavLi = styled.li`
	:not(:first-child) {
		margin-left: 3rem;
	}
`;

var TopRight = styled.a`
	margin-right: 1.5rem;
	svg {
		height: clamp(calc(${fontSizes.navEl} * 1.5), 2vw, 2vw);
		stroke-width: 2;
		path {
			transition: fill 250ms ease-in-out;
		}
		:hover {
			path {
				fill: hotpink;
			}
		}
	}
`;

var SideSlideNav = styled.nav`
	background-color: ${colors.darkestInfill};
	height: 100vh;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	right: 0;
	transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
	transition: transform 0.5s ease;
	padding-top: 1.5rem;
	padding-left: 0.7rem;
	${styles.customOutline(0, 0, 0, 1)}
	a {
		font-size: ${fontSizes.navEl};
	}
	li {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	@media (min-width: ${nq[1]}px) {
		display: none;
	}
	a > svg {
		height: ${fontSizes.navEl};
	}
	li:first-of-type > a:first-of-type {
		margin-right: 5rem;
	}
`;

import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { colors, fontSizes, queries, styles, svgs } from '../../../styles/globalStyle';
import useScreenSize from './hooks/useScreensize';
