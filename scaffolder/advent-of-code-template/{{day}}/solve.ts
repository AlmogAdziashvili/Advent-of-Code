import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solve = (_arr: any[]): any => {
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

describe('Day', () => {
	it('Test Case 1', () => {
		const result = solve(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, []);
	});

	it('Result', () => {
		const result = solve(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, []);
	});
});

