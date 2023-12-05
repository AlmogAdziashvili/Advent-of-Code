import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const positions = arr.reduce((acc, row, y) => {
		row.forEach((val, x) => {
			if (!Number(val) && val !== '.') {
				[-1, 0, 1].forEach((dy) => {
					[-1, 0, 1].forEach((dx) => {
						if (dy === 0 && dx === 0) return;
						acc.push(`${x + dx},${y + dy}`);
					});
				});
			}
		});
		return acc;
	}, []);
	const numbers = arr.reduce((acc, row, y) => {
		let number = 0;
		let isNegative = false;
		let numberIndexes = [];
		row.forEach((val, x) => {
			if (Number(val) || val === '0') {
				if (number === 0 && x > 0 && row[x - 1] === '-') {
					isNegative = true;
				}
				number = number * 10 + Number(val);
				numberIndexes.push(`${x},${y}`);
			} else if (number !== 0) {
				if (numberIndexes.some((v) => positions.includes(v))) {
					acc.push(number * (isNegative ? -1 : 1));
				}
				isNegative = false;
				number = 0;
				numberIndexes = [];
			}
		});
		return acc;
	}, []); //?
	return _.sum(numbers);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(''))
			.filter((v) => !!v)
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 4361);

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