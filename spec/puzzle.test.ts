import { Game } from "../src/game";
import { ultraEasy1, veryEasy1, veryEasy2 } from "../src/puzzles";
import { Solve } from "../src/solve";

describe("puzzle solutions", () => {
    function testPuzzle(solution, puzzle) {
        const game = new Game(puzzle);
        const solve = new Solve(game);
        while (!game.done()) {
            solve.takeStep();
        }
        expect(solution).toEqual(game.spots.map((spot) => spot.filled));
    }

    const f = false;
    const t = true;

    it("solves ultra easy 1", () => {
        const solution = [
            f, t, t, f, f,
            t, t, t, f, t,
            f, f, t, t, t,
            f, f, t, t, t,
            f, f, f, t, f,
        ];
        testPuzzle(solution, ultraEasy1);
    });

    it("solves very easy 1", () => {
        const solution = [
            f, f, t, f, f, t, t, t, t, t,
            f, f, f, t, f, f, t, t, t, t,
            f, f, t, f, f, f, f, t, t, t,
            f, f, f, t, f, f, t, f, t, t,
            f, f, t, f, f, t, f, f, f, t,
            f, f, f, f, t, f, f, f, f, f,
            t, t, t, t, t, t, t, t, t, f,
            t, f, f, f, f, f, f, f, t, f,
            f, t, t, t, t, t, t, t, f, f,
            f, f, t, t, t, f, t, f, f, f,
            f, f, f, t, f, t, f, f, f, f,
            f, f, f, f, t, f, f, f, f, f,
            f, f, f, f, t, f, f, f, f, f,
            f, f, f, f, t, f, f, f, f, f,
            f, f, t, t, t, t, t, f, f, f,
        ];
        testPuzzle(solution, veryEasy1);
    });

    it("solves very easy 2", () => {
        const solution = [
            t, t, f, f, f, f, f, f, t, t, t, f, t, f, f, f, f, t, f, t, t, f,
            t, t, t, t, t, t, f, t, t, f, t, f, f, f, f, t, f, t, t, f, f, f,
            f, f, f, f, t, f, f, f, t, t, f, t, t, f, t, f, f, t, f, t, f, t,
            f, t, t, t, f, f, f, f, t, f, f, f, f, t, f, f, t, f, t, f, t, f,
            f, t, t, f, f, t, t, t, f, f, t, t, t, t, f, f, f, f, f, t, t, f,
            t, t, t, t, t, t, t, f, f, f, t, f, t, t, t, t, f, t, f, f, f, t,
            f, f, f, f, t, f, t, f, t, f, t, f, f, f, f, t, t, f,
        ];
        testPuzzle(solution, veryEasy2);
    });
});
