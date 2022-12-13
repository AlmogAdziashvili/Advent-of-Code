import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _, { isNumber } from 'lodash';

function isPackagesValid ([left, right]: [(number | number[])[], (number | number[])[]]): boolean | 'maybe' {
	let leftVal = _.head(left);
	let rightVal = _.head(right);

	if (leftVal === undefined && rightVal === undefined) return 'maybe';
	if (leftVal === undefined) return true;
	if (rightVal === undefined) return false;

	if (isNumber(leftVal) && isNumber(rightVal)) {
		if (leftVal < rightVal) {
			return true;
		}
		if (leftVal > rightVal) {
			return false;
		}
		return isPackagesValid([left.slice(1), right.slice(1)]);
	}

	if (isNumber(rightVal)) {
		rightVal = [rightVal];
	}
	if (isNumber(leftVal)) {
		leftVal = [leftVal];
	}
	const result = isPackagesValid([leftVal, rightVal])
	return result === 'maybe' ? isPackagesValid([left.slice(1), right.slice(1)]) : result;
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const validPackagesIndexesSum = _.sum(arr.map((packages, i) => isPackagesValid(packages) ? i + 1 : 0));
	return validPackagesIndexesSum;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const decoder1 = [[2]];
	const decoder2 = [[6]];

	const sorted = arr.reduce((acc, [a, b]) => ([...acc, a, b]), [decoder1, decoder2]).sort((a, b) => isPackagesValid([a, b]) ? -1 : 1);

	const indexOfDecoder1 = sorted.map(JSON.stringify).indexOf(JSON.stringify([[2]])) + 1;
	const indexOfDecoder2 = sorted.map(JSON.stringify).indexOf(JSON.stringify([[6]])) + 1;
	return indexOfDecoder1 * indexOfDecoder2;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(l => l.split('\n').map(j => JSON.parse(j)));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 13);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 5198);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 140);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 22344);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}