import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const grid = [..._arr];
	const seen = new Set();
	const pq = [[0, 0, 0, 0, 0, 0]];
	while (pq.length > 0) {
		const [hl, r, c, dr, dc, n] = pq.shift();

		if (r === grid.length - 1 && c === grid[0].length - 1 && n >= 0) {
			return hl;
		}

		if (seen.has(`${r}-${c}-${dr}-${dc}-${n}`)) {
			continue;
		}

		seen.add(`${r}-${c}-${dr}-${dc}-${n}`);

		if (n < 3 && (dr !== 0 || dc !== 0)) {
			const nr = r + dr;
			const nc = c + dc;
			if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
				pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
				pq.sort((a, b) => a[0] - b[0]);
			}
		}

		const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
		for (const [ndr, ndc] of directions) {
			if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
				const nr = r + ndr;
				const nc = c + ndc;
				if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
					pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
					pq.sort((a, b) => a[0] - b[0]);
				}
			}
		}
	}
}

export const solve2 = (_arr: any[]): any => {
	const grid = [..._arr];
	const seen = new Set();
	const pq = [[0, 0, 0, 0, 0, 0]];
	while (pq.length > 0) {
		const [hl, r, c, dr, dc, n] = pq.shift();

		if (r === grid.length - 1 && c === grid[0].length - 1 && n >= 4) {
			return hl;
		}

		if (seen.has(`${r}-${c}-${dr}-${dc}-${n}`)) {
			continue;
		}

		seen.add(`${r}-${c}-${dr}-${dc}-${n}`);

		if (n < 10 && (dr !== 0 || dc !== 0)) {
			const nr = r + dr;
			const nc = c + dc;
			if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
				pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
				pq.sort((a, b) => a[0] - b[0]);
			}
		}

		if (n >= 4 || (dr === 0 && dc === 0)) {
			const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
			for (const [ndr, ndc] of directions) {
				if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
					const nr = r + ndr;
					const nc = c + ndc;
					if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
						pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
						pq.sort((a, b) => a[0] - b[0]);
					}
				}
			}
		}
	}
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split('').map(Number))
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 102);

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