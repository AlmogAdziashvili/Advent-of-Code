module.exports = function (w) {

	return {
		files: [
			'./2022/**/puzzle-input.ts',
			'./2022/**/input.txt',
			'./2022/**/input_example.txt'
		],
		tests: [
			'./2022/**/solve.ts',
		],
		env: {
			type: 'node'
		}
	};
};