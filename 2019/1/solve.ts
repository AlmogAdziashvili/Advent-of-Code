import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const fuelNeeded = _.map(arr, x => _.floor(x / 3) - 2);
	return _.sum(fuelNeeded);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const unRegulatedFuelNeeded = _.map(arr, x => _.floor(x / 3) - 2);
	const fuelNeeded = _.map(unRegulatedFuelNeeded, x => x < 0 ? 0 : x);
	if (_.some(fuelNeeded, x => x > 0)) {
		return _.sum(fuelNeeded) + solve2(fuelNeeded);
	}
	return _.sum(fuelNeeded);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 966);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 3330521);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 966);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 4992931);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}