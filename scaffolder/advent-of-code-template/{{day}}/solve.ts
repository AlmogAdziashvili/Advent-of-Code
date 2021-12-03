import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			// .map(Number);
	return n;
};

it('Part 1', () => {
	const testResult = solve1(processInput(exampleInput));
	testResult; //?
	assert.deepEqual(testResult, null);

	const result = solve1(processInput(puzzleInput));
	result; //?
	assert.deepEqual(result, null);
});

it('Part 2', () => {
	const testResult = solve2(processInput(exampleInput));
	testResult; //?
	assert.deepEqual(testResult, null);

	const result = solve2(processInput(puzzleInput));
	result; //?
	assert.deepEqual(result, null);
});

