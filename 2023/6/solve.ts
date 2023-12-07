import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function roots (a: number, b: number, c: number) {
	const d = b * b - 4 * a * c;
	if (d < 0) {
		return 0;
	} else if (d === 0) {
		return 1;
	} else if (Math.sqrt(d) % 1 === 0) {
		const x1 = Math.ceil((-b - Math.sqrt(d)) / (2 * a));
		const x2 = Math.floor((-b + Math.sqrt(d)) / (2 * a));
		return x2 - x1 - 1;
	} else {
		const x1 = Math.ceil((-b - Math.sqrt(d)) / (2 * a));
		const x2 = Math.floor((-b + Math.sqrt(d)) / (2 * a));
		return x2 - x1 + 1;
	}
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const results = arr[0].map((T: number, i: number) => {
		return roots(1, T * -1, arr[1][i]);
	});
	return _.reduce(results, _.multiply);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return roots(1, arr[0] * -1, arr[1]);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(v => Number(v.split(': ')[1].trim().split(' ').filter(Boolean).join('')));
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 288);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 71503);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}