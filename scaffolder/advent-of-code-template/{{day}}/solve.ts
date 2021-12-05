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

if (globalThis.it) {
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
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}