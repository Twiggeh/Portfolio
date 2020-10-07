const Navigation = () => (
	<div
		css={{
			fontFamily: 'Montserrat',
			backgroundColor: colors.bgInfill,
			color: colors.whiteText,
			a: { color: colors.whiteText },
			// TODO : re-enable
			//overflow: hidden,
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
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { colors } from '../../styles/globalStyle';
import AboutPage from '../About';
import ArtPage from '../Art';
import ProjectsPage from '../Projects';
import NewLinks from './components/newLinks';
