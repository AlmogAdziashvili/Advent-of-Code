import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const CUBES_QUANTITY = {
	red: 12,
	green: 13,
	blue: 14,
};

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const relevantGames = arr.filter(([_, v]: [number, Record<string, number>[]]) => {
		if (v.some(o => o.red > CUBES_QUANTITY.red || o.green > CUBES_QUANTITY.green || o.blue > CUBES_QUANTITY.blue)) {
			return false;
		}
		return true;
	});
	const relevantGamesNumbers = relevantGames.map(([k, v]) => k);
	return _.sum(relevantGamesNumbers);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const products = arr.map(([_, v]: [number, Record<string, number>[]]) => {
		const minReq = { red: 0, green: 0, blue: 0 };
		v.forEach(o => {
			Object.keys(o).forEach(k => {
				if (minReq[k] < o[k]) {
					minReq[k] = o[k];
				}
			});
		});
		return minReq.blue * minReq.green * minReq.red;
	});
	return _.sum(products);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(v => v.split(': '))
			.map(([k, v]) => [Number(k.split(' ')[1]), v.split('; ').map(v => v.split(', ').reduce((acc, v) => {
				const [key, value] = v.split(' ');
				return { ...acc, [value]: Number(key) };
			}, {}))]);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 8);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 2286);

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