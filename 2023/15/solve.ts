import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	return _.sum(arr.map(v => {
		return v.split('').reduce((acc, cur) => {
			acc += cur.charCodeAt(0);
			acc *= 17;
			acc %= 256;
			return acc;
		}, 0);
	})); //?
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const boxes: string[][] = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].includes('=')) {
			const [label, focal] = arr[i].split('=');
			const boxId = label.split('').reduce((acc, cur) => {
				acc += cur.charCodeAt(0);
				acc *= 17;
				acc %= 256;
				return acc;
			}, 0);
			if (!boxes[boxId]) boxes[boxId] = [];
			const id = boxes[boxId].findIndex(v => v.startsWith(`${label} `));
			if (id > -1) {
				boxes[boxId][id] = [label, focal].join(' ');
			} else {
				boxes[boxId].push([label, focal].join(' '));
			}
		} else {
			const label = arr[i].split('-')[0];
			const boxId = label.split('').reduce((acc, cur) => {
				acc += cur.charCodeAt(0);
				acc *= 17;
				acc %= 256;
				return acc;
			}, 0);
			if (boxes[boxId]) {
				boxes[boxId] = boxes[boxId].filter(v => !v.startsWith(`${label} `));
			}
		}
	}
	return boxes.reduce((acc, box, boxI) => {
		if (box) {
			return acc + box.reduce((_acc, cur, itemI) => {
				const [_, focal] = cur.split(' ');
				_acc += (boxI + 1) * (itemI + 1) * Number(focal);
				return _acc;
			}, 0); 
		}
		return acc;
	}, 0);
};

const processInput = (input: string): any => {
	const n =
		input.split(',')
			.map(n => n.trim())
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1320);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 145);

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