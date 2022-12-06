import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve = (_arr: any[], n: number): any => {
	const arr = [..._arr];
	const isStartOfPacket = _.range(n - 1, arr.length).map((i) => {
		const sub = arr.slice(i - n + 1, i + 1);
		return sub.length === _.uniq(sub).length;
	});
	const firstStartOfPacket = isStartOfPacket.indexOf(true);
	return firstStartOfPacket + n;
};

const processInput = (input: string): any => {
	const n =
		input.split('')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve(processInput(exampleInput), 4);
		testResult; //?
		assert.deepEqual(testResult, 11);

		const result = solve(processInput(puzzleInput), 4);
		result; //?
		assert.deepEqual(result, 1080);
	});

	it.skip('Part 2', () => {
		const testResult = solve(processInput(exampleInput), 14);
		testResult; //?
		assert.deepEqual(testResult, 26);

		const result = solve(processInput(puzzleInput), 14);
		result; //?
		assert.deepEqual(result, 3645);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}