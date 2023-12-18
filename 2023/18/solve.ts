import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const DIR = {
	R: [1, 0],
	U: [0, -1],
	L: [-1, 0],
	D: [0, 1],
};

const toPolygon = instr =>
	instr.reduce(
		([curr, ...rest], [d, r]) => [
			DIR[d].map((d, i) => curr[i] + r * d),
			curr,
			...rest,
		],
		[[0, 0]]
	);

const polygonArea = polygon =>
	polygon.reduce(
		(area, [x, y], i, self, [px, py] = self.at(i - 1)) =>
			area +
			Math.abs(px - x) +
			Math.abs(py - y) +
			(px + x) * (py - y),
		2
	) / 2;

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const polygon = toPolygon(arr);
	const area = polygonArea(polygon);
	return area;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr].map(([, , hex]) => [
		"RDLU"[Number(hex.slice(-2, -1))],
		parseInt(hex.slice(2, -2), 16),
	]);
	const polygon = toPolygon(arr);
	const area = polygonArea(polygon);
	return area;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(' '))
			.filter((v) => !!v)
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 62);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 952408144115);

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