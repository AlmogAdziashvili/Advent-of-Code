import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const numbers = _arr.map((l: string) => {
		const firstDigit = l.split('').find(Number);
		const lastDigit = l.split('').reverse().find(Number);
		return Number(firstDigit) * 10 + Number(lastDigit);
	});
	return _.sum(numbers);
};

function getDigit (str: string) {
	if (Number(str)) {
		return Number(str);
	}
	if (str === 'one') {
		return 1;
	}
	if (str === 'two') {
		return 2;
	}
	if (str === 'three') {
		return 3;
	}
	if (str === 'four') {
		return 4;
	}
	if (str === 'five') {
		return 5;
	}
	if (str === 'six') {
		return 6;
	}
	if (str === 'seven') {
		return 7;
	}
	if (str === 'eight') {
		return 8;
	}
	if (str === 'nine') {
		return 9;
	}
}

const getDigitReverse = (str: string) => {
	if (Number(str)) {
		return Number(str);
	}
	if (str === 'eno') {
		return 1;
	}
	if (str === 'owt') {
		return 2;
	}
	if (str === 'eerht') {
		return 3;
	}
	if (str === 'ruof') {
		return 4;
	}
	if (str === 'evif') {
		return 5;
	}
	if (str === 'xis') {
		return 6;
	}
	if (str === 'neves') {
		return 7;
	}
	if (str === 'thgie') {
		return 8;
	}
	if (str === 'enin') {
		return 9;
	}
}

export const solve2 = (_arr: any[]): any => {
	const numbers = _arr.map((l: string) => {
		const occ = l.match(/(one|two|three|four|five|six|seven|eight|nine|\d)/g).map(getDigit);
		const occr = l.split('').reverse().join('')
			.match(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d)/g).map(getDigitReverse);
		return Number(occ[0]) * 10 + Number(occr[0]);
	});
	return _.sum(numbers);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 142);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 71780);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		// assert.deepEqual(testResult, 281);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 212489);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}