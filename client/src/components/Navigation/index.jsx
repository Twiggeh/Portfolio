const Navigation = () => (
	<div
		css={{
			fontFamily: 'Montserrat',
			backgroundColor: globalStyle.colors.bgInfill,
			color: globalStyle.colors.whiteText,
			a: { color: globalStyle.colors.whiteText },
			// TODO : re-enable
			//overflow: 'hidden',
		}}>
		<BrowserRouter>
			<NewLinks />
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
	</div>
);

export default Navigation;
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import globalStyle from '../../styles/globalStyle';
import AboutPage from '../About';
import ArtPage from '../Art';
import ProjectsPage from '../Projects';
import NewLinks from './components/newLinks';
