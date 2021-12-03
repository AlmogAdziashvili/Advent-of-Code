import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const finalPosition = arr.reduce(({ depth, horizontalPosition }, { cmd, amount }) => {
		switch (cmd) {
			case 'forward':
				return { depth, horizontalPosition: horizontalPosition + amount };
			case 'up':
				return { horizontalPosition, depth: depth - amount };
			case 'down':
				return { horizontalPosition, depth: depth + amount };
		}
	}, { depth: 0, horizontalPosition: 0 });

	return finalPosition.depth * finalPosition.horizontalPosition;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const finalPosition = arr.reduce(({ depth, horizontalPosition, aim }, { cmd, amount }) => {
		switch (cmd) {
			case 'forward':
				return { aim, depth: depth + (amount * aim), horizontalPosition: horizontalPosition + amount };
			case 'up':
				return { horizontalPosition, depth, aim: aim - amount };
			case 'down':
				return { horizontalPosition, depth, aim: aim + amount };
		}
	}, { depth: 0, horizontalPosition: 0, aim: 0 });

	return finalPosition.depth * finalPosition.horizontalPosition;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(line => line.split(' ')).map(([cmd, amount]) => ({ cmd, amount: parseInt(amount) }));

	return n;
};

describe.skip('Part 1', () => {
	it('Test Case 1', () => {
		const result = solve1(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 150);
	});

	it('Result', () => {
		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2187380);
	});
});

describe.skip('Part 2', () => {
	it('Test Case 1', () => {
		const result = solve2(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 900);
	});

	it('Result', () => {
		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2086357770);
	});
});

