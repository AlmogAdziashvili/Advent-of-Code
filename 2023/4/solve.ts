import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const scores = arr.map(([a, b], i) => [i, _.intersection(a, b).length]);
	const instances = new Array(arr.length).fill(0);
	instances //?

	return _.sum(scores);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const scores = arr.map(([a, b], i) => [i, _.intersection(a, b).length]);
	const instances = new Array(arr.length).fill(1);
	scores.forEach(([i, score]) => {
		for (let j = 0; j < score; j++) {
			instances[i + j + 1] += instances[i];
		}
	});
	return _.sum(instances);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n =>
				n.trim()
					.split(': ')[1]
					.split(' | ')
					.map(v => v.split(' ').filter(Boolean))
			)
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 13);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 30);

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