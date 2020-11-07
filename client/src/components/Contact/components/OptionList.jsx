import Option from './Option';
import React from 'react';

/**
 * @param {object} props
 * @param {import('./Select').Option[]} props.options
 * @param {import('./Select').Option} props.defaultOption
 * @param {Boolean} props.opened - Whether the Select has been opened
 */
const OptionList = ({ options, defaultOption, opened }) => {
	return options.map(({ txt, value, action }, i) => {
		if (!opened && i === 0) {
			value = defaultOption.value;
			txt = defaultOption.txt;
			action = defaultOption.action;
		}
		return (
			<Option
				txt={txt}
				value={value}
				index={i}
				key={value}
				listLength={options.length}
				action={action}
			/>
		);
	});
};

export default OptionList;
