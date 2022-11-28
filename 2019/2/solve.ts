import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function compiler (program: number[], ip = 0) {
	const op = program[ip];
	const a = program[ip + 1];
	const b = program[ip + 2];
	const c = program[ip + 3];
	switch (op) {
		case 1:
			program[c] = program[a] + program[b];
			break;
		case 2:
			program[c] = program[a] * program[b];
			break;
		case 99:
			return program;
		default:
			throw new Error(`Unknown opcode ${op}`);
	}
	return compiler(program, ip + 4);
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	arr[1] = 12;
	arr[2] = 2;
	return compiler(arr)[0];
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	for (let verb = 0; verb < 100; verb++) {
		for (let noun = 0; noun < 100; noun++) {
			const program = [...arr];
			program[1] = noun;
			program[2] = verb;
			const result = compiler(program)[0];
			if (result === 19690720) {
				return 100 * noun + verb;
			}
		}
	}
	return arr;
};

const processInput = (input: string): any => {
	const n =
		input.split(',')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2692315);
	});

	it.skip('Part 2', () => {
		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 9507);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}