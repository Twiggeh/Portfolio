const SidebarHeader = ({
	title,
	subTitle = '',
	picture = './static/khala_close.jpg',
	alt = '',
}) => {
	return (
		<header>
			<img src={picture} alt={alt} />
			<h4>{title}</h4>
			<h5>{subTitle}</h5>
		</header>
	);
};

SidebarHeader.propTypes = {
	alt: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	picture: PropTypes.string,
};

export default SidebarHeader;

import React from 'react';
import PropTypes from 'prop-types';
