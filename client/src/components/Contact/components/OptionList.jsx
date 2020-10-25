import Option from './Option';
import React from 'react';

/**
 * @param {object} props
 * @param {OptData[]} props.optList
 */
const OptionList = ({ optList }) =>
	optList.map(({ txt, value, onClick }, i) => (
		<Option onClick={onClick} txt={txt} value={value} index={i} key={i} />
	));
