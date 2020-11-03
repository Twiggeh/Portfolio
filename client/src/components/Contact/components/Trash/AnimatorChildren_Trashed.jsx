import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AnimatorContext from './AnimatorContext';
import { useEffect } from 'react';

const AnimatorChildren = ({ children, parentKey }) => {
	const { animate } = useContext(AnimatorContext);
	children.forEach(child => {
		if (child.key === null) {
			console.log('Does not contain a key', child);
			throw new Error('All Animated Elements must contain a key.');
		}
	});

	if (!Array.isArray(children)) children = [children];
	useEffect(() => {
		animate({ type: 'addChildrenToTree', children, parentKey });
	}, [children]);
	return <>{children}</>;
};

AnimatorChildren.propTypes = {
	children: PropTypes.array,
	parentKey: PropTypes.string,
};

export default AnimatorChildren;
