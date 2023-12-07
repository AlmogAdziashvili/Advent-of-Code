import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import _ from 'lodash';

function isFourOfAKind (_cards: string[], filterJokers?: boolean): boolean {
	const cards = filterJokers ? _cards.filter(c => c !== 'J') : _cards;
	const first = cards[0] || NaN;
	const second = cards[1] || NaN;
	const third = cards[2] || NaN;
	const fourth = cards[3] || NaN;
	const fifth = cards[4] || NaN;
	return (
		(first === second && second === third && third === fourth) ||
		(second === third && third === fourth && fourth === fifth)
	);
}

function isFullHouse (_cards: string[], filterJokers?: boolean): boolean {
	const cards = filterJokers ? _cards.filter(c => c !== 'J') : _cards;
	const first = cards[0] || NaN;
	const second = cards[1] || NaN;
	const third = cards[2] || NaN;
	const fourth = cards[3] || NaN;
	const fifth = cards[4] || NaN;
	return (
		(first === second && second === third && fourth === fifth) ||
		(first === second && third === fourth && fourth === fifth)
	);
}

function isThreeOfAKind (_cards: string[], filterJokers?: boolean): boolean {
	const cards = filterJokers ? _cards.filter(c => c !== 'J') : _cards;
	const first = cards[0] || NaN;
	const second = cards[1] || NaN;
	const third = cards[2] || NaN;
	const fourth = cards[3] || NaN;
	const fifth = cards[4] || NaN;
	return (
		(first === second && second === third) ||
		(second === third && third === fourth) ||
		(third === fourth && fourth === fifth)
	);
}

function isTwoPairs (_cards: string[], filterJokers?: boolean): boolean {
	const cards = filterJokers ? _cards.filter(c => c !== 'J') : _cards;
	const first = cards[0] || NaN;
	const second = cards[1] || NaN;
	const third = cards[2] || NaN;
	const fourth = cards[3] || NaN;
	const fifth = cards[4] || NaN;
	return (
		(first === second && third === fourth) ||
		(first === second && fourth === fifth) ||
		(second === third && fourth === fifth)
	);
}

function isPair (_cards: string[], filterJokers?: boolean): boolean {
	const cards = filterJokers ? _cards.filter(c => c !== 'J') : _cards;
	const first = cards[0] || NaN;
	const second = cards[1] || NaN;
	const third = cards[2] || NaN;
	const fourth = cards[3] || NaN;
	const fifth = cards[4] || NaN;
	return (
		(first === second) ||
		(second === third) ||
		(third === fourth) ||
		(fourth === fifth)
	);
}

function getHandType (hand: string): number {
	const cards = hand.split('').sort();
	const jokerCount = cards.filter(c => c === 'J').length;
	if (cards.every(c => c === cards[0]) || (jokerCount === 1 && isFourOfAKind(cards, true)) || (jokerCount === 2 && isThreeOfAKind(cards, true)) || (jokerCount === 3 && isPair(cards, true)) || (jokerCount === 4)) {
		return 7;
	}
	if (isFourOfAKind(cards) || (jokerCount === 1 && isThreeOfAKind(cards, true)) || (jokerCount === 2 && isPair(cards, true)) || (jokerCount === 3)) {
		return 6;
	}
	if (isFullHouse(cards) || (jokerCount === 1 && isTwoPairs(cards, true)) || (jokerCount === 2 && isPair(cards, true))) {
		return 5;
	}
	if (isThreeOfAKind(cards) || (jokerCount === 1 && isPair(cards, true)) || (jokerCount === 2)) {
		return 4;
	}
	if (isTwoPairs(cards)) {
		return 3;
	}
	if (isPair(cards) || jokerCount > 0) {
		return 2;
	}
	return 1;
}

function strongerHand (handA: string, handB: string): number {
	const strengthDic = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
	if (handA === handB) {
		return 0;
	}
	if (handA[0] !== handB[0]) {
		return strengthDic.indexOf(handA[0]) - strengthDic.indexOf(handB[0]);
	}
	if (handA[1] !== handB[1]) {
		return strengthDic.indexOf(handA[1]) - strengthDic.indexOf(handB[1]);
	}
	if (handA[2] !== handB[2]) {
		return strengthDic.indexOf(handA[2]) - strengthDic.indexOf(handB[2]);
	}
	if (handA[3] !== handB[3]) {
		return strengthDic.indexOf(handA[3]) - strengthDic.indexOf(handB[3]);
	}
	return strengthDic.indexOf(handA[4]) - strengthDic.indexOf(handB[4]);
}

export const solve1 = (_arr: any[]): any => {
	const arr = [..._arr];
	const hands = arr.map(([hand, bid]) => {
		const type = getHandType(hand);
		return [hand, bid, type];
	});
	const sortedHands = hands.sort(([handA, _, typeA], [handB, __, typeB]) => {
		if (typeA === typeB) {
			return strongerHand(handA, handB) * -1;
		}
		return typeB - typeA;
	}); //?

	const finalAnswer = sortedHands.reverse().reduce((acc, [_, bid, __], i) => {
		return acc + ((i + 1) * bid);
	}, 0);

	return finalAnswer;
};

export const solve2 = (_arr: any[]): any => {
	const arr = [..._arr];
	const hands = arr.map(([hand, bid]) => {
		const type = getHandType(hand);
		return [hand, bid, type];
	});
	const sortedHands = hands.sort(([handA, _, typeA], [handB, __, typeB]) => {
		if (typeA === typeB) {
			return strongerHand(handA, handB) * -1;
		}
		return typeB - typeA;
	}); //?

	const finalAnswer = sortedHands.reverse().reduce((acc, [_, bid, __], i) => {
		return acc + ((i + 1) * bid);
	}, 0);

	return finalAnswer;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim().split(' '))
			.map(([a, b]) => ([a, Number(b)]))
	return n;
};

if (globalThis.it) {
	it.skip('Part 1', () => {
		const testResult = solve1(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 6440);

		const result = solve1(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, null);
	});

	it.skip('Part 2', () => {
		const testResult = solve2(processInput(exampleInput));
		testResult; //?
		assert.deepEqual(testResult, 5905);

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