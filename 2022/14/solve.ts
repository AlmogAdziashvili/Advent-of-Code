import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function createSandUnit(highestY: number, stoneMap: Record<string, Record<string, string>>, [x, y] = [500, 0]) {
	if (y > highestY) {
		return false;
	}
	if (stoneMap[y + 1][x] === '.') {
		stoneMap[y][x] = '.';
		return createSandUnit(highestY, stoneMap, [x, y + 1]);
	}
	if (stoneMap[y + 1][x - 1] === '.') {
		stoneMap[y][x] = '.';
		return createSandUnit(highestY, stoneMap, [x - 1, y + 1]);
	}
	if (stoneMap[y + 1][x + 1] === '.') {
		stoneMap[y][x] = '.';
		return createSandUnit(highestY, stoneMap, [x + 1, y + 1]);
	}
	stoneMap[y][x] = 'o';
	return true;
}


function createSandUnit2(highestY: number, stoneMap: Record<string, Record<string, string>>, [x, y] = [500, 0]) {
	if (y === highestY + 1) {
		stoneMap[y][x] = 'o';
		return true;
	}
	if (stoneMap[y + 1][x] === '.') {
		stoneMap[y][x] = '.';
		return createSandUnit2(highestY, stoneMap, [x, y + 1]);
	}
	if (stoneMap[y + 1][x - 1] === '.') {
		stoneMap[y][x] = '.';
		return createSandUnit2(highestY, stoneMap, [x - 1, y + 1]);
	}
	if (stoneMap[y + 1][x + 1] === '.') {
		stoneMap[y][x] = '.';
		return createSandUnit2(highestY, stoneMap, [x + 1, y + 1]);
	}
	if (x === 500 && y === 0) {
		return false;
	}
	stoneMap[y][x] = 'o';
	return true;
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const stoneMapTemp = _.range(0, 200).reduce((acc, y) => {
		acc[y] = _.range(0, 600).reduce((acc, x) => {
			acc[x] = '.';
			return acc;
		}, {});
		return acc;
	}, {});

	let highestY = 0;
	const stoneMap = arr.reduce((previousStoneMap, l: [number, number][]) => {
		return _.zip(_.initial(l), _.tail(l)).reduce((acc, [[sX, sY], [eX, eY]]) => {
			const maxY = Math.max(sY, eY);
			if (maxY > highestY) {
				highestY = maxY;
			}
			if (sX === eX) {
				_.range(Math.min(sY, eY), Math.max(sY, eY) + 1).forEach(y => {
					acc[y][sX] = '#';
				});
			}
			if (sY === eY) {
				_.range(Math.min(sX, eX), Math.max(eX, sX) + 1).forEach(x => {
					acc[sY][x] = '#';
				});
			}
			return acc;
		}, previousStoneMap);
	}, stoneMapTemp);



	const numberOfUnits = _.range(0, 2000).find(() => {
		return !createSandUnit(highestY, stoneMap);
	});

	return numberOfUnits;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const stoneMapTemp = _.range(0, 200).reduce((acc, y) => {
		acc[y] = _.range(0, 700).reduce((acc, x) => {
			acc[x] = '.';
			return acc;
		}, {});
		return acc;
	}, {});

	let highestY = 0;
	const stoneMap = arr.reduce((previousStoneMap, l: [number, number][]) => {
		return _.zip(_.initial(l), _.tail(l)).reduce((acc, [[sX, sY], [eX, eY]]) => {
			const maxY = Math.max(sY, eY);
			if (maxY > highestY) {
				highestY = maxY;
			}
			if (sX === eX) {
				_.range(Math.min(sY, eY), Math.max(sY, eY) + 1).forEach(y => {
					acc[y][sX] = '#';
				});
			}
			if (sY === eY) {
				_.range(Math.min(sX, eX), Math.max(eX, sX) + 1).forEach(x => {
					acc[sY][x] = '#';
				});
			}
			return acc;
		}, previousStoneMap);
	}, stoneMapTemp);

	highestY //?
	
	
	const numberOfUnits = _.range(0, 200000).find(() => {
		return !createSandUnit2(highestY, stoneMap);
	});
	Object.values(stoneMap).map((row) => Object.values(row).join('')).slice(150, 170).join('\n');//?
	
	return numberOfUnits + 1;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(l => l.split(' ->').map(v => v.split(',').map(Number)));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 24);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 618);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		// assert.deepEqual(testResult, 93);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 26358);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}