import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const set = new Set();
	arr.forEach(([status, [x1, x2], [y1, y2], [z1, z2]]) => {
		if (x1 > 50 || y1 > 50 || z1 > 50 || x2 < -50 || y2 < -50 || z2 < -50) return;
		_.range(_.max([x1, -50]), _.min([x2 + 1, 51])).forEach(x => {
			_.range(_.max([y1, -50]), _.min([y2 + 1, 51])).forEach(y => {
				_.range(_.max([z1, -50]), _.min([z2 + 1, 51])).forEach(z => {
					if (status === 'on') {
						set.add(`${x},${y},${z}`);
					} else {
						set.delete(`${x},${y},${z}`);
					}
				});
			});
		});
	});
	return set.size;
};

const countOn = ([status, [x1, x2], [y1, y2], [z1, z2]], arr) => {
	let total = (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);
	const overlap = [];

	arr.forEach(([status, [xx1, xx2], [yy1, yy2], [zz1, zz2]]) => {
		if (x1 > xx2 || xx1 > x2 || y1 > yy2 || yy1 > y2 || z1 > zz2 || zz1 > z2) return;
		overlap.push([status, [_.max([x1, xx1]), _.min([x2, xx2])], [_.max([y1, yy1]), _.min([y2, yy2])], [_.max([z1, zz1]), _.min([z2, zz2])]]);
	});

	return overlap.reduce((count, line, i) => {
		return count - countOn(line, overlap.slice(i + 1));
	}, total);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr.reduce((count, [status, [x1, x2], [y1, y2], [z1, z2]], i) => {
		if (status === 'on') {
			return count + countOn([status, [x1, x2], [y1, y2], [z1, z2]], arr.slice(i + 1));
		}
		return count;
	}, 0);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(/[,\s]/).map(c => c.indexOf('=') !== -1 ? c.substring(c.indexOf('=') + 1).split('..').map(Number) : c))
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 474140);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 556501);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 2758514936282235);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1217140271559773);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}