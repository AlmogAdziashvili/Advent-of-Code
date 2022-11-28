import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (p1: number, p2: number): any => {
	const playersState = [{ points: 0, position: p1 }, { points: 0, position: p2 }];
	let resets = 0;
	let round = 1;
	let turn = 0;
	while (true) {
		let roundP = 0;
		for (let i = 0; i < 3; i++) {
			if (round > 100) {
				resets += 1;
				round = 1;
			}
			roundP += round;
			round++;
		}
		playersState[turn].position += roundP;
		while (playersState[turn].position > 10) playersState[turn].position -= 10;
		playersState[turn].points += playersState[turn].position;
		if (playersState[turn].points >= 1000) {
			break;
		}
		turn = 1 - turn;
	}
	return (100 * resets + (round - 1)) * _.min(playersState.map(s => s.points));
};

const wins = {};
const play = (p1: number, p2: number, s1: number, s2: number) => {
	if (s2 >= 21) return [0, 1];
	const key = [p1, p2, s1, s2].join(",");
	const cached = wins[key];
	if (cached) return cached;
	const results = [0, 0];
	[1, 2, 3].forEach(r1 => {
		[1, 2, 3].forEach(r2 => {
			[1, 2, 3].forEach(r3 => {
				const newPosition = ((_.sum([p1, r1, r2, r3]) - 1) % 10) + 1;
				const newScore = s1 + newPosition;
				const playRes = play(p2, newPosition, s2, newScore);
				results[0] += playRes[1];
				results[1] += playRes[0];
			});
		});
	});
	wins[key] = results;
	return results;
}

export const solve2 = (p1: number, p2: number): any => {
	return _.max(play(p1, p2, 0, 0));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(4, 8);
		testResult; //?
		assert.deepEqual(testResult, 739785);

		const result = solve1(10, 4);
		result; //?
		assert.deepEqual(result, 908091);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(4, 8);
		testResult; //?
		assert.deepEqual(testResult, 444356092776315);

		const result = solve2(10, 4);
		result; //?
		assert.deepEqual(result, 190897246590017);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(10, 4));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(10, 4));
	console.timeEnd('part2');
}