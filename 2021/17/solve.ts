import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const isLandingInTarget = (x: number, y: number, [[minX, maxX], [minY, maxY]]: number[][]) => {
	const position = [0, 0];
	let velocityX = x;
	let velocityY = y;
	let result = 0;
	while (position[0] <= maxX && position[1] >= minY) {
		if (_.inRange(position[0], minX, maxX + 1) && _.inRange(position[1], minY, maxY + 1)) return result;
		position[0] += velocityX;
		position[1] += velocityY;
		if (velocityX > 0) velocityX -= 1;
		velocityY -= 1;
		if (position[1] > result) result = position[1];
	}
	return null;
}

export const solve1 = (_arr: number[][]): any => {
	const arr = [..._arr];
	const minimumX = _.range(arr[0][0]).find(i => _.sum(_.range(i + 1)) > arr[0][0]);
	return _.range(200).reduce((acc, y) => {
		const v = isLandingInTarget(minimumX, y, arr);
		return Math.max(v, acc);
	}, 0);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const minimumX = _.range(arr[0][0]).find(i => _.sum(_.range(i + 1)) > arr[0][0]);
	return _.range(minimumX, 200).reduce((acc, x) => {
		return _.range(-200, 200).reduce((acc, y) => {
			const v = isLandingInTarget(x, y, arr);
			if (v !== null) return acc + 1;
			return acc;
		}, acc);
	}, 0);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(',').map(Number))
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 45);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 12561);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 112);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 3785);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}