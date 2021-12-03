import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const mostCommonBit = (arr: any[]) => (index: number) => {
	const transposed = _.zip(...arr);
	const countOccur = _.countBy(transposed[index]);
	return countOccur['0'] > countOccur['1'] ? 0 : 1;
}

const notBit = (bit: 0 | 1) => 1 - bit;

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const mostCommonBitInIndex = mostCommonBit(arr);

	const gamma = _.range(arr[0].length)
		.map(mostCommonBitInIndex)
		.map(String)
		.join('');
	const epsilon = gamma
		.split('')
		.map(Number)
		.map(notBit)
		.join('');

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

function matchMCB (arr, index = 0) {
	if (arr.length <= 1) return arr[0];
	const mcb = mostCommonBit(arr)(index);
	const filteredArray = arr.filter(value => value[index] === mcb.toString());
	return matchMCB(filteredArray, index + 1);
}

function matchLCB (arr, index = 0) {
	if (arr.length <= 1) return arr[0];
	const lcb = notBit(mostCommonBit(arr)(index));
	const filteredArray = arr.filter(value => value[index] === lcb.toString());
	return matchLCB(filteredArray, index + 1);
}

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];

	const oxygen = matchMCB(arr).join('');
	const co2 = matchLCB(arr).join('');

	return parseInt(oxygen, 2) * parseInt(co2, 2);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(line => line.split(''));

	return n;
};

it('Part 1', () => {
	const testResult = solve1(processInput(exampleInput));
	testResult; //?
	assert.deepEqual(testResult, 198);

	const result = solve1(processInput(puzzleInput));
	result; //?
	assert.deepEqual(result, 2003336);
});

it('Part 2', () => {
	const testResult = solve2(processInput(exampleInput));
	testResult; //?
	assert.deepEqual(testResult, 230);

	const result = solve2(processInput(puzzleInput));
	result; //?
	assert.deepEqual(result, 1877139);
});

