import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const INPUT = 5;

const opToSizeMap = {
	1: 4,
	2: 4,
	3: 2,
	4: 2,
	5: 3,
	6: 3,
	7: 4,
	8: 4,
	99: 1,
};

function compiler (program: number[], ip = 0): number[] {
	const [m3, m2, m1, ...rawOp] = program[ip].toString().padStart(5, '0').split('').map(Number);
	
	const op = Number(rawOp.join(''));
	const a = program[ip + 1];
	const b = program[ip + 2];
	const c = program[ip + 3];
	const valA = m1 ? a : program[a];
	const valB = m2 ? b : program[b];
	const valC = m3 ? c : program[c];
	
	switch (op) {
		case 1:
			program[c] = valA + valB;
			break;
		case 2:
			program[c] = valA * valB;
			break;
		case 3:
			program[a] = INPUT;
			break;
		case 4:
			if (valA !== 0) console.log(valA);
			break;
		case 5:
			if (valA !== 0) return compiler(program, valB);
			break;
		case 6:
			if (valA === 0) return compiler(program, valB);
			break;
		case 7:
			program[c] = valA < valB ? 1 : 0;
			break;
		case 8:
			program[c] = valA === valB ? 1 : 0;
			break;
		case 99:
			return program;
		default:
			throw new Error(`Unknown opcode ${op}`);
	}
	return compiler(program, ip + opToSizeMap[op]);
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
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
	it('Part 1', () => {
		solve1(processInput(puzzleInput));
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}