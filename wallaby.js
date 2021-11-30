module.exports = function (w) {

	return {
		files: [
			'./days/**/puzzle-input.ts',
			'./days/**/input.txt',
			'./days/**/input_example.txt'
		],
		tests: [
			'./days/**/solve.ts',
		],
		env: {
			type: 'node'
		}
	};
};