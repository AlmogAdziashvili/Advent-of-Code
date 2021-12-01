import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr.filter((a, i, b) => i > 0 ? b[i - 1] < a : false).length;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr
		.filter((a, i, b) => i > 0
			? (b[i - 1] + b[i - 2] + b[i - 3]) < (a + b[i - 1] + b[i - 2])
			: false)
		.length;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(Number);
	return n;
};

describe.skip('Part 1', () => {
	it('Test Case 1', () => {
		const result = solve1(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 7);
	});

	it('Result', () => {
		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
});

describe.skip('Part 2', () => {
	it('Test Case 1', () => {
		const result = solve2(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 5);
	});

	it('Result', () => {
		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
});

