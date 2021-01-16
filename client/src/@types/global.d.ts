type CustomCSS = {
	css?: string;
};

declare module '*.svg' {
	const content: string;
	export default content;
}
