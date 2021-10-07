export const Util = (() => {
	const toUpperFirst = (text: string): string => {
		return `${text[0].toUpperCase()}${text.slice(1)}`;
	};

	return {
		toUpperFirst,
	};
})();
