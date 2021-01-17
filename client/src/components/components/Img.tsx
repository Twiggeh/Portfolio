import styled from '@emotion/styled';
import React from 'react';

interface IImg {
	src: string;
	css: string;
}

const Img: React.FC<IImg> = ({ src, css }) => {
	return <Image src={src} css={css} />;
};

var Image = styled.div<CustomCSS & { src: string }>`
	background-image: 'url(${props => props.src})';
	background-repeat: no-repeat;
	background-size: cover;
	${props => props.css}
`;

export default Img;
