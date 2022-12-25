import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _, { isNumber } from 'lodash';

export const solve1 = (_arr: any): any => {
	const arr = { ..._arr };
	while (Array.isArray(arr.root)) {
		Object.keys(arr).forEach((key) => {
			if (Array.isArray(arr[key])) {
				const [m1, op, m2] = arr[key];
				if (isNumber(arr[m1]) && isNumber(arr[m2])) {
					arr[key] = Number(eval(`${arr[m1]} ${op} ${arr[m2]}`));
				}
			}
		});
	}
	return arr.root;
};

export const solve2 = (_arr: any): any => {
	const arr = { ..._arr };
	const map: Record<string, string> = {};

	while (Array.isArray(arr.root)) {
		Object.keys(arr).forEach((key) => {
			if (Array.isArray(arr[key])) {
				const [m1, op, m2] = arr[key];
				if (isNumber(arr[m1]) && isNumber(arr[m2])) {
					const m1v = m1 === 'humn' ? 'humn' : isNumber(_arr[m1]) ? _arr[m1] : map[m1].includes('humn') ? `(${map[m1]})` : arr[m1];
					const m2v = m2 === 'humn' ? 'humn' : isNumber(_arr[m2]) ? _arr[m2] : map[m2].includes('humn') ? `(${map[m2]})` : arr[m2];
					let mapValue = `${m1v} ${key === 'root' ? '===' : op} ${m2v}`;
					map[key] = `${m1v} ${key === 'root' ? '===' : op} ${m2v}`;
					arr[key] = Number(eval(`${arr[m1]} ${op} ${arr[m2]}`));
				}
			}
		});
	}

	let humn = 0;

	// not very efficient, ended up doing the math by hand
	// while (true) {
	// 	if (humn % 10000) console.log(`checking ${humn}...`);
	// 	if (eval(map.root)) {
	// 		console.log(`humn should be ${humn}!`)
	// 		return humn;
	// 	}
	// 	humn = humn + 1;
	// }
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.reduce((acc, cur) => {
		const [key, value] = cur.split(': ');
		const finalValue = value.includes(' ') ? value.split(' ') : Number(value);
		return { ...acc, [key]: finalValue }
	}, {});
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 152);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 110181395003396);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 301);

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