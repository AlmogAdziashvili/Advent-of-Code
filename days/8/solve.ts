import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

// https://stackoverflow.com/questions/9960908/permutations-in-javascript
const getAllPermutations = (inputArr) => {
	let result = [];
	const permute = (arr, m = []) => {
		if (arr.length === 0) {
			result.push(m);
		} else {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr.slice();
				let next = curr.splice(i, 1);
				permute(curr.slice(), m.concat(next));
		 }
	 }
 };
 permute(inputArr);
 return result;
};

const getCorrectConfiguration = pattern => {
	const allDigitsInPattern = pattern.split(' ');
	const allPossibleConfigurations = getAllPermutations(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
	return allPossibleConfigurations.find(possibleConfiguration => {
		const convertedDigitToConfiguration = allDigitsInPattern.map(digit => digit.split('').map(ch => _.indexOf(possibleConfiguration, ch)).sort().join(''));
		return !convertedDigitToConfiguration.some((digit) => {
			return !['012456','25','02346','02356','1235','01356','013456', '025', '0123456', '012356'].includes(digit);
		});
	});
}

const calcNum = (digits, conf) => {
	const convertedDigitToConfiguration = digits.map(digit => digit.split('').map(ch => _.indexOf(conf, ch)).sort().join(''));
	return parseInt(convertedDigitToConfiguration
		.map(digit => _.indexOf(['012456','25','02346','02356','1235','01356','013456', '025', '0123456', '012356'], digit)).join(''))
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const allDigits = _.flatten(arr.map(line => line.split(' | ')[1].split(' ')));
	const countByLength = _.countBy(allDigits, digit => digit.length);
	return countByLength[2] + countByLength[3] + countByLength[4] + countByLength[7];
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const lines = arr.map(a => a.split(' | '));
	return _.sum(lines.map(v => {
		const configuration = getCorrectConfiguration(v[0]);
		return calcNum(v[1].split(' '), configuration);
	}));
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);

	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 26);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 237);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 61229);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1009098);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}