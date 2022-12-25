import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const snafuVals = { '2': 2, '1': 1, '0': 0, '-': -1, '=': -2 }
	const snafuVal = d => Object.entries(snafuVals).filter(([k, v]) => v == d)[0][0]
	const snafu2dec = snafu => snafu.split('').reverse().reduce((a, v, i) => a + Math.pow(5, i) * snafuVals[v], 0)
	const maxSnafu = i => snafu2dec('2'.repeat(i + 1))

	const dec2snafu = (dec, snafu = '') => {
		let i = 0, lastI;
		while (dec != 0) {
			lastI = i;
			i = 0;
			while (maxSnafu(i) < Math.abs(dec)) i++;
			let inc = Math.round(dec / Math.pow(5, i));
			snafu += '0'.repeat(Math.max(0, lastI - (i + 1))) + snafuVal(inc);
			dec -= inc * Math.pow(5, i)
		}
		return snafu + '0'.repeat(i);
	}

	return dec2snafu(_arr.reduce((a, v) => a + snafu2dec(v), 0));
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, '2=-1=0');

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
}