import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const dir = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const steps = 100;
	const startingRowIndex = arr.findIndex(r => r.includes('S'));
	let possibleSteps = [`${startingRowIndex},${arr[startingRowIndex].indexOf('S')}`];
	arr[startingRowIndex] = arr[startingRowIndex].replace('S', '.');
	for (let i = 0; i < steps; i++) {
		const newPossibleSteps = {};
		for (const step of possibleSteps) {
			for (const { x: dx, y: dy } of dir) {
				const [y, x] = step.split(',').map(Number);
				if (!newPossibleSteps[`${y + dy},${x + dx}`] && arr[(y + dy + arr.length * 20) % arr.length][(x + dx + arr[0].length * 20) % arr[0].length] === '.') {
					newPossibleSteps[`${y + dy},${x + dx}`] = true;
				}
			}
		}
		Object.keys(newPossibleSteps).length - possibleSteps.length //?
		possibleSteps = Object.keys(newPossibleSteps);
	}
	return possibleSteps.length;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult;
		assert.deepEqual(testResult, null);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, null);

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