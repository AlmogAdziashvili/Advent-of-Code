
import { readFileSync } from 'fs';

export const puzzleInput = readFileSync(__dirname + '/input.txt', 'utf-8');
export const exampleInput = readFileSync(__dirname + '/input_example.txt', 'utf-8');