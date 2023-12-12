import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function allPermutations (row: string[], b: string) {
	const permutations: string[][] = [row];
	const correctPermutations: string[][] = [];
	while (permutations.length) {
		const current = permutations.shift();
		const indexOfQ = current.indexOf('?');
		if (indexOfQ === -1) {
			if (b === getBrokenCount(current)) {
				correctPermutations.push(current);
			}
			continue;
		}
		if (!b.startsWith(getBrokenCount(current.slice(0, current.slice(0, indexOfQ).lastIndexOf('.') + 1)))) {
			continue;
		}
		const copy1 = [...current];
		const copy2 = [...current];
		copy1[indexOfQ] = '.';
		copy2[indexOfQ] = '#';
		permutations.push(copy1);
		permutations.push(copy2);
	}
	return correctPermutations;
}

function getBrokenCount (row: string[]) {
	let brokenCount = '';
	let currentCount = 0;
	for (let i = 0; i < row.length; i++) {
		if (row[i] === '#') {
			currentCount += 1;
		} else {
			if (currentCount) {
				if (brokenCount) {
					brokenCount += ',';
				}
				brokenCount += currentCount;
			}
			currentCount = 0;
		}
	}
	if (currentCount) {
		if (brokenCount) {
			brokenCount += ',';
		}
		brokenCount += currentCount;
	}
	return brokenCount;
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const arrangements = arr.map(([row, b]) => allPermutations(row, b).length); //? 
	return _.sum(arrangements);
};

export const solve2 = (_inp: string): any => {
	let inp = _inp.trim().split("\n");

	let ret = 0;
	for (let line of inp) {
		let mapr = line.split(" ")[0];
		let numsr = [...line.matchAll(/\d+/g)].map(x => +(x[0]));
		let nums = [0];
		let map = ""
		for (let i = 0; i < 5; i++) {
			map = map + (mapr + "?");
			nums = nums.concat(numsr);
		}
		let counts = [];
		for (let i = 0; i < map.length; i++) {
			counts[i] = [];
		}
		let c = (mi, ni) => {
			if (mi == -1 && ni == 0) return 1;
			if (counts[mi]) return counts[mi][ni] ?? 0;
			return 0;
		}
		for (let ni = 0; ni < nums.length; ni++) {
			for (let mi = 0; mi < map.length; mi++) {
				let cur = 0;
				if (map[mi] != '#') cur += c(mi - 1, ni);
				if (ni > 0) {
					let docount = true;
					for (let k = 1; k <= nums[ni]; k++) {
						if (map[mi - k] == '.') docount = false;
					}
					if (map[mi] == '#') docount = false;
					if (docount) cur += c(mi - nums[ni] - 1, ni - 1);
				}
				counts[mi][ni] = cur;
			}
		}
		ret += counts[map.length - 1][nums.length - 1];
	}
	return ret;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(' '))
			.filter((v) => !!v)
			.map(([r, i]) => [r.split(''), i]);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 21);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(exampleInput);
		testResult; //?
		assert.deepEqual(testResult, 525152);

		const result = solve2(puzzleInput);
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