import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function getNeighbors (x, y, map) {
	const neighbors = [];
	const maxNext = String.fromCharCode(map[y][x].charCodeAt(0) + 1);
	if (y + 1 < map.length && map[y + 1][x] <= maxNext) {
		neighbors.push(`${x},${y + 1}`);
	}
	if (y - 1 >= 0 && map[y - 1][x] <= maxNext) {
		neighbors.push(`${x},${y - 1}`);
	}
	if (x + 1 < map[y].length && map[y][x + 1] <= maxNext) {
		neighbors.push(`${x + 1},${y}`);
	}
	if (x - 1 >= 0 && map[y][x - 1] <= maxNext) {
		neighbors.push(`${x - 1},${y}`);
	}
	return neighbors;
}

function mapToPoints (map: string[][], start: { x: number, y: number }, end: { x: number, y: number }, aStartingPoint = false) {
	const points = {};
	let queue = [];

	_.range(0, map.length).forEach((y) => {
		_.range(0, map[0].length).forEach((x) => {
			const id = `${x},${y}`;
			points[id] = Infinity;
			queue.push(id);
		});
	});

	points[`${start.x},${start.y}`] = 0;

	while (queue.length) {
		const pointKey = _.minBy(queue, (x) => points[x]);
		if (pointKey === `${end.x},${end.y}`) {
			break;
		}
		queue = queue.filter((x) => x !== pointKey);

		const point = { x: parseInt(pointKey.split(',')[0]), y: parseInt(pointKey.split(',')[1]) };

		const neighbors = getNeighbors(point.x, point.y, map);
		neighbors.forEach(neighbor => {
			if (queue.includes(neighbor)) {
				const { x: nX, y: nY } = { x: parseInt(neighbor.split(',')[0]), y: parseInt(neighbor.split(',')[1]) };
				const nValue = map[nY][nX];
				const alt = aStartingPoint && nValue === 'a'
					? 0
					: points[pointKey] + 1;
				if (alt < points[neighbor]) {
					points[neighbor] = alt;
				}
			}
		});
	}
	return points;
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const sY = arr.findIndex((v) => v.includes('S'));
	const sX = arr[sY].findIndex((v) => v === 'S');
	const eY = arr.findIndex((v) => v.includes('E'));
	const eX = arr[eY].findIndex((v) => v === 'E');
	arr[sY][sX] = 'a';
	arr[eY][eX] = 'z';

	const paths = mapToPoints(arr, { x: sX, y: sY }, { x: eX, y: eY });

	return paths[`${eX},${eY}`];
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const sY = arr.findIndex((v) => v.includes('S'));
	const sX = arr[sY].findIndex((v) => v === 'S');
	const eY = arr.findIndex((v) => v.includes('E'));
	const eX = arr[eY].findIndex((v) => v === 'E');
	arr[sY][sX] = 'a';
	arr[eY][eX] = 'z';

	const paths = mapToPoints(arr, { x: sX, y: sY }, { x: eX, y: eY }, true);

	return paths[`${eX},${eY}`];
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(l => l.split(''));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 31);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 447);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 29);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 446);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}