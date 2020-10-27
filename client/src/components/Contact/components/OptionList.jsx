import Option from './Option';
import React from 'react';

/**
 * @param {object} props
 * @param {import('./Select').Option[]} props.options
 */
const OptionList = ({ options }) =>
	options.map(({ txt, value }, i) => (
		<Option
			txt={txt}
			value={value}
			index={i}
			key={value}
			action={{ type: 'select', selected: value }}
		/>
	));

export default OptionList;
