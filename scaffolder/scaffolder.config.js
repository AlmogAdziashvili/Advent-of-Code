const LispCase = (str) => {
	return str.split('').reduce((acc, curr, idx) => {
		const isUpper = curr === curr.toUpperCase();
		const lowerCased = curr.toLowerCase();
		if (isUpper && idx > 0) {
			return acc + `-${lowerCased}`;
		} else {
			return acc + lowerCased;
		}
	}, '');
};


module.exports = {
	transformers: {
		LispCase,
		PascalCaseToCamelCase: (s) => s[0].toLowerCase() + s.substr(1),
	},
	functions: {
		RandomNumber: () => Math.floor(Math.random() * 42) + 42,
		RandomSandboxPort: _ => Math.floor(Math.random() * 200) + 4200,
		AppTranslationsNamespace: ({ targetRoot, templateRoot, fileName }) => {
			const namespace = targetRoot
				.replace(/.*answers-client\//, '')
				.replace(/\//g, '.')

			return namespace;
		}
	}
}