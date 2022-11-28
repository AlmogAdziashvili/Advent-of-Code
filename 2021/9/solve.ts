import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const getAllAdjValues = (arr, i, j) => {
	const res = [];
	if (i !== 0) res.push(arr[i - 1][j]);
	if (j !== 0) res.push(arr[i][j - 1]);
	if (i !== arr.length - 1) res.push(arr[i + 1][j]);
	if (j !== arr[0].length - 1) res.push(arr[i][j + 1]);
	return res;
}

export const solve1 = (_arr: any[][]): any => {
	const arr = [..._arr];
	const allPositions = _.flatten(_.range(arr.length).map(i => _.range(arr[0].length).map(j => [i, j])));
	const lowestPoints = allPositions.filter(([i, j]) => getAllAdjValues(arr, i, j).every(adj => adj > arr[i][j]));
	const lowestPointsValues = lowestPoints.map(([i, j]) => arr[i][j]);
	const riskLevel = lowestPointsValues.map(_.curry(_.add)(1));
	return _.sum(riskLevel);
};

const findBasin = (arr, point, seen = []) => {
	const points = [];
	const [i, j] = point;
	if (arr[i][j] === 9) return [];
	if (i > 0 && arr[i][j] < arr[i - 1][j]) points.push([i - 1, j]);
	if (j > 0 && arr[i][j] < arr[i][j - 1]) points.push([i, j - 1]);
	if (i < (arr.length - 1) && arr[i][j] < arr[i + 1][j]) points.push([i + 1, j]);
	if (j < (arr[0].length - 1) && arr[i][j] < arr[i][j + 1]) points.push([i, j + 1]);
	const filteredPoint = points.filter(point => !seen.includes(String(point)));
	const newSeen = [...seen, String(point)];
	return _.uniq([...newSeen, ..._.flatten(filteredPoint.map(p => findBasin(arr, p, newSeen)))]);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const allPositions = _.flatten(_.range(arr.length).map(i => _.range(arr[0].length).map(j => [i, j])));
	const lowestPoints = allPositions.filter(([i, j]) => getAllAdjValues(arr, i, j).every(adj => adj > arr[i][j]));
	const basins = lowestPoints.map(point => findBasin(arr, point));
	const biggestBasins = _.sortBy(basins.map(a => a.length)).reverse().slice(0, 3);
	return biggestBasins.reduce(_.multiply);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split('').map(Number))
			.filter((v) => !!v);

	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 15);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 572);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1134);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 847044);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}