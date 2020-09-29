const SidebarTitle = ({ title, subTitle = '', picture = './static/khala_close.jpg' }) => {
	return (
		<header css={{ marginTop: '5rem' }}>
			<div
				css={{
					backgroundImage: `url(${picture})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'bottom center',
					backgroundSize: 'cover',
					width: 'clamp(150px, 10vw, 10vw)',
					height: 'clamp(150px, 10vw, 10vw)',
					marginBottom: '2rem',
				}}
			/>
			<h1
				css={{
					letterSpacing: '0.265rem',
					fontSize: globalStyle.styles.titleFontSize,
					textTransform: 'uppercase',
					fontWeight: 600,
					marginBottom: '1rem',
				}}>
				{title}
			</h1>
			<h2
				css={{
					fontSize: globalStyle.styles.subtitleFontSize,
					letterSpacing: '0.265rem',
				}}>
				{subTitle}
			</h2>
			<div
				css={{
					marginTop: '4rem',
					marginBottom: '5rem',
					...globalStyle.styles.customOutline(1),
				}}></div>
		</header>
	);
};

SidebarTitle.propTypes = {
	alt: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	picture: PropTypes.string,
};

export default SidebarTitle;

import React from 'react';
import PropTypes from 'prop-types';
import globalStyle from '../../../styles/globalStyle';
