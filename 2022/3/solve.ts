import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const getPriority = (char: string) => {
	const asciiCode = char.charCodeAt(0);
	if (asciiCode <= 90) return asciiCode - 38;
	return asciiCode - 96;
};

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const commons = arr.map((sack) => {
		const [firstHalf, secondHalf] = [sack.slice(0, sack.length / 2), sack.slice(sack.length / 2)];
		return _.intersection(firstHalf, secondHalf)[0] as string;
	});
	const priorities = commons.map(getPriority);
	return _.sum(priorities);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const groups = _.chunk(arr, 3);
	const common = groups.map(([sack1, sack2, sack3]) => {
		return _.intersection(_.intersection(sack1, sack2), sack3)[0] as string;
	});
	const priorities = common.map(getPriority);
	return _.sum(priorities);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(sack => sack.split(''));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 157);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 7850);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 70);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2581);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}