import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';
import { writeFile, writeFileSync } from 'fs';

const padInputImage = (inputImage: string[][], padWith: string) => {
	if (!inputImage.length) return inputImage;
	const padInput = inputImage.map(l => [padWith, padWith, ...l, padWith, padWith]);
	const emptyLine = padWith.repeat(padInput[0].length).split('');
	return [emptyLine, emptyLine, ...padInput, emptyLine, emptyLine];
}

const getBinary = (inputImage: string[][], i: number, j: number) => {
	let pixels = '';
	[-1, 0, 1].forEach((x) => {
		[-1, 0, 1].forEach((y) => {
			pixels += inputImage[i + x][j + y];
		});
	});
	return pixels.split('').map(c => c === '#' ? 1 : 0).join('');
}

const enhanceImage = (algorithm: string[], inputImage: string[][], n: number): string[][] => {
	if (!n) return inputImage;
	const padWith = algorithm[0] === '#' ? n % 2 === 0 ? algorithm[511] : algorithm[0] : algorithm[0];
	const paddedInput = padInputImage(inputImage, padWith);
	const outputImage = [];
	for (let i = 1; i < paddedInput.length - 1; i++) {
		outputImage[i - 1] = [];
		for (let j = 1; j < paddedInput[0].length - 1; j++) {
			const binary = getBinary(paddedInput, i, j);
			const num = parseInt(binary, 2);
			outputImage[i - 1][j - 1] = algorithm[num];
		}
	}
	return enhanceImage(algorithm, outputImage, n - 1);
}

export const solve1 = (algorithm: string[], inputImage: string[][]): any => {
	const enhanced = enhanceImage(algorithm, inputImage, 2);
	return _.countBy(_.flatten(enhanced))['#'];
};

export const solve2 = (algorithm: string[], inputImage: string[][]): any => {
	const enhanced = enhanceImage(algorithm, inputImage, 50);
	return _.countBy(_.flatten(enhanced))['#'];
};

const processInput = (input: string): [string[], string[][]] => {
	const n =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);

	const algorithm = n[0].split('');
	const image = n[1].split('\n').map(n => n.trim().split(''));
	return [algorithm, image];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(...processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 35);

		const result = solve1(...processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 5391);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(...processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 3351);

		const result = solve2(...processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 16383);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(...processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(...processInput(puzzleInput)));
	console.timeEnd('part2');
}