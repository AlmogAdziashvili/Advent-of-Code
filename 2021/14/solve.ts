import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const getNewKeys = (pair: string, newChar: string) => [pair[0] + newChar, newChar + pair[1]]

const solve = (map: Record<string, string>, pairsCount: Record<string, number>, charsCount: Record<string, number>, round: number) => {
	const newCharsCount = { ...charsCount };
	const newPairs = _.keys(pairsCount).reduce((acc, key) => {
		const [key1, key2] = getNewKeys(key, map[key]);
		newCharsCount[map[key]] = (newCharsCount[map[key]] || 0) + pairsCount[key];
		return ({ ...acc, [key1]: (acc[key1] || 0) + pairsCount[key], [key2]: (acc[key2] || 0) + pairsCount[key] });
	}, {});
	return round === 1 ? newCharsCount : solve(map, newPairs, newCharsCount, round - 1);
}

export const solve1 = (pairsCount: Record<string, number>, charsCount: Record<string, number>, map: Record<string, string>): any => {
	const res = solve(map, pairsCount, charsCount, 10);
	const values = _.values(res);
	return _.max(values) - _.min(values);
};

export const solve2 = (pairsCount: Record<string, number>, charsCount: Record<string, number>, map: Record<string, string>): any => {
	const res = solve(map, pairsCount, charsCount, 40);
	const values = _.values(res);
	return _.max(values) - _.min(values);
};

const processInput = (input: string): [Record<string, number>, Record<string, number>, Record<string, string>] => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);

	const pairsCount = _.countBy(n[0].split('').map((a, i) => n[0].slice(i, i + 2)).slice(0, n[0].length - 1));
	const map = n[1].split('\n').map(n => n.split(' -> ')).reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
	const charsCount = _.countBy(n[0]);
	return [pairsCount, charsCount, map];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(...processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1588);

		const result = solve1(...processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2621);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(...processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 2188189693529);

		const result = solve2(...processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2843834241366);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(...processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(...processInput(puzzleInput)));
	console.timeEnd('part2');
}