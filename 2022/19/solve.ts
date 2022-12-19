import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';


const testBlueprint = (blueprint, time) => {
	const maxRobots = {
		ore: Math.max(
			blueprint.oreCost,
			blueprint.clayCost,
			blueprint.obsidianCost[0],
			blueprint.geodeCost[0]
		),
		clay: blueprint.obsidianCost[1],
	};

	let maxGeode = 0;
	const search = (time, oreRobots, clayRobots, obsidianRobots, ore, clay, obsidian, geodes) => {
		if (time < 1) return;

		if (geodes + (time * (time + 1)) / 2 < maxGeode) return;
		if (geodes > maxGeode) {
			maxGeode = geodes;
		}

		if (obsidianRobots > 0) {
			const canBuildGeodeNow = blueprint.geodeCost[0] <= ore && blueprint.geodeCost[1] <= obsidian;
			const timeSkip = 1 +
				(canBuildGeodeNow
					? 0
					: Math.max(
						Math.ceil((blueprint.geodeCost[0] - ore) / oreRobots),
						Math.ceil((blueprint.geodeCost[1] - obsidian) / obsidianRobots)
					)
				);

			search(
				time - timeSkip,
				oreRobots,
				clayRobots,
				obsidianRobots,
				ore + timeSkip * oreRobots - blueprint.geodeCost[0],
				clay + timeSkip * clayRobots,
				obsidian + timeSkip * obsidianRobots - blueprint.geodeCost[1],
				geodes + time - timeSkip
			);

			if (canBuildGeodeNow) return;
		}

		if (clayRobots > 0) {
			const canBuildObsidianNow =
				blueprint.obsidianCost[0] <= ore && blueprint.obsidianCost[1] <= clay;
			const timeSkip = 1 +
				(canBuildObsidianNow
					? 0
					: Math.max(
						Math.ceil((blueprint.obsidianCost[0] - ore) / oreRobots),
						Math.ceil((blueprint.obsidianCost[1] - clay) / clayRobots)
					)
				);

			if (time - timeSkip > 2) {
				search(
					time - timeSkip,
					oreRobots,
					clayRobots,
					obsidianRobots + 1,
					ore + timeSkip * oreRobots - blueprint.obsidianCost[0],
					clay + timeSkip * clayRobots - blueprint.obsidianCost[1],
					obsidian + timeSkip * obsidianRobots,
					geodes
				);
			}
		}

		if (clayRobots < maxRobots.clay) {
			const canBuildClayNow = blueprint.clayCost <= ore;
			const timeSkip = 1 + (canBuildClayNow ? 0 : Math.ceil((blueprint.clayCost - ore) / oreRobots));

			if (time - timeSkip > 3) {
				search(
					time - timeSkip,
					oreRobots,
					clayRobots + 1,
					obsidianRobots,
					ore + timeSkip * oreRobots - blueprint.clayCost,
					clay + timeSkip * clayRobots,
					obsidian + timeSkip * obsidianRobots,
					geodes
				);
			}
		}

		if (oreRobots < maxRobots.ore) {
			const canBuildOreNow = blueprint.oreCost <= ore;
			const timeSkip = 1 + (canBuildOreNow ? 0 : Math.ceil((blueprint.oreCost - ore) / oreRobots)); //Todo maybe add one here

			if (time - timeSkip > 4) {
				search(
					time - timeSkip,
					oreRobots + 1,
					clayRobots,
					obsidianRobots,
					ore + timeSkip * oreRobots - blueprint.oreCost,
					clay + timeSkip * clayRobots,
					obsidian + timeSkip * obsidianRobots,
					geodes
				);
			}
		}
	};

	search(time, 1, 0, 0, 0, 0, 0, 0);
	return maxGeode;
};

export const solve1 = (_arr: any[]): any => {
	const blueprints = [..._arr];

	const quality = blueprints.map(blueprint => blueprint.number * testBlueprint(blueprint, 24));
	return _.sum(quality);
};

export const solve2 = (_arr: any[]): any => {
	const blueprints = [..._arr];

	const scores = blueprints.slice(0, 3).map(blueprint => testBlueprint(blueprint, 32));
  return scores.reduce(_.multiply, 1);
};

const processInput = (input: string) => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n.map((l, i) => ({
		number: i + 1,
		oreCost: Number(l.split('Each ore robot costs ')[1].split(' ore')[0]),
		clayCost: Number(l.split('Each clay robot costs ')[1].split(' ore')[0]),
		obsidianCost: [Number(l.split('Each obsidian robot costs ')[1].split(' ore and ')[0]), Number(l.split('Each obsidian robot costs ')[1].split(' ore and ')[1].split(' clay')[0])],
		geodeCost: [Number(l.split(' clay. Each geode robot costs ')[1].split(' ore and ')[0]), Number(l.split(' clay. Each geode robot costs ')[1].split(' ore and ')[1].split(' obsidian')[0]],
	}));
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 33);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1962);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 3472);

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