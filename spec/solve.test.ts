import { Game } from "../src/game";
import { ultraEasy1 } from "../src/puzzles";
import { Solve } from "../src/solve";

describe("solve", () => {
    let solve;
    let game;
    beforeEach(() => {
        game = new Game(ultraEasy1);
        solve = new Solve(game);
    });

    it("should create list of steps", () => {
        expect(solve.coordinates).toEqual([
            [0, 1], [0, 2],
            [1, 4],
            [2, 1], [2, 2], [2, 4],
            [3, 0], [3, 1], [3, 2], [3, 4],
        ]);
        expect(solve.steps).toEqual(
            ["checkIfFillAll", "checkIfUnfillAll"],
        );
        expect(solve.phase).toEqual(0);
        expect(solve.desc).toEqual("");
    });

    describe("fill all", () => {
        it("should take find associated state and describe it", () => {
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Fill all step: For cell 0, 1. There are 0 filled cells, 0 unfilled cells, and 6 unknown cells.",
            );
            expect(solve.active).toEqual(1);
            expect(solve.related).toEqual([0, 2, 5, 6, 7]);
            expect(solve.phase).toEqual(1);
        });

        it("should find no cells to fill", () => {
            solve.takeStep();
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Fill all step: For cell 0, 1. The number of filled + unknown cells(6) is not equal to the value(5).",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.data).toEqual({});
        });

        it("should find cells to fill", () => {
            game.spots[0].filled = false;
            solve.takeStep();
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Fill all step: For cell 0, 1. The number of filled + unknown cells(5) equals" +
                " the value(5), so we can fill all unknown cells.",
            );
            expect(solve.active).toEqual(1);
            expect(solve.related).toEqual([0, 2, 5, 6, 7]);
            expect(solve.phase).toEqual(2);
            expect(solve.fill).toEqual([1, 2, 5, 6, 7]);
        });

        it("should handle if all are already filled", () => {
            game.spots[0].filled = true;
            game.spots[1].filled = true;
            game.spots[2].filled = true;
            game.spots[5].filled = true;
            game.spots[6].filled = true;
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Fill all step: Skipping cell 0, 1. Already filled.",
            );
            expect(solve.phase).toEqual(0);
        });

        it("should fill cells", () => {
            game.spots[0].filled = false;
            solve.takeStep();
            solve.takeStep();
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Fill all step: Filled cells 1, 2, 5, 6, 7.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.fill).toEqual([]);
            expect(game.spots[1].filled).toBeTruthy();
            expect(game.spots[2].filled).toBeTruthy();
            expect(game.spots[5].filled).toBeTruthy();
            expect(game.spots[6].filled).toBeTruthy();
            expect(game.spots[7].filled).toBeTruthy();
            expect(game.spots[0].filled).toBeFalsy();
        });
    });

    describe("unfill all", () => {
        it("should take find associated state and describe it", () => {
            solve.steps = ["checkIfUnfillAll"];
            solve.row = 0;
            solve.column = 1;
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Unfill all step: For cell 0, 1. There are 0 filled cells, 0 unfilled cells, and 6 unknown cells.",
            );
            expect(solve.active).toEqual(1);
            expect(solve.related).toEqual([0, 2, 5, 6, 7]);
            expect(solve.phase).toEqual(1);
        });

        it("should move on if there are no unknown cells", () => {
            game.spots[0].filled = true;
            game.spots[1].filled = true;
            game.spots[2].filled = true;
            game.spots[5].filled = true;
            game.spots[6].filled = true;
            game.spots[7].filled = false;
            solve.steps = ["checkIfUnfillAll"];
            solve.row = 0;
            solve.column = 1;
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Unfill all step: Skipping cell 0, 1. No Unknown cells.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.data).toEqual({});
        });

        it("should find cells to unfill", () => {
            game.spots[0].filled = true;
            game.spots[1].filled = true;
            game.spots[2].filled = true;
            game.spots[5].filled = true;
            game.spots[6].filled = true;
            solve.steps = ["checkIfUnfillAll"];
            solve.row = 0;
            solve.column = 1;
            solve.takeStep();
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Unfill all step: For cell 0, 1. All cells filled. " +
                "Unfilling unknown cells.",
            );
            expect(solve.active).toEqual(1);
            expect(solve.related).toEqual([0, 2, 5, 6, 7]);
            expect(solve.phase).toEqual(2);
            expect(solve.unfill).toEqual([7]);
        });

        it("should move on if not right number of filled cells", () => {
            game.spots[0].filled = true;
            game.spots[1].filled = true;
            solve.steps = ["checkIfUnfillAll"];
            solve.row = 0;
            solve.column = 1;
            solve.takeStep();
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Unfill all step: For cell 0, 1. The number of filled cells(2) is not equal to the value(5).",
            );
            expect(solve.phase).toEqual(0);
        });

        it("should unfill cells", () => {
            game.spots[0].filled = true;
            game.spots[1].filled = true;
            game.spots[2].filled = true;
            game.spots[5].filled = true;
            game.spots[6].filled = true;
            solve.steps = ["checkIfUnfillAll"];
            solve.row = 0;
            solve.column = 1;
            solve.takeStep();
            solve.takeStep();
            solve.takeStep();
            expect(solve.desc).toEqual(
                "Unfill all step: Unfilled cells 7.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.unfill).toEqual([]);
            expect(game.spots[1].filled).toBeTruthy();
            expect(game.spots[2].filled).toBeTruthy();
            expect(game.spots[5].filled).toBeTruthy();
            expect(game.spots[6].filled).toBeTruthy();
            expect(game.spots[0].filled).toBeTruthy();
            expect(game.spots[7].filled).toBeFalsy();
        });
    });

    it("should move to next step", () => {
        solve.takeStep();
        solve.takeStep();
        expect(solve.phase).toEqual(0);
        expect(solve.steps).toEqual(["checkIfUnfillAll"]);
        expect(solve.row).toEqual(0);
        expect(solve.column).toEqual(1);
        solve.takeStep();
        expect(solve.row).toEqual(0);
        expect(solve.column).toEqual(1);
        solve.takeStep();
        expect(solve.phase).toEqual(0);
        expect(solve.steps).toEqual(["checkIfFillAll", "checkIfUnfillAll"]);
        expect(solve.row).toEqual(undefined);
        expect(solve.column).toEqual(undefined);
    });
});
