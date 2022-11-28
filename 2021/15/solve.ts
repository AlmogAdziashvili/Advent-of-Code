import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import Heap from 'heap-js';
import _ from 'lodash';

const createCostMap = (arr: number[][], dimensions: number) => _.range(arr.length * dimensions).map(__ => _.range(arr[0].length * dimensions).map(_ => null));
const outOfRange = (arr: number[][], dimensions: number, row: number, col: number) =>
	row < 0 || col < 0 || row >= arr.length * dimensions || col >= arr[0].length * dimensions;

export const searchBestPath = (dimensions: number) => (arr: number[][]) => {
	const map = createCostMap(arr, dimensions);
	const heap = new Heap<[number, number, number]>((a, b) => a[0] > b[0] ? 1 : -1);
	heap.push([0, 0, 0]);
	while (heap.length) {
		const [dist, row, col] = heap.pop();
		if (outOfRange(arr, dimensions, row, col)) continue;
		let risk = arr[row % arr.length][col % arr[0].length] + Math.floor(row / arr.length) + Math.floor(col / arr[0].length);
		while (risk > 9) risk -= 9;
		const cost = dist + risk;
		if (map[row][col] === null || cost < map[row][col]) {
			map[row][col] = cost;
		} else continue;
		if (row === dimensions * arr.length - 1 && col === dimensions * arr[0].length - 1) break;
		const newCost = map[row][col];
		heap.push([newCost, row - 1, col], [newCost, row, col + 1], [newCost, row + 1, col], [newCost, row, col - 1]);
	}
	return map[dimensions * arr.length - 1][dimensions * arr[0].length - 1] - arr[0][0];
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	return searchBestPath(1)(arr);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return searchBestPath(5)(arr);
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
		assert.deepEqual(testResult, 40);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 503);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 315);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2853);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}