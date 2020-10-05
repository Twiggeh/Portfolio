const NewLinks = () => {
	const [width] = useScreenSize();
	const [open, setOpen] = useState(false);
	return (
		<>
			<Nav>
				<NavTitle>
					<Link to='/art'>Twiggeh&apos;s Portfolio</Link>
				</NavTitle>
				<NavUl>
					<NavLi>
						<Link to='/art'>Art</Link>
					</NavLi>
					<NavLi>
						<Link to='/projects'>Projects</Link>
					</NavLi>
					<NavLi>
						<Link to='/about'>Contact</Link>
					</NavLi>
				</NavUl>
				{width > nq[1] ? (
					<TopRight href={'https://github.com/Twiggeh'}>
						{globalStyle.svgs.githubLogo}
					</TopRight>
				) : (
					<TopRight
						onClick={() => {
							setOpen(c => !c);
						}}>
						{globalStyle.svgs.hamburgerMenu}
					</TopRight>
				)}
				<SideSlideNav open={open}>
					<li>
						<Link to='/art'>Art</Link>
						<a
							onClick={() => {
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
					<li>
						<a href='https://github.com/Twiggeh'>GitHub</a>
					</li>
				</SideSlideNav>
			</Nav>
		</>
	);
};

export default NewLinks;

var mq = globalStyle.queries.mainQueries;
var nq = globalStyle.queries.numQueries;

var Nav = styled.nav`
	display: flex;
	width: 100vw;
	align-items: center;
	justify-content: space-between;
	background-color: ${globalStyle.colors.darkestInfill};
	${globalStyle.styles.customOutline(0, 0, 1)};
	a,
	svg {
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.135rem;
		&:hover {
			color: hotpink;
			fill: hotpink;
			cursor: pointer;
			line {
				stroke: hotpink !important;
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
	padding-left: ${globalStyle.styles.contentPaddingSides};
	a {
		font-weight: 700;
		font-size: ${globalStyle.styles.navTitleFontSize};
	}
`;

var NavUl = styled.ul`
	display: flex;
	padding-top: 2em;
	padding-bottom: 2em;
	a {
		font-size: ${globalStyle.styles.navElFontSize};
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
		height: clamp(calc(${globalStyle.styles.navElFontSize} * 1.5), 3vw, 3vw);
	}
`;

var SideSlideNav = styled.nav`
	background-color: ${globalStyle.colors.darkestInfill};
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
	${globalStyle.styles.customOutline(0, 0, 0, 1)}
	a {
		font-size: ${globalStyle.styles.navElFontSize};
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
		height: ${globalStyle.styles.navElFontSize};
	}
	li:first-child > a:first-child {
		margin-right: 5rem;
	}
`;

import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import globalStyle from '../../../styles/globalStyle';
import useScreenSize from './hooks/useScreensize';
