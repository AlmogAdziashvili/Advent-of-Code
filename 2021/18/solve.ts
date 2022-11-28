import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const addL = (value, other) => {
	if (!other) return value;
	if (!Array.isArray(value)) return value + other;
	return [addL(value[0], other), value[1]];
}

const addR = (value, other) => {
	if (!other) return value;
	if (!Array.isArray(value)) return value + other;
	return [value[0], addR(value[1], other)];
}

const explode = (value, depth = 0) => {
	if (!Array.isArray(value)) return [false, null, value, null];
	if (depth === 4) return [true, value[0], 0, value[1]];
	const postExplodeLeft = explode(value[0], depth + 1);
	if (postExplodeLeft[0]) {
		return [true, postExplodeLeft[1], [postExplodeLeft[2], addL(value[1], postExplodeLeft[3])], null];
	}
	const postExplodeRight = explode(value[1], depth + 1);
	if (postExplodeRight[0]) {
		return [true, null, [addR(value[0], postExplodeRight[1]), postExplodeRight[2]], postExplodeRight[3]];
	}
	return [false, null, value, null];
}

const split = (value) => {
	if (!Array.isArray(value)) {
		if (value > 9) return [true, [Math.floor(value / 2), Math.ceil(value / 2)]];
		return [false, value];
	}
	const postSplitLeft = split(value[0]);
	if (postSplitLeft[0]) {
		return [true, [postSplitLeft[1], value[1]]];
	}
	const postSplitRight = split(value[1]);
	if (postSplitRight[0]) {
		return [true, [value[0], postSplitRight[1]]];
	}
	return [false, value];
}

const add = (acc, cur) => {
	let newAcc = [acc, cur];
	while (true) {
		const [changedE, _, postExplode] = explode(newAcc);
		if (changedE) {
			newAcc = postExplode;
			continue;
		}
		const [changedS, postSplit] = split(newAcc);
		if (changedS) {
			newAcc = postSplit;
			continue;
		}
		break;
	}
	return newAcc;
};

const magnitude = value => {
	if (!Array.isArray(value)) return value;
	return 3 * magnitude(value[0]) + 2 * magnitude(value[1]);
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const reducedArr = arr.reduce(add);
	return magnitude(reducedArr);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const allCombinations = arr.flatMap(l1 => arr.map(l2 => l1 === l2 ? null : [l1, l2])).filter(Boolean);
	const allMagnitudes = allCombinations.map(([l1, l2]) => magnitude(add(l1, l2)));
	return _.max(allMagnitudes);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => JSON.parse(n.trim()))
			.filter((v) => !!v)

	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1384);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 3305);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1384);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 4563);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}