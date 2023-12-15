import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function getHorizontalMirror (pattern): number {
	for (let i = 0; i < pattern.length - 1; i++) {
		const row = pattern[i];
		const nextRow = pattern[i + 1];
		if (row === nextRow) {
			let hasMismatch = false;
			for (let j = 0; j < Math.min(i, pattern.length - i - 2); j++) {
				if (pattern[i - j - 1] !== pattern[i + j + 2]) {
					hasMismatch = true;
					break;
				}
			}
			if (!hasMismatch) return i + 1;
		}
	}
	return 0;
}

const thereIsASmudge = (above: string, below: string): boolean => {
	let mismatchCounter = 0;
	for (let i = 0; i < above.length; i++) {
		if (above[i] !== below[i]) mismatchCounter++;
		if (mismatchCounter > 1) return false;
	}
	return !!mismatchCounter;
};

function getHorizontalMirrorWithSmudge (pattern: string[]): number {
	for (let i = 0; i < pattern.length - 1; i++) {
		let above = pattern[i];
		let below = pattern[i + 1];
		for (let j = 0; j < Math.min(i, pattern.length - i - 2); j++) {
			above = above.concat(pattern[i - j - 1]);
			below = below.concat(pattern[i + j + 2]);
		}
		if (thereIsASmudge(above, below)) {
			i //?
			return i + 1;
		}
	}
	1 //? 
	return 0;
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const scores = arr.map((pattern) => {
		const horizontalMirror = getHorizontalMirror(pattern);
		if (horizontalMirror) return horizontalMirror * 100;
		const verticalMirror = getHorizontalMirror(_.zip(...pattern.map(r => r.split(''))).map(r => r.join('')));
		if (verticalMirror) return verticalMirror;
		return 0;
	});//?
	return _.sum(scores);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const scores = arr.map((pattern) => {
		const horizontalMirror = getHorizontalMirrorWithSmudge(pattern);
		if (horizontalMirror) return horizontalMirror * 100;
		const verticalMirror = getHorizontalMirrorWithSmudge(_.zip(...pattern.map(r => r.split(''))).map(r => r.join('')));
		if (verticalMirror) return verticalMirror;
		return 0;
	});//?
	return _.sum(scores);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n\n')
			.map(n => n.trim().split('\n'))
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 405);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 400);

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