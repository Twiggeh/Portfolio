import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ src, alt, customCss = {} }) => {
	return (
		<div
			css={{
				backgroundImage: `url('${src}');`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				...customCss,
			}}></div>
	);
};

Img.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	customCss: PropTypes.object,
};

export default Img;
