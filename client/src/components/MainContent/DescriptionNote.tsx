interface IDescriptionNote {
	note: Extract<Note, { type: 'description' }>;
}

const DescriptionNote: React.FC<IDescriptionNote> = ({
	note: { title, text, btnUrl, btnText = 'More' },
}) => {
	return (
		<>
			{title ? <Title>{title}</Title> : null}
			<BtnDescWrapper>
				<Description>{text}</Description>
				{btnUrl ? <Button href={btnUrl} content={btnText}></Button> : null}
			</BtnDescWrapper>
		</>
	);
};

var BtnDescWrapper = styled.div`
	margin-top: 2em;
	margin-bottom: 2em;
	${Description} {
		margin-bottom: 2em;
	}
`;

import React from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import { Note } from '../../static/Projects';
import Description from './Description';
import Title from './Title';

export default DescriptionNote;
