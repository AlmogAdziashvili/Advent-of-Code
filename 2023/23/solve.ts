import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const paths = [{ x: arr[0].findIndex(v => v === '.'), y: 0, steps: 0, visited: [`${arr[0].findIndex(v => v === '.')},${0}`] }];
	const finishedPaths = []
	const finalPos = { x: arr[arr.length - 1].findIndex(v => v === '.'), y: arr.length - 1 };
	while (paths.length) {
		const path = paths.shift();
		if (path.x === finalPos.x && path.y === finalPos.y) {
			finishedPaths.push(path);
			continue;
		}
		const nextSteps = [
			{ x: path.x, y: path.y + 1 },
			{ x: path.x, y: path.y - 1 },
			{ x: path.x + 1, y: path.y },
			{ x: path.x - 1, y: path.y },
		].filter(({ x, y }) => {
			return x >= 0 && x < arr[0].length && y >= 0 && y < arr.length && arr[y][x] === '.';
		});
		const nextStepsSlopes = [
			{ x: path.x, y: path.y + 1 },
			{ x: path.x, y: path.y - 1 },
			{ x: path.x + 1, y: path.y },
			{ x: path.x - 1, y: path.y },
		].reduce((acc, { x, y }) => {
			if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
				if (arr[y][x] === '^') {
					acc.push({ x, y: y - 1, s: true });
				}
				if (arr[y][x] === 'v') {
					acc.push({ x, y: y + 1, s: true });
				}
				if (arr[y][x] === '<') {
					acc.push({ x: x - 1, y, s: true });
				}
				if (arr[y][x] === '>') {
					acc.push({ x: x + 1, y, s: true });
				}
			}
			return acc;
		}, []);

		[...nextSteps, ...nextStepsSlopes].filter(({ x, y }) => !path.visited.includes(`${x},${y}`)).forEach(({ x, y, s }) => {
			paths.push({ x, y, steps: path.steps + (s ? 2 : 1), visited: [...path.visited, `${x},${y}`] });
		});
	}
	return finishedPaths.map(({ steps }) => steps).sort((a, b) => b - a)[0];
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const paths = { [`${arr[0].findIndex(v => v === '.')},${0}`]: { x: arr[0].findIndex(v => v === '.'), y: 0, steps: 0, visited: [`${arr[0].findIndex(v => v === '.')},${0}`] } };
	const finishedPaths = []
	const finalPos = { x: arr[arr.length - 1].findIndex(v => v === '.'), y: arr.length - 1 };
	let i = 0;
	while (Object.keys(paths).length) {
		i++;
		if (i % 100 === 0) {
			console.log(Object.keys(paths).length);
		}
		const key = Object.keys(paths)[0];
		const path = paths[key];
		delete paths[key];
		if (path.x === finalPos.x && path.y === finalPos.y) {
			finishedPaths.push(path);
			continue;
		}
		const nextSteps = [
			{ x: path.x, y: path.y + 1 },
			{ x: path.x, y: path.y - 1 },
			{ x: path.x + 1, y: path.y },
			{ x: path.x - 1, y: path.y },
		].filter(({ x, y }) => {
			return x >= 0 && x < arr[0].length && y >= 0 && y < arr.length && arr[y][x] !== '#';
		});

		nextSteps.filter(({ x, y }) => !path.visited.includes(`${x},${y}`)).forEach(({ x, y }) => {
			const p = paths[`${x},${y}`];
			if (!p || p.steps < path.steps + 1) {
				paths[`${x},${y}`] = { x, y, steps: path.steps + 1, visited: [...path.visited, `${x},${y}`] };
			}
		});
	}
	return finishedPaths.map(({ steps }) => steps).sort((a, b) => b - a)[0];
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(''))
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		// const testResult = solve1(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, 94);

		const result = solve1(processInput(puzzleInput));
		// result; //?
		// assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 154);

		// const result = solve2(processInput(puzzleInput));
		// result; //?
		// assert.deepEqual(result, null);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}