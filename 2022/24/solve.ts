import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	let [walls, blizzards, start, exit, X, Y] = [..._arr];

	let minutes = 0;
	const queue = [start];
	while (true) {
		minutes += 1
		blizzards = blizzards.map(([px, py, dx, dy]: any) => {
			return [(px + minutes * dx) % X, (py + minutes * dy) % Y, dx, dy];
		});
		queue.forEach(([px, py]: any) => {
			[[1, 0], [0, 1], [-1, 0], [0, -1], [0, 0]].forEach(([dx, dy]: any) => {
				if (!queue.find(([x, y]) => `${x},${y}` === `${px + dx},${py + dy}`) && !blizzards.find(([x, y]) => `${x},${y}` === `${px + dx},${py + dy}`) && !walls.find(([x, y]) => `${x},${y}` === `${px + dx},${py + dy}`)) {
					queue.push([px + dx, py + dy]);
				}
			});
		});
		if (queue.find(([x, y]) => `${x},${y}` === `${exit[0]},${exit[1]}`)) {
			return minutes;
		}
	}
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr;
};

const processInput = (input: string): any => {
	const walls = [];
	const blizzards = [];
	input.split('\n').forEach((l, y) => {
		l.split('').forEach((c, x) => {
			if (c == '#') walls.push([x - 1, y - 1]);
			if (c == '>') blizzards.push([x - 1, y - 1, +1, 0]);
			if (c == '<') blizzards.push([x - 1, y - 1, -1, 0]);
			if (c == '^') blizzards.push([x - 1, y - 1, 0, -1]);
			if (c == 'v') blizzards.push([x - 1, y - 1, 0, +1]);
		})
	});
	const X = _.max(walls.map(([x, y]: any) => x));
	const Y = _.max(walls.map(([x, y]: any) => y));
	_.range(-1, 3).forEach(x => walls.push([x, -2]));
	_.range(X - 3, X + 2).forEach(x => walls.push([x, Y + 1]));
	const start = [0, -1];
	const exit = [X - 1, Y];
	return [walls, blizzards, start, exit, X, Y];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		// const testResult = solve1(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, null);

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