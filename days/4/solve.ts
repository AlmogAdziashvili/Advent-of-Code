import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const hasBoardWon = (board: number[][], numbers: number[]) => {
	const transposed = _.zip(...board);
	const rowsAndCols = [...board, ...transposed].map(a => a.map(Number));
	return rowsAndCols.some(l => _.intersection(numbers, l).length === l.length);
}

const calcBoard = (board: number[][], drawnNumbers: number[]) => {
	const boardNumbers = _.flatten(board).map(Number);
	const diff = _.difference(boardNumbers, drawnNumbers);
	return _.sum(diff);
}

const playUntilWin = (boards: number[][][], allNumbers: number[], index = 1) => {
	const drawnNumbers = _.take(allNumbers, index);
	const winner = boards.find(b => hasBoardWon(b, drawnNumbers));
	if (winner) return calcBoard(winner, drawnNumbers) * _.last(drawnNumbers);
	return playUntilWin(boards, allNumbers, index + 1);
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const numbers = arr[0].split(',').map(Number);
	const boards = arr.slice(1).map(b => b.split('\n').map(r => r.split(' ').filter(Boolean)));
	return playUntilWin(boards, numbers);
};

const playUntilLastWin = (boards: number[][][], allNumbers: number[], index = 1) => {
	const drawnNumbers = _.take(allNumbers, index);
	const winners = boards.filter(b => hasBoardWon(b, drawnNumbers));
	if (boards.length === winners.length) return calcBoard(_.first(boards), drawnNumbers) * _.last(drawnNumbers);
	return playUntilLastWin(_.difference(boards, winners), allNumbers, index + 1);
}

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const numbers = arr[0].split(',').map(Number);
	const boards = arr.slice(1).map(b => b.split('\n').map(r => r.split(' ').filter(Boolean)));
	return playUntilLastWin(boards, numbers);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);

	return n;
};

it.skip('Part 1', () => {
	const testResult = solve1(processInput(exampleInput));
	testResult; //?
	assert.deepEqual(testResult, 4512);

	const result = solve1(processInput(puzzleInput));
	result; //?
	assert.deepEqual(result, null);
});

it.skip('Part 2', () => {
	const testResult = solve2(processInput(exampleInput));
	testResult; //?
	assert.deepEqual(testResult, 1924);

	const result = solve2(processInput(puzzleInput));
	result; //?
	assert.deepEqual(result, null);
});

