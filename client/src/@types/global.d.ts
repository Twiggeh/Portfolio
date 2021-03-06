const BACKEND_URL: string;

type CustomCSS = {
	scss?: string;
};
interface StringConstructor {
	constructor: <Input extends unknown>(input: Input) => Input | undefined;
	new: <Input extends unknown>(input: Input) => Input | undefined;
	<Input extends unknown>(input: Input): Input | undefined;
}

declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGSVGElement>>;
	export default content;
}

declare module '*.pdf' {
	const content: string;
	export default content;
}

declare module '*.webp' {
	const content: string;
	export default content;
}

declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.m4v' {
	const content: string;
	export default content;
}

declare module '*.gif' {
	const content: string;
	export default content;
}

declare module 'pictures' {
	const pictures = await import('../static/Pictures');
	export default pictures;
}
