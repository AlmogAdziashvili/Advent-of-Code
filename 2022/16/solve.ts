import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

const dijkstra = (graph: Record<string, {
	rate: number,
	next: string[],
}>, source: string, destination: string) => {
	const dist: Record<string, number> = {};
	const prev: Record<string, string> = {};
	const Q: string[] = [];

	for (const v in graph) {
		if (v === source) {
			dist[v] = 0;
		} else {
			dist[v] = Infinity;
		}
		prev[v] = null;
		Q.push(v);
	}

	while (Q.length > 0) {
		Q.sort((a, b) => dist[a] - dist[b]);
		const u = Q.shift();
		if (u === destination) {
			break;
		}
		for (const v of graph[u].next) {
			const alt = dist[u] + 1;
			if (alt < dist[v]) {
				dist[v] = alt;
				prev[v] = u;
			}
		}
	}

	return dist[destination];
};

const maxPath = (graph: Record<string, { rate: number }>, costMap: Record<string, Record<string, number>>, currentNode = 'AA', visited = ['AA'], timeLeft = 30, valueZero = []) => {
	if (timeLeft <= 0) {
		return 0;
	}
	const nextNodes = Object.keys(costMap[currentNode]).filter(n => !visited.includes(n) && !valueZero.includes(n));
	const minuteRate = _.sum(visited.map(k => graph[k].rate));
	if (nextNodes.length === 0) {
		return minuteRate * timeLeft;
	}
	return _.max(nextNodes.map(n => {
		const nextMoveCost = costMap[currentNode][n] + 1;
		if (nextMoveCost > timeLeft) {
			return minuteRate * timeLeft;
		}
		return nextMoveCost * minuteRate + maxPath(graph, costMap, n, [...visited, n], timeLeft - nextMoveCost, valueZero);
	})) || 0;
};

export const solve1 = (_arr: any[]): any => {
	const arr = { ..._arr } as any;
	const costMap = Object.keys(arr).filter(k => arr[k].rate || k === 'AA').reduce((acc, k, _, kArr) => {
		return {
			...acc,
			[k]: kArr.filter(k2 => k2 !== k).reduce((acc2, k2) => ({ ...acc2, [k2]: dijkstra(arr, k, k2) }), {}),
		}
	}, {});
	return maxPath(arr, costMap);
};

export const solve2 = (_arr: any[]): any => {
	const arr = { ..._arr } as any;
	const costMap = Object.keys(arr).filter(k => arr[k].rate || k === 'AA').reduce((acc, k, _, kArr) => {
		return {
			...acc,
			[k]: kArr.filter(k2 => k2 !== k).reduce((acc2, k2) => ({ ...acc2, [k2]: dijkstra(arr, k, k2) }), {}),
		}
	}, {});

	// @ts-ignore
	const permutations = (arr: string[], len = Math.floor(arr.length / 2)) => {
		if (len === 1) {
			return arr.map(v => [v]);
		}
		return arr.reduce((acc, v, i) => {
			const rest = arr.slice(i + 1);
			return [...acc, ...permutations(rest, len - 1).map(p => [v, ...p])];
		}, []);
	}
	const p1 = permutations(Object.keys(costMap));
	console.log(p1.length);
	const p2 = p1.map(p => _.difference(Object.keys(costMap), p));
	return _.max(_.range(0, p1.length).map(i => {
		console.log(`running ${i} of ${p1.length}`);
		const p1Score = maxPath(arr, costMap, undefined, undefined, 26, p2[i]);
		const p2Score = maxPath(arr, costMap, undefined, undefined, 26, p1[i]);
		return p1Score + p2Score;
	}));
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.reduce((acc, row) => {
		return {
			...acc,
			[row.split('Valve ')[1].split(' ')[0]]: {
				rate: Number(row.split('has flow rate=')[1].split(';')[0]),
				next: row.split(/valves?/)[1].trim().split(', '),
			},
		}
	}, {});
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1651);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1584);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 1707);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});
} else {
	// console.time('part1');
	// console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	// console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}