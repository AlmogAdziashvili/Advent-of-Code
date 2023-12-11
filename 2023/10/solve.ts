import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';
import chalk from 'chalk';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const sRow = arr.findIndex(l => l.findIndex(c => c === 'S') > -1);
	const sCol = arr[sRow].findIndex(c => c === 'S');
	let currentPos = [sRow, sCol - 1];
	let fromDir = 'E';
	let steps = 1;
	while (arr[currentPos[0]][currentPos[1]] !== 'S') {
		steps++;
		const currentPipe = arr[currentPos[0]][currentPos[1]];
		if (currentPipe === '|') {
			if (fromDir === 'N') {
				currentPos[0]++;
			} else if (fromDir === 'S') {
				currentPos[0]--;
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === '-') {
			if (fromDir === 'E') {
				currentPos[1]--;
			} else if (fromDir === 'W') {
				currentPos[1]++;
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === 'L') {
			if (fromDir === 'N') {
				currentPos[1]++;
				fromDir = 'W';
			} else if (fromDir === 'E') {
				currentPos[0]--;
				fromDir = 'S';
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === 'J') {
			if (fromDir === 'N') {
				currentPos[1]--;
				fromDir = 'E';
			} else if (fromDir === 'W') {
				currentPos[0]--;
				fromDir = 'S';
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === '7') {
			if (fromDir === 'S') {
				currentPos[1]--;
				fromDir = 'E';
			} else if (fromDir === 'W') {
				currentPos[0]++;
				fromDir = 'N';
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === 'F') {
			if (fromDir === 'S') {
				currentPos[1]++;
				fromDir = 'W';
			} else if (fromDir === 'E') {
				currentPos[0]++;
				fromDir = 'N';
			} else {
				throw new Error('Invalid direction');
			}
		}
	}
	return steps / 2;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const sRow = arr.findIndex(l => l.findIndex(c => c === 'S') > -1);
	const sCol = arr[sRow].findIndex(c => c === 'S');
	let currentPos = [sRow, sCol - 1];
	let fromDir = 'E';
	let steps = 1;
	while (arr[currentPos[0]][currentPos[1]] !== 'S') {
		steps++;
		const currentPipe = arr[currentPos[0]][currentPos[1]];
		arr[currentPos[0]][currentPos[1]] = chalk.yellow('$');
		if (currentPipe === '|') {
			if (fromDir === 'N') {
				currentPos[0]++;
			} else if (fromDir === 'S') {
				currentPos[0]--;
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === '-') {
			if (fromDir === 'E') {
				currentPos[1]--;
			} else if (fromDir === 'W') {
				currentPos[1]++;
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === 'L') {
			if (fromDir === 'N') {
				currentPos[1]++;
				fromDir = 'W';
			} else if (fromDir === 'E') {
				currentPos[0]--;
				fromDir = 'S';
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === 'J') {
			if (fromDir === 'N') {
				currentPos[1]--;
				fromDir = 'E';
			} else if (fromDir === 'W') {
				currentPos[0]--;
				fromDir = 'S';
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === '7') {
			if (fromDir === 'S') {
				currentPos[1]--;
				fromDir = 'E';
			} else if (fromDir === 'W') {
				currentPos[0]++;
				fromDir = 'N';
			} else {
				throw new Error('Invalid direction');
			}
		} else if (currentPipe === 'F') {
			if (fromDir === 'S') {
				currentPos[1]++;
				fromDir = 'W';
			} else if (fromDir === 'E') {
				currentPos[0]++;
				fromDir = 'N';
			} else {
				throw new Error('Invalid direction');
			}
		}
	}
	const pool = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][0] !== '$')  pool.push([i, 0]);
		if (arr[i][arr[0].length - 1] !== '$')  pool.push([i, arr[0].length - 1]);
	}
	for (let i = 0; i < arr[0].length; i++) {
		if (arr[0][i] !== '$')  pool.push([0, i]);
		if (arr[arr.length - 1][i] !== '$')  pool.push([arr.length - 1, i]);
	}
	while (pool.length > 0) {
		const [row, col] = pool.shift()!;
		if (arr[row][col] === chalk.yellow('$')) {
			continue;
		}
		arr[row][col] = ' ';
		if ((col < arr[0].length - 1) && arr[row][col + 1] !== '$' && arr[row][col + 1] !== ' ') {
			pool.push([row, col + 1]);
		}
		if (col && arr[row][col - 1] !== '$' && arr[row][col - 1] !== ' ') {
			pool.push([row, col - 1]);
		}
		if ((row < (arr.length - 1)) && arr[row + 1][col] !== '$' && arr[row + 1][col] !== ' ') {
			pool.push([row + 1, col]);
		}
		if (row && arr[row - 1][col] !== '$' && arr[row - 1][col] !== ' ') {
			pool.push([row - 1, col]);
		}
	}
	let innerTiles = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			const val = arr[i][j];
			if (val !== ' ' && val !== chalk.yellow('$') && val !== 'S') {
				arr[i][j] = chalk.red(val);
				innerTiles++;
			}
		}
	}
	console.log(arr.map(l => l.join('')).join('\n'));
	return innerTiles;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(''))
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		// const testResult = solve1(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, 8);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		// const testResult = solve2(processInput(exampleInput));
		// testResult; //?
		// assert.deepEqual(testResult, null);

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