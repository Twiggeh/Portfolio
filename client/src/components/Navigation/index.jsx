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
				<Route path='/art'>
					<ArtPage />
				</Route>
				<Route path='/projects'>
					<ProjectsPage />
				</Route>
				<Route exact path='/'>
					<ProjectsPage />
				</Route>
				<Route path='/contact'>
					<Contact />
				</Route>
			</Switch>
		</BrowserRouter>
	</div>
);

export default Navigation;
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { colors } from '../../styles/globalStyle';
import ArtPage from '../Art';
import Contact from '../Contact/contact_index';
import ProjectsPage from '../Projects';
import NewLinks from './components/newLinks';
