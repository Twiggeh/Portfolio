/* eslint-disable indent */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import HoverBorder from '../../components/HoverBorder';
import FormInputCss from './FormInputCss';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import SelectStateContext from './SelectStateContext';

const Option = ({ txt, value, onClick, index = 0 }) => {
	const { open, selected } = useContext(SelectStateContext);

	//	${({ open, selected, value, index }) => {
	//		if (!open && selected !== value) {
	//			return css`
	//				// z-index: -1;
	//				transform: translateY(calc(-100% * ${index}));
	//				margin-bottom: 0;
	//			`;
	//		}
	//		if (selected === value && !open) {
	//			return css`
	//				transform: translateY(calc(-100% * ${index}));
	//				margin-bottom: 0;
	//			`;
	//		}
	//	}};

	const StyledOption = styled.div`
		${FormInputCss};
		position: relative;
		z-index: 0;
		transform: translateY(0px);
		opacity: 1;
		transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
		padding-bottom: 1em;
		${() => {
			if (!open && selected !== value) {
				return css`
					transform: translateY(calc(-100% * ${index}));
					opacity: 0;
					margin-bottom: 0;
				`;
			}
		}}
	`;

	return (
		<StyledOption onClick={onClick}>
			{open && selected === value ? null : <HoverBorder />}
			{txt}
		</StyledOption>
	);
};

Option.propTypes = {
	txt: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	index: PropTypes.number,
};

export default Option;
