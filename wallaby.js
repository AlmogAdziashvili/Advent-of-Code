module.exports = function (w) {

	return {
		files: [
			'./2019/**/puzzle-input.ts',
			'./2019/**/input.txt',
			'./2019/**/input_example.txt'
		],
		tests: [
			'./2019/**/solve.ts',
		],
		env: {
			type: 'node'
		}
	};
};