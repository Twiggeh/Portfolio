import Option from './Option';
import React from 'react';
import type { Option as IOption, OptionActions } from './Select';

interface IOptionList {
	options: { txt: string; value: string; action?: OptionActions }[];
	defaultOption: IOption;
	opened: boolean;
}

const OptionList: React.FC<IOptionList> = ({ options, defaultOption, opened }) => {
	return (
		<>
			{options.map(({ txt, value, action }, i) => {
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
			})}
		</>
	);
};

export default OptionList;
