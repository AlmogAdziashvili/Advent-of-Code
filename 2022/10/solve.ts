import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const cycles = arr.reduce((acc, instruction, i) => {
		const [inst, value] = instruction.split(' ');
		const lastValue = acc[acc.length - 1];
		switch (inst) {
			case 'noop': 
				return [...acc, lastValue];
			case 'addx':
				return [...acc, lastValue, lastValue + Number(value)];
		}
	}, [1]);

	const signalStrengths = cycles.map((v, i) => v * (i + 1));
	const filteredSignals = signalStrengths.filter((_, i) => (i + 21) % 40 == 0 && i < 220) //?
	return _.sum(filteredSignals);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const cycles = arr.reduce((acc, instruction, i) => {
		const [inst, value] = instruction.split(' ');
		const lastValue = acc[acc.length - 1];
		switch (inst) {
			case 'noop': 
				return [...acc, lastValue];
			case 'addx':
				return [...acc, lastValue, lastValue + Number(value)];
		}
	}, [1]);

	const pixels = cycles.reduce((acc, position, _i) => {
		const i = _i % 40; 
		if ((i+1) >= position && (i+1) < (position + 3)) {
			return [...acc, '#'];
		}
		return [...acc, '.'];
	}, []);
	return _.chunk(pixels, 40).map((row) => row.join('')).join('\n');
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		assert.deepEqual(testResult, 13140);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 14320);
	});

	it.skip('Part 2', () => {
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