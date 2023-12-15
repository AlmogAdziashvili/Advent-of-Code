import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';
import hashSum from 'hash-sum';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	let swapped = true;
	while (swapped) {
		swapped = false;
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				if (arr[i][j] === '.' && arr[i + 1][j] === 'O') {
					swapped = true;
					[arr[i][j], arr[i + 1][j]] = [arr[i + 1][j], arr[i][j]];
				}
			}
		}
	}
	return arr.reduce((acc, curr, r) => {
		return acc + (curr.filter((v) => v === 'O').length * (arr.length - r));
	}, 0);
};

function tiltNorth (arr: string[][]) {
	let swapped = true;
	while (swapped) {
		swapped = false;
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				if (arr[i][j] === '.' && arr[i + 1][j] === 'O') {
					swapped = true;
					[arr[i][j], arr[i + 1][j]] = [arr[i + 1][j], arr[i][j]];
				}
			}
		}
	}
}

function upsideDown (arr: string[][]) {
	for (let i = 0; i < arr.length / 2; i++) {
		[arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]];
	}
}

function mirrorVert (arr: string[][]) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length / 2; j++) {
			[arr[i][j], arr[i][arr[i].length - j - 1]] = [arr[i][arr[i].length - j - 1], arr[i][j]];
		}
	}
}

function _hashMap (map: string[][]): string {
	return hashSum(map.map((row) => row.join('')));
}

export const solve2 = (_arr: any[]): any => {
	let arr = [..._arr];
	const cache: { [key: string]: number } = {};
	let rest = 0;
	const cycle = 1000000000;

	for (let cycleIdx = 0; cycleIdx < cycle; cycleIdx++) {
		tiltNorth(arr);
		arr = _.zip(...arr);
		tiltNorth(arr);
		arr = _.zip(...arr);
		upsideDown(arr);
		tiltNorth(arr);
		upsideDown(arr);
		mirrorVert(arr);
		arr = _.zip(...arr);
		tiltNorth(arr);
		arr = _.zip(...arr);
		mirrorVert(arr);

		arr //?

		const hash = _hashMap(arr);

		if (!cache.hasOwnProperty(hash)) {
			cache[hash] = cycleIdx;
		} else {
			const diff = cycleIdx - cache[hash]!;
			const head = cache[hash]!;
			rest = cycle - Math.floor((cycle - head) / diff) * diff - head - 1;
			break;
		}
	}

	return arr.reduce((acc, curr, r) => {
		return acc + (curr.filter((v) => v === 'O').length * (arr.length - r));
	}, 0);
};


let _map: string[][] = [];

function TotalSpinCycleNorthBeam(input): number {
    const data: string[] = input.split('\n');

    let rest = 0;
    _map = data.map((line) => line.split(''));

    const cycle = 1000000000;
    const cache: { [key: string]: number } = {};

    for (let cycleIdx = 0; cycleIdx < cycle; cycleIdx++) {
        for (let _ = 0; _ < 4; _++) {
            tilt();
            turn();
        }

        const hash = _hashMap(_map);

        if (!cache.hasOwnProperty(hash)) {
            cache[hash] = cycleIdx;
        } else {
            const diff = cycleIdx - cache[hash]!;
            const head = cache[hash]!;
            rest = cycle - Math.floor((cycle - head) / diff) * diff - head - 1;
            break;
        }
    }

    for (let _ = 0; _ < rest; _++) {
        for (let _ = 0; _ < 4; _++) {
            tilt();
            turn();
        }
    }
    const result = countTotalLoad();
    console.log(result + 4);
    return result;
}

function tilt(): void {
    for (let i = 1; i < _map.length; i++) {
        for (let x = 0; x < _map[i].length; x++) {
            if (_map[i][x] === 'O') {
                const col: string[] = Array.from({ length: _map.length }, (_, y) => _map[y][x]);
                let prevY = i;
                for (let y = i - 1; y >= 0; y--) {
                    if (col[y] === '.') {
                        _map[y][x] = 'O';
                        _map[prevY][x] = '.';
                        prevY = y;
                    } else if (col[y] === '#') {
                        break;
                    }
                }
            }
        }
    }
}

function turn(): string[][] {
    _map = Array.from({ length: _map[0].length }, (_, i) =>
        Array.from(_map.map((row) => row[i]).reverse())
    );
    return _map;
}

function countTotalLoad(): number {
    const height: number = _map.length;
    return Array.from({ length: height }, (_, i) =>
        (height - i) * _map[i].filter((c) => c === 'O').length
    ).reduce((acc, value) => acc + value, 0);
}

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(''))
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 136);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		// const testResult = TotalSpinCycleNorthBeam(exampleInput);
		// testResult; //?
		// assert.deepEqual(testResult, null);

		const result = TotalSpinCycleNorthBeam(puzzleInput);
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