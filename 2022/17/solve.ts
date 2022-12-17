import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const emptyRow = () => ['#', '.', '.', '.', '.', '.', '.', '.', '#'];
const rocksType = (i) => [
	[[i - 4, 3], [i - 4, 4], [i - 4, 5], [i - 4, 6]],
	[[i - 4, 4], [i - 3, 3], [i - 3, 4], [i - 3, 5], [i - 2, 4]],
	[[i - 4, 3], [i - 4, 4], [i - 4, 5], [i - 3, 5], [i - 2, 5]],
	[[i - 4, 3], [i - 3, 3], [i - 2, 3], [i - 1, 3]],
	[[i - 4, 3], [i - 4, 4], [i - 3, 3], [i - 3, 4]],
]

export const solve1 = (_arr: any[], i = 2022): any => {
	const arr = [..._arr];
	let patternIndex = 0;
	let tunnel = [['#', '#', '#', '#', '#', '#', '#', '#', '#']];
	const gameStateCache: Record<string, any[]> = {};

	_.range(0, i).forEach((i) => {
		if (gameStateCache[`${i % 5},${patternIndex % arr.length}`]) {
			gameStateCache[`${i % 5},${patternIndex % arr.length}`].push({ i, height: tunnel.length - 1 });
		} else {
			gameStateCache[`${i % 5},${patternIndex % arr.length}`] = [{ i, height: tunnel.length - 1 }];
		}
		let done = false;
		tunnel.push(emptyRow(), emptyRow(), emptyRow(), emptyRow(), emptyRow(), emptyRow(), emptyRow());
		let currentRock = rocksType(tunnel.length)[i % 5];
		while (!done) {
			// shift to the side
			const shiftDir = arr[patternIndex % arr.length];
			patternIndex = patternIndex + 1;
			if (shiftDir === '>' && !currentRock.find(([x, y]) => y === 7) && !currentRock.find(([x, y]) => tunnel[x][y + 1] === '#')) {
				currentRock = currentRock.map(([x, y]) => [x, y + 1]);
			} else if (shiftDir === '<' && !currentRock.find(([x, y]) => y === 1) && !currentRock.find(([x, y]) => tunnel[x][y - 1] === '#')) {
				currentRock = currentRock.map(([x, y]) => [x, y - 1]);
			}

			// move down
			if (!currentRock.find(([x, y]) => tunnel[x - 1][y] === '#')) {
				currentRock = currentRock.map(([x, y]) => [x - 1, y]);
			} else {
				currentRock.forEach(([x, y]) => {
					tunnel[x][y] = '#';
				});
				done = true;
			}
		}
		tunnel = tunnel.filter(l => l.toString() !== emptyRow().toString());
	});
	const cycles = Object.values(gameStateCache).filter(i => i.length > 1)[0];
	const cycleOffset = cycles[0].i;
	const cycleLength = cycles[1].i - cycles[0].i;
	const cycleHeightInterval = cycles[1].height - cycles[0].height;
	const cyclesCount = Math.floor((1000000000000 - cycleOffset) / cycleLength);
	const totalRoundsLeft = 1000000000000 - (cycles[0].i + (cyclesCount * cycleLength));
	const totalHeight = cycles[0].height + (cyclesCount * cycleHeightInterval);
	return tunnel.length - 1;
};

const processInput = (input: string): any => {
	const n =
		input.split('')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 3068);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 3175);
	});

	it.skip('Part 2', () => {
		// const testResult = solve1(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, null);

		const result = solve1(processInput(puzzleInput));
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