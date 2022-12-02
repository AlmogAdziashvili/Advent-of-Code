import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const sums = _.map(arr, _.sum);
	return _.max(sums);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const sums = _.map(arr, _.sum);
	const sortedSums = sums.sort((a, b) => _.gt(a, b) ? -1 : 1);
	return _.sum(_.take(sortedSums, 3));
};

const processInput = (input: string): any => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(list => list.split('\n').map(Number));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 24000);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 71780);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 45000);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 212489);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}