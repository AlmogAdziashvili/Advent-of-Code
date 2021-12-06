import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve = (_arr: any[], days: number): any => {
	const arr = [..._arr];
	const map = _.range(days).reduce((acc) => {
		const newMap = {};
		_.range(9).forEach(d => {
			newMap[d] = acc[d+1] || 0;
		});
		newMap[8] = acc[0] || 0;
		newMap[6] += acc[0] || 0;
		return newMap;
	}, _.countBy(arr));
	return _.sum(_.values(map));
};

const processInput = (input: string): any => {
	const n =
		input.split(',')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve(processInput(exampleInput), 18);
		testResult; //?
		assert.deepEqual(testResult, 26);

		const result = solve(processInput(puzzleInput), 80);
		result; //?
		assert.deepEqual(result, 345793);
	});

	it.skip('Part 2', () => {
		const testResult = solve(processInput(exampleInput), 18);
		testResult; //?
		assert.deepEqual(testResult, 26);

		const result = solve(processInput(puzzleInput), 256);
		result; //?
		assert.deepEqual(result, 1572643095893);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve(processInput(puzzleInput), 80));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve(processInput(puzzleInput), 256));
	console.timeEnd('part2');
}