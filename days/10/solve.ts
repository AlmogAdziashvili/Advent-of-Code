import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const match = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>'
};

const calcSolve1Result = (result: Record<string, number>) => result[')'] * 3 + result[']'] * 57 + result['}'] * 1197 + result['>'] * 25137;

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const result = arr.reduce((acc, cur) => {
		const stack = [];
		const breaker = cur.split('').find(c => {
			if (Object.keys(match).includes(c)) {
				stack.push(c);
				return false;
			} else if (match[stack.pop()] !== c) {
				return true;
			}
		})
		return breaker ? { ...acc, [breaker]: acc[breaker] + 1 } : acc;
	}, { ')': 0, ']': 0, '}': 0, '>': 0 });
	return calcSolve1Result(result);
};

const getScore = { ')': 1, ']': 2, '}': 3, '>': 4 };

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const validLinesCompletion = arr.reduce((acc, cur) => {
		const stack = [];
		const breaker = cur.split('').find(c => {
			if (Object.keys(match).includes(c)) {
				stack.push(c);
				return false;
			} else if (match[stack.pop()] !== c) {
				return true;
			}
		})
		return breaker ? acc : [...acc, stack.map(c => match[c]).reverse()];
	}, []);
	const validLinesCompletionScores = validLinesCompletion.map(lineCompletion => {
		return lineCompletion.reduce((sum, char) => {
			return sum * 5 + getScore[char];
		}, 0);
	});
	const medianIndex = (validLinesCompletionScores.length - 1) / 2;
	return _.sortBy(validLinesCompletionScores)[medianIndex];
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);

	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 26397);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 311949);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 288957);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 3042730309);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}