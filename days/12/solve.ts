import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const search = (map: Record<string, string[]>, current: string, seen: string[], canProceed: (seen: string[]) => boolean) => {
	const newSeen = [...seen];
	if (current === 'end') return 1;
	if (current === 'start' && newSeen.length) return 0;
	if (current.toLowerCase() === current) {
		newSeen.push(current);
		if (!canProceed(newSeen)) return 0;
	}
	if (!map[current]) return 0;
	return _.sum(map[current].map(next => search(map, next, newSeen, canProceed)));
}

export const solve1 = (_graph: any): any => {
	const canProceed = (seen: string[]) => {
		const countBy = _.countBy(seen);
		if (_.values(countBy).includes(2)) return false;
		return true
	}
	return search(_graph, 'start', [], canProceed);
};

export const solve2 = (_graph: any): any => {
	const canProceed = (seen: string[]) => {
		const countBy = _.countBy(seen);
		if (_.values(countBy).filter(_.curry(_.eq)(2)).length > 1 || _.values(countBy).includes(3)) return false;
		return true;
	}
	return search(_graph, 'start', [], canProceed);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.reduce((acc, cur) => {
				const [node1, node2] = cur.split('-');
				return {
					...acc,
					[node1]: [...(acc[node1] || []), node2],
					[node2]: [...(acc[node2] || []), node1],
				}
			}, {});
	return n;
};

if (globalThis.it) {
	it('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 36);


		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 108035);
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