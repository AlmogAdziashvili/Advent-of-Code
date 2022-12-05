import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const [state, instructions] = [..._arr];
	const newState = instructions.reduce((acc, [count, from, to]) => {
		_.range(count).forEach(() => {
			acc[to - 1] = [...acc[to - 1], acc[from - 1][acc[from - 1].length - 1]];
			acc[from - 1] = acc[from - 1].slice(0, -1);
		});
		return acc;
	}, state);
	return newState.map((row) => row[row.length - 1]).join('');
};

export const solve2 = (_arr: any[]): any => {
	const [state, instructions] = [..._arr];
	const newState = instructions.reduce((acc, [count, from, to]) => {
		acc[to - 1] = [...acc[to - 1], ...acc[from - 1].slice(-count)];
		acc[from - 1] = acc[from - 1].slice(0, -count);
		return acc;
	}, state);
	return newState.map((row) => row[row.length - 1]).join('');
};
const processInput = (input: string): any => {
	const [rawState, rawInstructions] =
		input.split('\n\n')
			.filter((v) => !!v);
	const instructions = rawInstructions.split('\n').map((v) => v.trim().split(/(move|to|from)/g)).map(([_, __, a, ___, b, ____, c]) => [a, b, c].map(Number));
	const state = rawState.split('\n').slice(0, -1).reduce((acc, row) => {
		_.chunk(row.split(''), 4).forEach((crate, i) => {
			if (crate[1] != ' ') acc[i] = acc[i] ? [crate[1], ...acc[i]] : [crate[1]];
		});
		return acc;
	}, []);
	return [state, instructions];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 'CMZ');

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 'TGWSMRBPN');
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 'MCD');

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 'TZLTLWRNF');
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}