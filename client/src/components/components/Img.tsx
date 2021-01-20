import styled from '@emotion/styled';
import React from 'react';

interface IImg {
	src: string;
	scss: string;
}

const Img: React.FC<IImg> = ({ src, scss }) => {
	return <Image src={src} scss={scss} />;
};

var Image = styled.div<CustomCSS & { src: string }>`
	background-image: 'url(${({ src }) => src})';
	background-repeat: no-repeat;
	background-size: cover;
	${({ scss }) => scss}
`;

export default Img;
