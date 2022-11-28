import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const getAdjPoints = ([i, j]: [number, number]) => {
	return _.range(-1, 2).reduce((acc, iAdd) => [...acc, ..._.range(-1, 2).reduce((acc, jAdd) => (jAdd || iAdd) ? [...acc, [i + iAdd, j + jAdd]] : acc, [])], [])
		.filter(([i, j]) => !(i < 0 || j < 0 || i > 9 || j > 9));
};

const flashAndIncAdj = (arr: number[][], seen = []) => {
	const flashPoints = arr.reduce((acc, cur, i) => {
		return [...acc, ...cur.reduce((acc, cur, j) => cur > 9 ? [...acc, [i, j]] : acc, [])];
	}, []).filter(point => !seen.map(String).includes(String(point)));
	if (!flashPoints.length) return [arr, 0];
	const postIncArr = flashPoints.reduce((acc, [i, j]) => {
		const newArr = _.cloneDeep(acc);
		return getAdjPoints([i, j]).reduce((acc, [iAdj, jAdj]) => {
			const newArr = _.cloneDeep(acc);
			newArr[iAdj][jAdj] += 1;
			return newArr;
		}, newArr);
	}, arr);
	const [postFlashArr, flashPointsCount] = flashAndIncAdj(postIncArr, [...seen, ...flashPoints]);
	const finalArr = flashPoints.reduce((acc, [i, j]) => {
		const newArr = _.cloneDeep(acc);
		newArr[i][j] = 0;
		return newArr;
	}, postFlashArr);
	return [finalArr, flashPoints.length + flashPointsCount];
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	return _.range(100).reduce<[number[][], number]>(([acc, count]) => {
		const newArr = acc.map(line => line.map(_.curry(_.add)(1)));
		const [postFlashesArr, flashPointsCount] = flashAndIncAdj(newArr);
		return [postFlashesArr, flashPointsCount + count];
	}, [arr, 0])[1];
};

export const solve2 = (_arr: any[], iteration = 1): any => {
	const arr = [..._arr];
	const newArr = arr.map(line => line.map(_.curry(_.add)(1)));
	const [postFlashesArr, flashPointsCount] = flashAndIncAdj(newArr);
	return flashPointsCount === 100 ? iteration : solve2(postFlashesArr, iteration + 1);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split('').map(Number))
			.filter((v) => !!v);

	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1656);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1591);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 195);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 314);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}