const Navigation = () => (
	<nav
		css={{
			fontFamily: 'Montserrat',
			backgroundColor: globalStyle.colors.bgInfill,
			color: globalStyle.colors.whiteText,
			a: { color: globalStyle.colors.whiteText },
		}}>
		<BrowserRouter>
			<ul
				css={{
					display: 'flex',
					a: {
						'&:hover': { color: 'hotpink' },
						fontSize: 'clamp(12px, 5vw, 25px)',
						fontWeight: '100',
						padding: '1em',
						textTransform: 'uppercase',
					},
					'li:nth-of-type(5)': {
						marginLeft: 'auto',
					},
					'li:nth-of-type(2)': {
						marginLeft: 'auto',
					},
				}}>
				<li css={{ fontWeight: 800 }}>
					<Link to='/art'>Twiggeh&apos;s Portfolio</Link>
				</li>
				<li>
					<Link to='/art'>Art</Link>
				</li>
				<li>
					<Link to='/projects'>Projects</Link>
				</li>
				<li>
					<Link to='/about'>Contact</Link>
				</li>
				<li>
					<a href='https://github.com/Twiggeh'>GH</a>
				</li>
			</ul>
			<Switch>
				<Route path='/about'>
					<AboutPage />
				</Route>
				<Route path='/art'>
					<ArtPage />
				</Route>
				<Route path='/projects'>
					<ProjectsPage />
				</Route>
			</Switch>
		</BrowserRouter>
	</nav>
);

export default Navigation;
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import globalStyle from '../../styles/globalStyle';
import AboutPage from '../About';
import ArtPage from '../Art';
import ProjectsPage from '../Projects';
