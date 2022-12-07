import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

type FileSystem = {
	files?: { size: number, fileName: string }[],
} & { [key: string]: FileSystem };

const generateFilesystem = (output: string[]): FileSystem => {
	const { fileSystem } = output.reduce(({ fileSystem, currentDir }, currentLine) => {
		if (currentLine.startsWith('$ cd ')) {
			const cdDir = currentLine.split('$ cd ')[1];
			if (cdDir === '/') {
				return { fileSystem, currentDir: '/' };
			}
			if (cdDir === '..') {
				return { fileSystem, currentDir: currentDir.split('/').slice(0, -1).join('/') };
			}
			return { fileSystem, currentDir: `${currentDir}/${cdDir}` };
		}
		if (currentLine.startsWith('$ ls')) {
			return { fileSystem, currentDir };
		}

		const path = currentDir.split('/').filter(Boolean);
		const newFileSystem = _.cloneDeep(fileSystem);
		const pathInFileSystem = path.reduce((acc, curr) => (acc[curr]), newFileSystem);
		if (currentLine.startsWith('dir ')) {
			const dirName = currentLine.split('dir ')[1];
			pathInFileSystem[dirName] = {};
		} else {
			const [sizeString, fileName] = currentLine.split(' ');
			const size = parseInt(sizeString);
			pathInFileSystem.files = pathInFileSystem.files || [];
			pathInFileSystem.files.push({ size, fileName });
		}
		return { fileSystem: newFileSystem, currentDir }
	}, { fileSystem: {}, currentDir: '/' });
	return fileSystem;
};

const getDirectorySize = (fileSystemPath: FileSystem): number => {
	const innerDirectorySizes = Object.values(fileSystemPath).reduce((acc, curr) => {
		if (!Array.isArray(curr)) {
			return acc + getDirectorySize(curr);
		}
		return acc;
	}, 0);
	if (!fileSystemPath.files) {
		return innerDirectorySizes;
	}
	const filesSize = _.sumBy(fileSystemPath.files, 'size');
	return filesSize + innerDirectorySizes;
};

const getAllDirectoriesSizes = (fileSystemPath: FileSystem, currentDirectory = '/'): Record<string, number> => {
	const directories = Object.keys(fileSystemPath).filter((key) => key !== 'files');
	if (directories.length !== 0) {
		const directoriesSizes = directories.reduce((acc, name) => ({ ...acc, ...getAllDirectoriesSizes(fileSystemPath[name], `${currentDirectory}/${name}`) }), {});
		return { ...directoriesSizes, [currentDirectory]: getDirectorySize(fileSystemPath) };
	}
	return { [currentDirectory]: getDirectorySize(fileSystemPath) };
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const fileSystem = generateFilesystem(arr);
	const allDirectoriesSizes = getAllDirectoriesSizes(fileSystem);
	const allDirectoriesWithSizeLessThen100KB = Object.values(allDirectoriesSizes).filter((size) => size <= (100 * 1000));
	return _.sum(allDirectoriesWithSizeLessThen100KB);
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const fileSystem = generateFilesystem(arr);
	const allDirectoriesSizes = getAllDirectoriesSizes(fileSystem);
	const neededSpace = 30000000 - 70000000 + allDirectoriesSizes['/'];
	const allDirectoriesWithSizeMoreThenNeededSpace = Object.values(allDirectoriesSizes).filter((size) => size >= neededSpace);
	const sortedDirectories = _.sortBy(allDirectoriesWithSizeMoreThenNeededSpace);
	return sortedDirectories[0];
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 95437);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1367870);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 24933642);

		const result = solve2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 549173);
	});
} else {
	console.time('part1');
	console.log('Part 1 Solution: ', solve1(processInput(puzzleInput)));
	console.timeEnd('part1');
	console.time('part2');
	console.log('Part 2 Solution: ', solve2(processInput(puzzleInput)));
	console.timeEnd('part2');
}