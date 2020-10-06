/** @param {{title: string, date: string, features : import('../MainContent/MainContent').note[]}} */
const SidebarContent = ({
	title,
	hero = { src: './static/khala_close.jpg', alt: '' },
}) => {
	return (
		<aside>
			<img src={hero.src} alt={hero.alt} />
			<h4>{title}</h4>
		</aside>
	);
};

SidebarContent.propTypes = {
	title: PropTypes.string,
	hero: PropTypes.object,
};

export default SidebarContent;

import React from 'react';
import PropTypes from 'prop-types';
