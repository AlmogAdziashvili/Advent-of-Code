import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[], Y: number): any => {
	const arr = [..._arr];

	const allElementsInY = arr.reduce((acc, { sX, sY, bX, bY }) => {
		const newSet = new Set(acc);
		if (sY === Y) {
			newSet.add(sX);
		}
		if (bY === Y) {
			newSet.add(bX);
		}
		return newSet;
	}, new Set());

	const impossibleIndexes = arr.reduce((acc, { sX, sY, bX, bY }) => {
		const newSet = new Set(acc);
		const distance = Math.abs(sX - bX) + Math.abs(sY - bY);
		const distanceToRow = Math.abs(sY - Y);
		if (distance >= distanceToRow) {
			const delta = distance - distanceToRow;
			_.range(sX - delta, sX + delta + 1).forEach((x) => {
				if (!allElementsInY.has(x)) {
					newSet.add(x);
				}
			});
		}
		return newSet;
	}, new Set());

	return impossibleIndexes.size;
};

export const solve2 = (_arr: any[], Y: number): any => {
	const arr = [..._arr];
	let foundFlag = false;


	function testPosition ([x, y]) {
		if (x < 0) return false
		if (y < 0) return false
		if (x > Y * 2) return false
		if (y > Y * 2) return false
		for (const { sX, sY, bX, bY } of arr) {
			const distance = Math.abs(sX - bX) + Math.abs(sY - bY);
			const distanceS = Math.abs(sX - x) + Math.abs(sY - y);
			const distanceB = Math.abs(bX - x) + Math.abs(bY - y);
			if (distanceS <= distance || distanceB == 0) {
				return false
			}
		}
		console.log('solution: ');
		console.log(x * 4000000 + y);
		return true
	}

	for (const { sX, sY, bX, bY } of arr) {
		const distance = Math.abs(sX - bX) + Math.abs(sY - bY) + 1;
		_.range(0, distance).forEach((i) => {
			if (testPosition([sX + i, sY - distance + i])
				|| testPosition([sX + distance - i, sY + i])
				|| testPosition([sX - i, sY + distance - i])
				|| testPosition([sX - distance + i, sY - i])) {
				foundFlag = true;
			};
		});
	}
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(l => ({
		sX: Number(l.split('Sensor at x=')[1].split(',')[0]),
		sY: Number(l.split(', y=')[1].split(':')[0]),
		bX: Number(l.split(': closest beacon is at x=')[1].split(',')[0]),
		bY: Number(l.split(', y=')[2].split(')')[0]),
	}));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput), 10);
		testResult; //?
		assert.deepEqual(testResult, 26);

		const result = solve1(processInput(puzzleInput), 2000000);
		result; //?
		assert.deepEqual(result, 4985193);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput), 10);
		testResult; //?
		assert.deepEqual(testResult, null);

		const result = solve2(processInput(puzzleInput), 10);
		result; //?
		assert.deepEqual(result, null);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput), 2000000));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput), 2000000));
	console.timeEnd('part2');
}