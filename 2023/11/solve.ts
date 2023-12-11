import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function expandUniverse (arr: string[][]) {
	const horizontal: any = arr.map((row, y) => {
		if (row.every(v => v === '.')) {
			return [row, row];
		}
		return row;
	}).reduce((acc, row) => [...acc, ...(Array.isArray(row[0]) ? row : [row])], []);
	const vertical: any = _.zip(...horizontal).map((col, x) => {
		if (col.every(v => v === '.')) {
			return [col, col];
		}
		return col;
	}).reduce((acc, row) => [...acc, ...(Array.isArray(row[0]) ? row : [row])], []);
	return _.zip(...vertical);
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const uni = expandUniverse(arr);
	const galaxies = uni.reduce<{ r: number, c: number }[]>((acc, row, r) => {
		row.forEach((col, c) => {
			if (col === '#') {
				acc.push({ r, c });
			}
		});
		return acc;
	}, []);
	const galaxiesDistance: Record<number, number>[] = galaxies.map((galaxy, i) => {
		return galaxies.reduce((acc, galaxy2, j) => {
			if (i === j) {
				return acc;
			}
			acc[j] = Math.abs(galaxy.r - galaxy2.r) + Math.abs(galaxy.c - galaxy2.c);
			return acc;
		}, {});
	});
	const shortestRouteBetweenAllGalaxies = galaxiesDistance.map((galaxy) => {
		return Object.values(galaxy).reduce<number>((acc, val) => acc + val, 0);
	});
	return _.sum(shortestRouteBetweenAllGalaxies) / 2;
};

export const solve2 = (_arr: any[]): any => {
	const uni = [..._arr];
	const emptyRows = uni.map((row, i) => row.every(v => v === '.') ? i : null).filter(v => v !== null);
	const emptyCols = _.zip(...uni).map((col, i) => col.every(v => v === '.') ? i : null).filter(v => v !== null);
	const emptyDistance = 999999;
	const galaxies = uni.reduce<{ r: number, c: number }[]>((acc, row, r) => {
		row.forEach((col, c) => {
			if (col === '#') {
				acc.push({ r, c });
			}
		});
		return acc;
	}, []);
	const galaxiesDistance: Record<number, number>[] = galaxies.map((galaxy, i) => {
		return galaxies.reduce((acc, galaxy2, j) => {
			if (i === j) {
				return acc;
			}
			const emptyColsBetween = emptyCols.filter(col => col > Math.min(galaxy.c, galaxy2.c) && col < Math.max(galaxy.c, galaxy2.c)).length;
			const emptyRowsBetween = emptyRows.filter(row => row > Math.min(galaxy.r, galaxy2.r) && row < Math.max(galaxy.r, galaxy2.r)).length;
			acc[j] = Math.abs(galaxy.r - galaxy2.r) + Math.abs(galaxy.c - galaxy2.c) + (emptyColsBetween * emptyDistance) + (emptyRowsBetween * emptyDistance);
			return acc;
		}, {});
	});
	const shortestRouteBetweenAllGalaxies = galaxiesDistance.map((galaxy) => {
		return Object.values(galaxy).reduce<number>((acc, val) => acc + val, 0);
	});
	return _.sum(shortestRouteBetweenAllGalaxies) / 2;
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
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 374);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		// const testResult = solve2(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, null);

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