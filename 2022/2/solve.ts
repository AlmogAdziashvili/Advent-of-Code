import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import { map, sum } from 'lodash';

enum handMap {
	'X' = 'A',
	'Y' = 'B',
	'Z' = 'C',
	'A' = 'X',
	'B' = 'Y',
	'C' = 'Z',
};

enum winMap {
	'X' = 'C',
	'Y' = 'A',
	'Z' = 'B',
	'C' = 'X',
	'A' = 'Y',
	'B' = 'Z',
};

enum loseMap {
	'A' = 'Z',
	'B' = 'X',
	'C' = 'Y',
	'X' = 'B',
	'Y' = 'C',
	'Z' = 'A',
};

const scoreMap = {
	'X': 1,
	'Y': 2,
	'Z': 3,
};

const getTurnScore = (turn: string[]): number => {
	const [enemy, player] = turn;
	if (enemy === handMap[player]) return 3 + scoreMap[player];
	if (winMap[player] === enemy) return 6 + scoreMap[player];
	return scoreMap[player];
};

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const scores = map(arr, getTurnScore);
	return sum(scores);
};

// Part 2
const getPlayerHand = (outcome: string, enemy: string) => {
	if (outcome === 'X') return loseMap[enemy];
	if (outcome === 'Y') return handMap[enemy];
	return winMap[enemy];
};

const getTurnScore2 = (turn: string[]): number => {
	const [enemy, outcome] = turn;
	const player = getPlayerHand(outcome, enemy);
	if (outcome === 'X') return scoreMap[player];
	if (outcome === 'Y') return 3 + scoreMap[player];
	return 6 + scoreMap[player];
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const scores = map(arr, getTurnScore2);
	return sum(scores);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(turn => turn.split(' '));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 15);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 12156
			);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 12);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 10835);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}