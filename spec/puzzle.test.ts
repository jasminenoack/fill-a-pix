import { Game } from "../src/game";
import { ultraEasy1 } from "../src/puzzles";
import { Solve } from "../src/solve";

describe("puzzle solutions", () => {
    it("solves ultra easy 1", () => {
        const game = new Game(ultraEasy1);
        const solve = new Solve(game);
        const solution = [
            false, true, true, false, false,
            true, true, true, false, true,
            false, false, true, true, true,
            false, false, true, true, true,
            false, false, false, true, false,
        ];
        while (!game.done()) {
            solve.takeStep();
        }
        expect(solution).toEqual(game.spots.map((spot) => spot.filled));
    });
});
