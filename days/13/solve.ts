import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const printBoard = (arr: string[][]) => {
	arr.forEach(row => {
		console.log(row.join('').replace(/\./g, ' '));
	});
}

const foldHor = (arr: (string | undefined)[][]) => (y: number) => {
	const chunk1 = arr.slice(0, y);
	const chunk2PreFill = arr.slice(y + 1).reverse();
	const chunk2Fill = _.range(chunk1.length - chunk2PreFill.length).map(__ => _.range(chunk1[0].length).map(___ => '.'));
	const chunk2 = [...chunk2Fill, ...chunk2PreFill];
	return chunk1.map((row, y) => row.map((value, x) => value === '#' ? '#' : chunk2[y][x]));
};

const executeFolds = (instructions: string[], arr: string[][]) => {
	if (!instructions.length) return arr;
	const inst = instructions[0];
	const axis = parseInt(inst.substring(inst.indexOf('=') + 1));
	if (inst.includes('y=')) {
		const next = foldHor(arr)(axis);
		return executeFolds(instructions.slice(1), next);
	}
	if (inst.includes('x=')) {
		const transposed = _.zip(...arr);
		const transposedNext = foldHor(transposed)(axis);
		const next = _.zip(...transposedNext);
		return executeFolds(instructions.slice(1), next);
	}
};

export const solve1 = (matrix: string[][], instructions: string[]): any => {	
	const firstInstruction = instructions.slice(0, 1);
	return _.flatten(executeFolds(firstInstruction, matrix)).filter(c => c === '#').length;
};

export const solve2 = (matrix: string[][], instructions: string[]): any => {
	return executeFolds(instructions, matrix);
};

const processInput = (input: string): [string[][], string[]] => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	
	const points = n[0].split('\n').map(n => n.split(',').map(Number));
	const matrix = points.reduce<string[][]>((acc, p) => {
		const newA = [...acc];
		if (!newA[p[1]]) newA[p[1]] = [];
		newA[p[1]][p[0]] = '#';
		return newA;
	}, []);

	const longestRow = _.maxBy(matrix, (a => a?.length)).length;
	const finalMatrix = matrix.map(a => _.range(longestRow).map(x => (a && a[x]) || '.'));

	const instructions = n[1].split('\n');

	return [finalMatrix, instructions];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(...processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 17);

		const result = solve1(...processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 638);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(...processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, null);

		const result = solve2(...processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(...processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', printBoard(solve2(...processInput(puzzleInput))));
	console.timeEnd('part2');
}