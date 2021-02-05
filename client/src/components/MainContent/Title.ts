import styled from '@emotion/styled';
import { fontSizes } from '../../styles/globalStyle';

const Title = styled.h1<{ bigGap?: boolean }>`
	font-weight: 700;
	font-size: ${fontSizes.mainNoteTitle};
	letter-spacing: 0.2rem;
	margin-bottom: ${({ bigGap }) => (bigGap ? '2.2rem' : '1.6rem')};
`;

export default Title;
