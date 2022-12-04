import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const contains = arr.map(([elf1, elf2]) => {
		const elf1Range = _.range(elf1[0], elf1[1] + 1);
		const elf2Range = _.range(elf2[0], elf2[1] + 1);
		const intersection = _.intersection(elf1Range, elf2Range);
		const smallerRangeLength = Math.min(elf1Range.length, elf2Range.length);
		return intersection.length === smallerRangeLength;
	});
	return contains.filter(Boolean).length;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const contains = arr.map(([elf1, elf2]) => {
		const elf1Range = _.range(elf1[0], elf1[1] + 1);
		const elf2Range = _.range(elf2[0], elf2[1] + 1);
		const intersection = _.intersection(elf1Range, elf2Range);
		return !!intersection.length;
	});
	return contains.filter(Boolean).length;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(line => line.split(',').map(n => n.split('-').map(Number)));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 2);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 547);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 4);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 843);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}