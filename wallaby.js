module.exports = function (w) {

	return {
		files: [
			'./2023/**/puzzle-input.ts',
			'./2023/**/input.txt',
			'./2023/**/input_example.txt'
		],
		tests: [
			'./2023/**/solve.ts',
		],
		env: {
			type: 'node'
		}
	};
};