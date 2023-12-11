import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const [inst, nodes] = [..._arr];
	let currentNodes = Object.keys(nodes).filter(n => n.endsWith('A')); //?
	let currentInst = 0;
	while (!currentNodes.every(n => n.endsWith('Z'))) {
		currentNodes = currentNodes.map(n => nodes[n][inst[currentInst % inst.length]]);
		currentInst++;
		if (currentInst % 1000 === 0) console.log(currentInst);
	}
	let [i, , ...v] = (require("fs").readFileSync("input8.txt") + "").replace(/[\(\ )]/g, "").split`
`, m = {}
	v.map(x => {
		c = x.split`=`; let [a, b] = c[1].split`,`
		m[c[0]] = [b, a]
	})
	for (u = "AAA", p = r = 0; ; s = m[u], u = m[u][i[r++ % i.length] == "L" | 0], p++) { if (u == "ZZZ") break }
	console.log(p)
	return currentInst;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	return arr;
};

const processInput = (input: string): any => {
	const [inst, ...nodes] =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
	// .map(Number);
	return [inst.split('').map(i => i === 'L' ? 0 : 1), nodes.map(n => n.split(' = ')).reduce((acc, [k, v]) => {
		acc[k] = v.slice(1, -1).split(', ');
		return acc;
	}, {})];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 6);

		// const result = solve1(processInput(puzzleInput));
		// result; //?
		// assert.deepEqual(result, null);
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
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}