import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const map: Record<string, boolean> = arr.reduce((map, [x, y, z]) => {
		map[`${x},${y},${z}`] = true;
		return map;
	}, {});
	return arr.reduce((count, current) => {
		return [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]].reduce((innerCount, [x, y, z]) => {
			if (!map[`${current[0] + x},${current[1] + y},${current[2] + z}`]) return innerCount + 1;
			return innerCount;
		}, count);
	}, 0);
};

const floodDelete = (cubes) => ({ x, y, z }) => {
	cubes[`${x},${y},${z}`] = null;

	if (cubes[`${x + 1},${y},${z}`] == false) floodDelete(cubes)({ x: x + 1, y: y, z: z });
	if (cubes[`${x - 1},${y},${z}`] == false) floodDelete(cubes)({ x: x - 1, y: y, z: z });
	if (cubes[`${x},${y + 1},${z}`] == false) floodDelete(cubes)({ x: x, y: y + 1, z: z });
	if (cubes[`${x},${y - 1},${z}`] == false) floodDelete(cubes)({ x: x, y: y - 1, z: z });
	if (cubes[`${x},${y},${z + 1}`] == false) floodDelete(cubes)({ x: x, y: y, z: z + 1 });
	if (cubes[`${x},${y},${z - 1}`] == false) floodDelete(cubes)({ x: x, y: y, z: z - 1 });
}

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const map: Record<string, boolean> = arr.reduce((map, [x, y, z]) => {
		map[`${x},${y},${z}`] = true;
		return map;
	}, {});

	const cubes = {};

	const minX = _.min(arr.map(cube => cube[0])) - 1;
	const minY = _.min(arr.map(cube => cube[1])) - 1;
	const minZ = _.min(arr.map(cube => cube[2])) - 1;
	const maxX = _.max(arr.map(cube => cube[0])) + 1;
	const maxY = _.max(arr.map(cube => cube[1])) + 1;
	const maxZ = _.max(arr.map(cube => cube[2])) + 1;

	_.range(minZ, maxZ + 1).forEach(z => {
		_.range(minY, maxY + 1).forEach(y => {
			_.range(minX, maxX + 1).forEach(x => {
				cubes[`${x},${y},${z}`] = !!map[`${x},${y},${z}`];
			});
		});
	});

	floodDelete(cubes)({ x: minX, y: minY, z: minZ });

	return Object.keys(cubes).reduce((count, _current) => {
		const current = _current.split(',').map(Number);
		if (cubes[`${current[0]},${current[1]},${current[2]}`] == null) return count;
		return [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]].reduce((innerCount, [x, y, z]) => {
			if (cubes[`${current[0] + x},${current[1] + y},${current[2] + z}`] == null) return innerCount + 1;
			return innerCount;
		}, count);
	}, 0);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map((v) => v.split(',').map(Number));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 64);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 3496);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 58);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 2064);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}