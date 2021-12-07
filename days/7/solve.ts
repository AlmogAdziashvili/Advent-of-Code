import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const map = _.range(_.min(arr), _.max(arr) + 1).reduce((acc, p) => {
		return { ...acc, [p]: arr.reduce((a, b) => a + Math.abs(p - b), 0) };
	}, {});
	const optimizedPosition = _.minBy(_.keys(map), key => map[key]);
	return map[optimizedPosition];
};

const sequenceSum = n => n * (n-1) / 2

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const map = _.range(_.min(arr), _.max(arr) + 1).reduce((acc, p) => {
		return { ...acc, [p]: arr.reduce((a, b) => a + sequenceSum(Math.abs(p - b) + 1), 0) };
	}, {});
	const optimizedPosition = _.minBy(_.keys(map), key => map[key]);
	return map[optimizedPosition];
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
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 37);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 348996);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 168);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 98231647);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}