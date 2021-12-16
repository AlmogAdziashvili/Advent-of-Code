import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

let sum = 0;
const addToGlobalVersionSum = (value: number) => sum += value;

const getLiteralValue = (arr: string[]) => {
	const chunks = _.chunk(arr, 5);
	const value = [];
	const lastChunk = chunks.find(c => {
		value.push(...c.slice(1))
		return c[0] === '0';
	});
	return [parseInt(value.join(''), 2), chunks.indexOf(lastChunk) * 5 + 5];
}

const handleOperation = (type: number) => (subPacketsValues: number[]) => {
	const [value, other] = subPacketsValues;
	switch (type) {
		case 0:
			return _.sum(subPacketsValues);
		case 1:
			return subPacketsValues.reduce(_.multiply)
		case 2:
			return _.min(subPacketsValues);
		case 3:
			return _.max(subPacketsValues);
		case 5:
			return Number(_.gt(value, other));
		case 6:
			return Number(_.lt(value, other));
		case 7:
			return Number(_.eq(value, other));
	}
}

const evaluatePackets = (arr: string[]): [string[], number] => {
	const version = parseInt(arr.slice(0, 3).join(''), 2);
	addToGlobalVersionSum(version);
	const type = parseInt(arr.slice(3, 6).join(''), 2);
	if (type === 4) {
		const [literalValue, length] = getLiteralValue(arr.slice(6));
		return [arr.slice(6 + length), literalValue];
	} else {
		const typeId = arr[6];
		if (typeId === '0') {
			const subPacketsLength = parseInt(arr.slice(7, 22).join(''), 2);
			let subPacketsContent = arr.slice(22, 22 + subPacketsLength);
			const subPacketsValues = [];
			while (subPacketsContent.length) {
				let value: number;
				[subPacketsContent, value] = evaluatePackets(subPacketsContent);
				subPacketsValues.push(value);
			}
			return [arr.slice(22 + subPacketsLength), handleOperation(type)(subPacketsValues)];
		} else {
			const subPacketsNumber = parseInt(arr.slice(7, 18).join(''), 2);
			let subPacketsContent = arr.slice(18);
			const subPacketsValues = [];
			_.range(subPacketsNumber).forEach(() => {
				let value: number;
				[subPacketsContent, value] = evaluatePackets(subPacketsContent);
				subPacketsValues.push(value);
			});
			return [subPacketsContent, handleOperation(type)(subPacketsValues)];
		}
	}
};

export const solve1 = (_arr: string[]): any => {
	let arr = [..._arr];
	sum = 0;
	evaluatePackets(arr);
	return sum;
};

export const solve2 = (_arr: string[]): any => {
	const arr = [..._arr];
	const [_, value] = evaluatePackets(arr);
	return value;
};

const processInput = (input: string): any => {
	const n =
		input.split('')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map((x) => parseInt(x, 16).toString(2).padStart(4, '0'))
			.join('').split('');
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 20);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 854);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 186189840660);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}