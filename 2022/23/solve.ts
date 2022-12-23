import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

let directions = [
	{
		move: [0, -1],
		conditions: [[0, -1], [1, -1], [-1, -1]]
	},
	{
		move: [0, 1],
		conditions: [[0, 1], [1, 1], [-1, 1]]
	},
	{
		move: [-1, 0],
		conditions: [[-1, 0], [-1, 1], [-1, -1]]
	},
	{
		move: [1, 0],
		conditions: [[1, 0], [1, 1], [1, -1]]
	},
];

export const solve1 = (_arr: any[]): any => {
	const oarr = [..._arr];
	const newPositions = _.range(0, 10).reduce((arr) => {
		const newPositions = arr.reduce((acc, cur) => {
			const [x, y] = cur.split(',').map(Number);
			if (![[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].find(([dx, dy]) => arr.includes(`${x + dx},${y + dy}`))) {
				return [...acc, `${x},${y}`];
			}
			const validDirection = directions.find(({ conditions }) => {
				return conditions.every(([dx, dy]) => {
					const [nx, ny] = [x + dx, y + dy];
					return !arr.includes(`${nx},${ny}`);
				});
			});
			if (validDirection) {
				const [dx, dy] = validDirection.move;
				const [nx, ny] = [x + dx, y + dy];
				return [...acc, `${nx},${ny}`];
			}
			return [...acc, `${x},${y}`];
		}, []);
		const [first, ...rest] = directions;
		directions = [...rest, first];
		return newPositions.map((p, i, nArr) => {
			if (nArr.filter((a) => a === p).length > 1) {
				return arr[i];
			}
			return nArr[i];
		});
	}, oarr);
	const minSquareWidth = _.max(newPositions.map((p) => p.split(',').map(Number)[0]) as number[]) - _.min(newPositions.map((p) => p.split(',').map(Number)[0]) as number[]) + 1;
	const minSquareHeight = _.max(newPositions.map((p) => p.split(',').map(Number)[1]) as number[]) - _.min(newPositions.map((p) => p.split(',').map(Number)[1]) as number[]) + 1;
	return minSquareHeight * minSquareWidth - oarr.length;
};

export const solve2 = (_arr: any[]): any => {
	let arr = [..._arr];
	return _.range(0, 20000).find((i) => {
		console.log(i);
		let numberOfMoves = 0
		const newPositions = arr.reduce((acc, cur) => {
			const [x, y] = cur.split(',').map(Number);
			if (![[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].find(([dx, dy]) => arr.includes(`${x + dx},${y + dy}`))) {
				return [...acc, `${x},${y}`];
			}
			const validDirection = directions.find(({ conditions }) => {
				return conditions.every(([dx, dy]) => {
					const [nx, ny] = [x + dx, y + dy];
					return !arr.includes(`${nx},${ny}`);
				});
			});
			if (validDirection) {
				const [dx, dy] = validDirection.move;
				const [nx, ny] = [x + dx, y + dy];
				numberOfMoves++;
				return [...acc, `${nx},${ny}`];
			}
			return [...acc, `${x},${y}`];
		}, []);
		const [first, ...rest] = directions;
		directions = [...rest, first];
		if (numberOfMoves === 0) return i;
		numberOfMoves = 0;
		arr = newPositions.map((p, i, nArr) => {
			if (nArr.filter((a) => a === p).length > 1) {
				return arr[i];
			}
			return nArr[i];
		});
	});
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.reduce((acc, l, y) => {
		const newAcc = l.split('').reduce((iAcc, cur, x) => {
			if (cur === '#') {
				return [...iAcc, `${x},${y}`];
			}
			return iAcc;
		}, acc);
		return newAcc;
	}, []);
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		// const testResult = solve1(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, 110);

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
	console.log(solve2(processInput(puzzleInput)));
}