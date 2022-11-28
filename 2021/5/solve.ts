import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[], includeDiagonal = false): any => {
	const arr = [..._arr];
	const coordinates = arr.reduce((acc, cur) => {
		const [[startX, startY], [endX, endY]] = _.sortBy(cur, point => point[0]);
		if (!includeDiagonal && startX !== endX && startY !== endY) return acc;
		const coordinates = _.zip(_.range(startX, endX + 1), _.range(startY, endY + (endY > startY ? 1 : -1)))
			.map(([x, y]) => ([x ?? startX, y ?? startY]));
		return [...acc, ...coordinates];
	}, []);
	const groups = _.countBy(coordinates);
	return _.values(groups).filter(v => v >= 2).length;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return solve1(arr, true);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(m => m.split(' -> ').map(x => x.split(',').map(Number)));

	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 5);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 6841);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 12);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}
