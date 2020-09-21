const Navigation = () => (
	<>
		<BrowserRouter>
			<ul>
				<li>
					<Link to='/about'>About</Link>
				</li>
				<li>
					<Link to='/art'>Art</Link>
				</li>
				<li>
					<Link to='/projects'>Projects</Link>
				</li>
				<li>
					<a href='https://github.com/Twiggeh'></a>
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
	</>
);

export default Navigation;
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import AboutPage from '../About';
import ArtPage from '../Art';
import ProjectsPage from '../Projects';
