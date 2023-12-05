import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function convertValuesAccordingToRules (values: number[], rules: string[][]) {
	const rulesMap = rules.map(v => v.map(Number));
	return values.map(v => {
		const rule = rulesMap.find(r => v >= r[1] && v < r[1] + r[2]);
		return rule ? rule[0] + (v - rule[1]) : v;
	});
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const seeds = arr[0].split(': ')[1].split(' ').map(Number);
	const seedToSoilRule = arr[1].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const soils = convertValuesAccordingToRules(seeds, seedToSoilRule); //?

	const soilToFertilizerRule = arr[2].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const fertilizers = convertValuesAccordingToRules(soils, soilToFertilizerRule);//?

	const fertilizerToWaterRule = arr[3].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const waters = convertValuesAccordingToRules(fertilizers, fertilizerToWaterRule);//?

	const waterToLightRule = arr[4].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const lights = convertValuesAccordingToRules(waters, waterToLightRule);//?

	const lightToTemperatureRule = arr[5].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const temperatures = convertValuesAccordingToRules(lights, lightToTemperatureRule);//?

	const temperatureToHumidityRule = arr[6].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const humidities = convertValuesAccordingToRules(temperatures, temperatureToHumidityRule);//?

	const humidityToLocationRule = arr[7].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
	const locations = convertValuesAccordingToRules(humidities, humidityToLocationRule);//?

	return _.min(locations);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const seeds = arr[0].split(': ')[1].split(' ').map(Number);
	let min = Infinity;
	for (let i = 0; i < seeds.length; i += 2) {
		console.log('checking: ',seeds[i], seeds[i + 1] + seeds[i]);
		for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
			const seedToSoilRule = arr[1].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const soils = convertValuesAccordingToRules([j], seedToSoilRule); //?

			const soilToFertilizerRule = arr[2].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const fertilizers = convertValuesAccordingToRules(soils, soilToFertilizerRule);//?

			const fertilizerToWaterRule = arr[3].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const waters = convertValuesAccordingToRules(fertilizers, fertilizerToWaterRule);//?

			const waterToLightRule = arr[4].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const lights = convertValuesAccordingToRules(waters, waterToLightRule);//?

			const lightToTemperatureRule = arr[5].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const temperatures = convertValuesAccordingToRules(lights, lightToTemperatureRule);//?

			const temperatureToHumidityRule = arr[6].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const humidities = convertValuesAccordingToRules(temperatures, temperatureToHumidityRule);//?

			const humidityToLocationRule = arr[7].split(':\n').slice(1)[0].split('\n').map(v => v.split(' '));
			const [location] = convertValuesAccordingToRules(humidities, humidityToLocationRule);//?
			
			if (location < min) {
				min = location;
			}
		}
	}
	return min;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v)
	// .map(Number);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 35);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 46);

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