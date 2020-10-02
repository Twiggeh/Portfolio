const mq = globalStyle.queries.mainQueries;

const Navigation = () => (
	<nav
		css={{
			fontFamily: 'Montserrat',
			backgroundColor: globalStyle.colors.bgInfill,
			color: globalStyle.colors.whiteText,
			a: { color: globalStyle.colors.whiteText },
			//overflow: 'hidden',
		}}>
		<BrowserRouter>
			<ul
				css={{
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
							//paddingRight: '3rem',
							li: {
								paddingTop: '2rem',
							},
							backgroundColor: globalStyle.colors.darkestInfill,
						},
						paddingBottom: '1rem',
						paddingTop: '1rem',
					},
				}}>
				<li
					css={{
						a: {
							fontWeight: 700,
							fontSize: 'clamp(20px, 2vw, 32px)',
						},
					}}>
					<Link to='/art'>Twiggeh&apos;s Portfolio</Link>
				</li>
				<div css={{ display: 'flex' }}>
					<li css={{ display: 'flex' }}>
						<Link to='/art'>Art</Link>
						<a
							css={{
								display: 'none',
								// padding Left spaces the entire slide menu out
								svg: {
									height: '1rem',
									paddingLeft: '4rem',
									':hover': { fill: 'hotpink' },
									line: {},
								},
								[mq[1]]: {
									display: 'inline',
								},
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
				</div>
				<li css={{ padding: 0 }}>
					<a
						href='https://github.com/Twiggeh'
						css={{
							height: '4vw',
							width: '4vw',
							minWidth: '40px',
							padding: 0,
							svg: { height: '4vw' },
							paddingRight: '2rem',
						}}>
						{globalStyle.svgs.githubLogo}
					</a>
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
