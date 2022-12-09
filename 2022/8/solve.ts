import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const horizontal = arr.reduce((acc, _line, i) => {
		const line = [..._line];
		const TreesSeenL = line.map((h, j) => line.slice(0, j).every(h2 => h2 < h) ? `${i},${j}` : null).filter(Boolean);
		const TreesSeenR = line.reverse().map((h, j) => line.slice(0, j).every(h2 => h2 < h) ? `${i},${line.length - 1 - j}` : null).filter(Boolean);
		return [...acc, ...(new Set([...TreesSeenL, ...TreesSeenR]))];
	}, []);

	const vertical = _.zip(...arr).reduce((acc, _line, j) => {
		const line = [..._line];
		const TreesSeenA = line.map((h, i) => line.slice(0, i).every(h2 => h2 < h) ? `${i},${j}` : null).filter(Boolean);
		const TreesSeenB = line.reverse().map((h, i) => line.slice(0, i).every(h2 => h2 < h) ? `${line.length - 1 - i},${j}` : null).filter(Boolean);
		return [...acc, ...(new Set([...TreesSeenA, ...TreesSeenB]))];
	}, []);

	return [...new Set([...horizontal, ...vertical])].length;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const transposed = _.zip(...arr);
	const scenicScores = _.range(0, arr.length).map(i => {
		return _.range(0, arr[i].length).map(j => {
			if (i === 0 || i === arr.length - 1 || j === 0 || j === arr[i].length - 1) return 0;
			const left = arr[i].slice(0, j).reverse();
			const right = arr[i].slice(j + 1);
			const above = transposed[j].slice(0, i).reverse();
			const below = transposed[j].slice(i + 1);

			const h = arr[i][j];
			const leftCount = (left.findIndex(h2 => h2 >= h) + 1) || left.length;
			const rightCount = (right.findIndex(h2 => h2 >= h) + 1) || right.length;
			const aboveCount = (above.findIndex(h2 => h2 >= h) + 1) || above.length;
			const belowCount = (below.findIndex(h2 => h2 >= h) + 1) || below.length;
			return leftCount * rightCount * aboveCount * belowCount;
		});
	});
	return _.max(scenicScores.map(_.max));
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(l => l.split('').map(Number));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 21);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1812);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 8);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 315495);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}