import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const nextMonkeys = _.cloneDeep(_arr);
	_.range(0, 20).forEach(() => {
		nextMonkeys.forEach((monkey, i) => {
			monkey.items.forEach((item) => {
				monkey.timesInspected = monkey.timesInspected + 1;
				const newItemLevel = monkey.operation(item);
				const newMonkey = monkey.test(newItemLevel);
				nextMonkeys[newMonkey].items.push(newItemLevel);
			});
			monkey.items = [];
		});
	});

	nextMonkeys //?

	const timesInspected = nextMonkeys.map(monkey => monkey.timesInspected);
	const timesInspectedSorted = _.reverse(_.sortBy(timesInspected));

	return timesInspectedSorted[0] * timesInspectedSorted[1];
};

export const solve2 = (_arr: any[]): any => {
	const nextMonkeys = _.cloneDeep(_arr);
	_.range(0, 10000).forEach((i) => {
		nextMonkeys.forEach((monkey) => {
			monkey.items.forEach(item => {
				monkey.timesInspected = monkey.timesInspected + 1;
				const newItemLevel = monkey.operation(item, false);
				const newMonkey = monkey.test(newItemLevel);
				nextMonkeys[newMonkey].items.push(newItemLevel);
			});
			monkey.items = [];
		});
	});

	nextMonkeys //?

	const timesInspected = nextMonkeys.map(monkey => monkey.timesInspected);
	const timesInspectedSorted = _.reverse(_.sortBy(timesInspected));

	return timesInspectedSorted[0] * timesInspectedSorted[1];
};

const processInput = (input: string): any => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);

	const monkeys = n.map(monkey => {
		const lines = monkey.split('\n');
		const op = lines[2].includes('*') ? '*' : '+';
		const value = lines[2].split(' ')[7] === 'old' ? 'old' : Number(lines[2].split(' ')[7]);
		const testValue = Number(lines[3].split(' ')[5]);
		const testTrue = Number(lines[4].split(' ')[9]);
		const testFalse = Number(lines[5].split(' ')[9]);
		return {
			items: lines[1].split(': ')[1].split(', ').map(Number),
			timesInspected: 0,
			testValue,
			operation: (oldValue: Record<number, number>, reduceStress = true): Record<number, number> => {
				Object.keys(oldValue).forEach(key => {
					const val = value === 'old' ? oldValue[key] : value;
					const result = Math.floor(op === '*' ? oldValue[key] * val : oldValue[key] + val);
					const finalResult = reduceStress ? Math.floor(result / 3) : result;
					oldValue[key] = reduceStress ? finalResult : finalResult % Number(key);
				});
				return oldValue;
			},
			test: (value: Record<number, number>): number => {
				if (value[testValue] % testValue === 0) return testTrue;
				return testFalse;
			}
		};
	});

	const allTesValues = monkeys.map(monkey => monkey.testValue);
	return monkeys.map((monkey) => ({
		...monkey,
		items: monkey.items.map(item => allTesValues.reduce((acc, testValue) => ({ ...acc, [testValue]: item }), {}))
	}));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 10605);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 66124);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 2713310158);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 19309892877);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}