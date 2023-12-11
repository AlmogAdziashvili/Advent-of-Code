import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function nextValuePredict (arr: number[]) {
	const arrays = [arr];
	while (!arrays[arrays.length - 1].every(n => n === 0)) {
		const lastArr = arrays[arrays.length - 1];
		const nextArr = _.zip(lastArr.slice(0, -1), lastArr.slice(1)).map(([a, b]) => b - a);
		arrays.push(nextArr);
	}
	for (let i = arrays.length - 2; i >= 0; i--) {
		const array = arrays[i];
		array.push(array[array.length - 1] + arrays[i + 1][arrays[i + 1].length - 1])
	}
	return arrays[0][arrays[0].length - 1];
}

function previousValuePredict (arr: number[]) {
	const arrays = [arr];
	while (!arrays[arrays.length - 1].every(n => n === 0)) {
		const lastArr = arrays[arrays.length - 1];
		const nextArr = _.zip(lastArr.slice(0, -1), lastArr.slice(1)).map(([a, b]) => b - a);
		arrays.push(nextArr);
	}
	for (let i = arrays.length - 2; i >= 0; i--) {
		const array = arrays[i];
		array.unshift(array[0] - arrays[i + 1][0])
	}
	return arrays[0][0];
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const predictions = arr.map(nextValuePredict);
	return _.sum(predictions);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const predictions = arr.map(previousValuePredict);
	return _.sum(predictions);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(v => v.split(' ').map(Number))
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 114);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 2);

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