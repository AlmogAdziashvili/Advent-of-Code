import { puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const numberIncludesTwoAdjacentDigits = (n: number): boolean => {
	const digits = n.toString().split('');
	const adjacentDigits = _.zip(_.initial(digits), _.tail(digits));
	return adjacentDigits.some(([a, b]) => _.isEqual(a, b));
};

const numberIncludesTwoAdjacentDigitsButNotMore = (n: number): boolean => {
	const digits = n.toString().split('');
	const adjacentDigits = _.zip(_.initial(digits), _.tail(digits));
	return adjacentDigits.some(([a, b]) => _.isEqual(a, b) && !n.toString().includes(a.repeat(3)));
};

const numberDigitsAscending = (n: number): boolean => {
	const digits = n.toString().split('');
	const sortedDigits = _.sortBy(digits);
	return _.isEqual(digits, sortedDigits);
};

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const range = _.range(arr[0], arr[1] + 1);
	const matchCriteria = range.map((n) => numberIncludesTwoAdjacentDigits(n) && numberDigitsAscending(n));
	return matchCriteria.filter(Boolean).length;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const range = _.range(arr[0], arr[1] + 1);
	const matchCriteria = range.map((n) => numberIncludesTwoAdjacentDigitsButNotMore(n) && numberDigitsAscending(n));
	return matchCriteria.filter(Boolean).length;
};

const processInput = (input: string): any => {
	const n =
		input.split('-')
			.map(n => n.trim())
			.map(Number)
			.filter((v) => !!v)
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1653);
	});

	it.skip('Part 2', () => {
		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1133);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}