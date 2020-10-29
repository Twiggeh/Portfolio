import Option from './Option';
import React from 'react';

/**
 * @param {object} props
 * @param {import('./Select').Option[]} props.options
 */
const OptionList = ({ options }) => {
	return options.map(({ txt, value }, i) => (
		<Option txt={txt} value={value} index={i} key={value} listLength={options.length} />
	));
};

export default OptionList;
