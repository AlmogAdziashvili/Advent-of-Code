import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

const move = (arr: string[][], type: '>' | 'v'): [string[][], number] => {
	const moveableSourceAndDestinations = arr.reduce((acc, line, y) => {
		return [...acc, ...line.reduce((acc, cell, x) => {
			if (cell !== type) return acc;
			const dest = type === '>' ? [y, x + 1 === line.length ? 0 : x + 1] : [y + 1 === arr.length ? 0 : y + 1, x];
			if (arr[dest[0]][dest[1]] !== '.') return acc;
			return [...acc, [[y, x], dest]];
		}, [])];
	}, []);
	const postMoveArr = moveableSourceAndDestinations.reduce((acc, [s, d]) => {
		const newAcc = [...acc];
		newAcc[s[0]][s[1]] = '.';
		newAcc[d[0]][d[1]] = type;
		return newAcc;
	}, arr);
	return [postMoveArr, moveableSourceAndDestinations.length];
}

export const solve1 = (_arr: any[]): any => {
	let arr = [..._arr];
	let count = 0;
	while (true) {
		count += 1;
		const [postEastMoveArr, eastMovesCount] = move(arr, '>');
		const [postSouthMoveArr, southMovesCount] = move(postEastMoveArr, 'v');
		if (!(eastMovesCount + southMovesCount)) return count;
		arr = postSouthMoveArr;
	}
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(''))
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 58);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 412);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
}