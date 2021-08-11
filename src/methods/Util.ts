export const Util = (() => {
	const toUpper = (text: string): string => {
		return `${text[0].toUpperCase()}${text.slice(1)}`;
	};

	return {
		toUpper,
	};
})();
