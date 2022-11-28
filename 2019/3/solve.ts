import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const [wireOneMap, wireTwoMap] = arr.map(wirePath => {
		const wireCoordinates = new Map();
		const currentPosition = { x: 0, y: 0 };
		wirePath.forEach((instruction) => {
			const direction = instruction[0];
			const amount = Number(instruction.slice(1));
			_.range(amount).forEach(() => {
				switch(direction) {
					case 'U':
						currentPosition.y = currentPosition.y + 1;
						break;
					case 'R':
						currentPosition.x = currentPosition.x + 1;
						break;
					case 'L':
						currentPosition.x = currentPosition.x - 1;
						break;
					case 'D':
						currentPosition.y = currentPosition.y - 1;
						break;
				}
				wireCoordinates.set(`${currentPosition.x},${currentPosition.y}`, true);
			});
		});
		return wireCoordinates;
	});
	const intersections = new Set<string>();
	wireOneMap.forEach((_, key) => {
		if (wireTwoMap.has(key)) {
			intersections.add(key);
		}
	});
	const intersectionsDistanceFromRoot = [...intersections].map((intersection) => _.sum(_.map(intersection.split(','), Number)));
	return _.min(intersectionsDistanceFromRoot);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const [wireOneMap, wireTwoMap] = arr.map(wirePath => {
		const wireCoordinates = new Map();
		const currentPosition = { x: 0, y: 0, numberOfSteps: 0 };
		wirePath.forEach((instruction) => {
			const direction = instruction[0];
			const amount = Number(instruction.slice(1));
			_.range(amount).forEach(() => {
				switch(direction) {
					case 'U':
						currentPosition.y = currentPosition.y + 1;
						break;
					case 'R':
						currentPosition.x = currentPosition.x + 1;
						break;
					case 'L':
						currentPosition.x = currentPosition.x - 1;
						break;
					case 'D':
						currentPosition.y = currentPosition.y - 1;
						break;
				}
				currentPosition.numberOfSteps = currentPosition.numberOfSteps + 1;
				wireCoordinates.set(`${currentPosition.x},${currentPosition.y}`, currentPosition.numberOfSteps);
			});
		});
		return wireCoordinates;
	});
	const intersections = new Set<string>();
	wireOneMap.forEach((_, key) => {
		if (wireTwoMap.has(key)) {
			intersections.add(key);
		}
	});
	const intersectionsDistanceFromRoot = [...intersections].map((intersection) => _.sum([wireOneMap.get(intersection), wireTwoMap.get(intersection)]));
	return _.min(intersectionsDistanceFromRoot);
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map(row => row.split(','));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 135);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 557);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 410);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 56410);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}