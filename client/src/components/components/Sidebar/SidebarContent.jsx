const SidebarContent = ({ title, date, src, alt }) => {
	return (
		<aside>
			<img src={src} alt={alt} />
			<h4>{title}</h4>
			<h4>{date}</h4>
		</aside>
	);
};

SidebarContent.propTypes = {
	title: PropTypes.string,
	date: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
};

export default SidebarContent;

import React from 'react';
import PropTypes from 'prop-types';
