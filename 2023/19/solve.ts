import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

export const solve1 = (_arr: any[]): any => {
	const [workflows, ratings] = [..._arr];
	const approvedRatings = ratings.filter((rating) => {
		let currentWorkflow = workflows['in'];
		while (true) {
			if (eval(currentWorkflow.split(':')[0].replace(currentWorkflow[0], rating[currentWorkflow[0]]))) {
				let nextI = currentWorkflow.split(':')[1].split(',')[0];
				if (nextI === 'A') {
					return true;
				}
				if (nextI === 'R') {
					return false;
				}
				currentWorkflow = workflows[nextI];
				continue;
			} else {
				let nextI = currentWorkflow.split(':').slice(1).join(':').split(',').slice(1).join(',');
				if (nextI === 'A') {
					return true;
				}
				if (nextI === 'R') {
					return false;
				}
				if (nextI.includes('<') || nextI.includes('>')) {
					currentWorkflow = nextI;
					continue;
				}
				currentWorkflow = workflows[nextI];
				continue;
			}
		}
	});
	return _.sum(approvedRatings.map(({ x, m, a, s }) => x + m + a + s));
};

export const solve2 = (_arr: any[]): any => {
	const [workflows] = [..._arr];
	const xRanges = [1];
	const mRanges = [1];
	const aRanges = [1];
	const sRanges = [1];
	Object.values(workflows).forEach((workflow: string, i) => {
		const xt = workflow.match(/x(<|>)\d*:/g);
		if (xt) {
			xt.forEach(xq => {
				if (xq.includes('<')) {
					xRanges.push(Number(xq.split(':')[0].split('x')[1].slice(1)));
				} else {
					xRanges.push(Number(xq.split(':')[0].split('x')[1].slice(1)) + 1);
				}
			});
		}
		const mt = workflow.match(/m(<|>)\d*:/g);
		if (mt) {
			mt.forEach(mq => {
				if (mq.includes('<')) {
					mRanges.push(Number(mq.split(':')[0].split('m')[1].slice(1)));
				} else {
					mRanges.push(Number(mq.split(':')[0].split('m')[1].slice(1)) + 1);
				}
			});
		}
		const at = workflow.match(/a(<|>)\d*:/g);
		if (at) {
			at.forEach(aq => {
				if (aq.includes('<')) {
					aRanges.push(Number(aq.split(':')[0].split('a')[1].slice(1)));
				} else {
					aRanges.push(Number(aq.split(':')[0].split('a')[1].slice(1)) + 1);
				}
			});
		}
		const st = workflow.match(/s(<|>)\d*:/g);
		if (st) {
			st.forEach(sq => {
				if (sq.includes('<')) {
					sRanges.push(Number(sq.split(':')[0].split('s')[1].slice(1)));
				} else {
					sRanges.push(Number(sq.split(':')[0].split('s')[1].slice(1)) + 1);
				}
			});
		}
	});
	xRanges.sort((a, b) => (a - b));//?
	mRanges.sort((a, b) => (a - b));//?
	aRanges.sort((a, b) => (a - b));//?
	sRanges.sort((a, b) => (a - b));//?
	console.log(xRanges.length, mRanges.length, aRanges.length, sRanges.length, xRanges.length * mRanges.length * aRanges.length * sRanges.length);
	const ratings = [];
	for (let x in xRanges) {
		console.log(`x: ${x}/${xRanges.length}`);
		for (let m in mRanges) {
			for (let a in aRanges) {
				for (let s in sRanges) {
					ratings.push({
						x: xRanges[x],
						m: mRanges[m],
						a: aRanges[a],
						s: sRanges[s],
						combinations: ((xRanges[Number(x) + 1] || 4001) - xRanges[x]) * ((mRanges[Number(m) + 1] || 4001) - mRanges[m]) * ((aRanges[Number(a) + 1] || 4001) - aRanges[a]) * ((sRanges[Number(s) + 1] || 4001) - sRanges[s]),
						xx: (xRanges[Number(x) + 1] || 4001) - xRanges[x],
						mm: (mRanges[Number(m) + 1] || 4001) - mRanges[m],
						aa: (aRanges[Number(a) + 1] || 4001) - aRanges[a],
						ss: (sRanges[Number(s) + 1] || 4001) - sRanges[s],
					});
				}
			}
		}
	}
	console.log('ratings creation done');
	const approvedRatings = ratings.filter((rating, i) => {
		if (i % 100000 === 0) {
			console.log(`rating: ${i}/${ratings.length}`);
		}
		let currentWorkflow = workflows['in'];
		while (true) {
			if (eval(currentWorkflow.split(':')[0].replace(currentWorkflow[0], rating[currentWorkflow[0]]))) {
				let nextI = currentWorkflow.split(':')[1].split(',')[0];
				if (nextI === 'A') {
					return true;
				}
				if (nextI === 'R') {
					return false;
				}
				currentWorkflow = workflows[nextI];
				continue;
			} else {
				let nextI = currentWorkflow.split(':').slice(1).join(':').split(',').slice(1).join(',');
				if (nextI === 'A') {
					return true;
				}
				if (nextI === 'R') {
					return false;
				}
				if (nextI.includes('<') || nextI.includes('>')) {
					currentWorkflow = nextI;
					continue;
				}
				currentWorkflow = workflows[nextI];
				continue;
			}
		}
	}); //?
	return _.sum(approvedRatings.map(({ combinations }) => combinations));
};

const processInput = (input: string): any => {
	const [_workflows, _ratings] =
		input.split('\n\n')
			.map(n => n.trim())
			.filter((v) => !!v);
	const workflows = _workflows.split('\n').reduce((acc, line) => {
		acc[line.split('{')[0]] = line.split('{')[1].split('}')[0];
		return acc;
	}, {});
	const ratings = _ratings.split('\n').map((line) => {
		return {
			x: parseInt(line.split('x=')[1]),
			m: parseInt(line.split('m=')[1]),
			a: parseInt(line.split('a=')[1]),
			s: parseInt(line.split('s=')[1]),
		}
	});
	return [workflows, ratings];
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 19114);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 167409079868000);

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