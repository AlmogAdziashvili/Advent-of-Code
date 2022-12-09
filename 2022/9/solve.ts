import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const getTailPath = (arr: any[]) => {
	const [path] = arr.reduce(([pArr, H, T], [op, arg]) => {
		const arr = [...pArr];
		const newH = [...H];
		const newT = [...T];
		arr.push(newT.join(','));
		_.range(0, arg).forEach(() => {
			switch (op) {
				case 'U':
					newH[1] = newH[1] + 1;
					break;
				case 'D':
					newH[1] = newH[1] - 1;
					break;
				case 'L':
					newH[0] = newH[0] - 1;
					break;
				case 'R':
					newH[0] = newH[0] + 1;
					break;
			}
			const areTouching = Math.abs(newH[0] - newT[0]) < 2 && Math.abs(newH[1] - newT[1]) < 2;
			if (!areTouching) {
				if (newT[0] !== newH[0]) {
					newT[0] = newH[0] > newT[0] ? newT[0] + 1 : newT[0] - 1;
				}
				if (newT[1] !== newH[1]) {
					newT[1] = newH[1] > newT[1] ? newT[1] + 1 : newT[1] - 1;
				}
				arr.push(newT.join(','));
			}
		});
		return [arr, newH, newT];
	}, [[], [0, 0], [0, 0]]);
	return path;
};

const getTailPathByAnotherPath = (path: any[]) => {
	const [tailPath] = path.reduce(([pArr, T], rawNewH) => {
		const newH = rawNewH.split(',').map(Number);
		const arr = [...pArr];
		const newT = [...T];
		const areTouching = Math.abs(newH[0] - newT[0]) < 2 && Math.abs(newH[1] - newT[1]) < 2;
		if (!areTouching) {
			if (newT[0] !== newH[0]) {
				newT[0] = newH[0] > newT[0] ? newT[0] + 1 : newT[0] - 1;
			}
			if (newT[1] !== newH[1]) {
				newT[1] = newH[1] > newT[1] ? newT[1] + 1 : newT[1] - 1;
			}
			arr.push(newT.join(','));
		}
		return [arr, newT];
	}, [['0,0'], [0, 0]]);
	return tailPath;
};

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const [placesTailVisited] = arr.reduce(([set, H, T], [op, arg]) => {
		const newSet = new Set(set);
		const newH = [...H];
		const newT = [...T];
		newSet.add(newT.join(','));
		_.range(0, arg).forEach(() => {
			switch (op) {
				case 'U':
					newH[1] = newH[1] + 1;
					break;
				case 'D':
					newH[1] = newH[1] - 1;
					break;
				case 'L':
					newH[0] = newH[0] - 1;
					break;
				case 'R':
					newH[0] = newH[0] + 1;
					break;
			}
			const areTouching = Math.abs(newH[0] - newT[0]) < 2 && Math.abs(newH[1] - newT[1]) < 2;
			if (!areTouching) {
				if (newT[0] !== newH[0]) {
					newT[0] = newH[0] > newT[0] ? newT[0] + 1 : newT[0] - 1;
				}
				if (newT[1] !== newH[1]) {
					newT[1] = newH[1] > newT[1] ? newT[1] + 1 : newT[1] - 1;
				}
				newSet.add(newT.join(','));
			}
		});
		return [newSet, newH, newT];
	}, [new Set(), [0, 0], [0, 0]]);
	return placesTailVisited.size;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const t1Path = getTailPath(arr);
	const t9Path = _.range(2, 10).reduce((previousPath) => {
		const t2Path = getTailPathByAnotherPath(previousPath);
		return t2Path;
	}, t1Path);
	return new Set(t9Path).size;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(inst => inst.split(' ')).map(([op, arg]) => [op, parseInt(arg, 10)]);
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 13);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 6494);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1);

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