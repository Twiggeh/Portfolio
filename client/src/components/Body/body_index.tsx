const Body = () => (
	<BodyWrapper>
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
		<Footer />
	</BodyWrapper>
);

var BodyWrapper = styled.div`
	font-family: Montserrat;
	background-color: ${colors.bgInfill};
	color: ${colors.whiteText};
	a: {
		color: ${colors.whiteText};
	}

	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
`;

export default Body;
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { colors } from '../../styles/globalStyle';
import ArtPage from '../Art_index';
import Contact from '../Contact/contact_index';
import ProjectsPage from '../Projects_index';
import NewLinks from './NavLinks';
import Footer from '../Footer_index';
import styled from '@emotion/styled';
