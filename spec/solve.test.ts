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
            ["checkIfFillAll", "checkIfUnfillAll", "leftOver"],
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
            expect(solve.active).toEqual(1);
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
            expect(solve.active).toEqual(1);
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
        expect(solve.steps).toEqual(["checkIfUnfillAll", "leftOver"]);
        expect(solve.row).toEqual(0);
        expect(solve.column).toEqual(1);
        expect(solve.active).toEqual(1);
        solve.takeStep();
        expect(solve.row).toEqual(0);
        expect(solve.column).toEqual(1);
        expect(solve.active).toEqual(1);
        solve.takeStep();
        expect(solve.phase).toEqual(0);
        expect(solve.steps).toEqual(["leftOver"]);
        solve.takeStep();
        expect(solve.row).toEqual(0);
        expect(solve.column).toEqual(1);
        expect(solve.active).toEqual(1);
        solve.takeStep();
        expect(solve.steps).toEqual(["checkIfFillAll", "checkIfUnfillAll", "leftOver"]);
        expect(solve.row).toEqual(undefined);
        expect(solve.column).toEqual(undefined);
        expect(solve.active).toEqual(undefined);
    });

    describe("left over", () => {
        it("should fill in other if necessary", () => {
            solve.steps = ["leftOver"];
            solve.row = 2;
            solve.column = 1;
            solve.takeStep();
            const spots = game.spots;
            expect(solve.neighbors).toEqual([
                spots[12], spots[15], spots[16], spots[17],
            ]);
            expect(solve.farNeighbors).toEqual([
                spots[1], spots[2],
            ]);
            expect(solve.related).toEqual([1, 2, 12, 15, 16, 17]);
            expect(solve.active).toEqual(11);

            expect(solve.desc).toEqual(
                `Left over: For cell 2, 1.`
                + ` Neighbors are 12, 15, 16, 17.`
                + ` Far neighbors are 1, 2.`
                + ` Attempting to find overlaps that indicate places that can be filled in.`,
            );
            expect(solve.phase).toEqual(1);

            solve.takeStep();
            expect(solve.fill).toEqual([5, 6, 7, 12, 17]);
            expect(solve.related).toEqual([1, 2, 12, 15, 16, 17]);
            expect(solve.active).toEqual(11);

            expect(solve.desc).toEqual(
                "Left over: For cell 2, 1."
                + " Found meaningful overlap with 3, 0"
                + "(unshared: 5, 6, 7, 12, 17). "
                + "Found meaningful overlap with 3, 1(unshared: 5, 6, 7). "
                + "We can fill the unfilled & unshared cells.",
            );
            expect(solve.phase).toEqual(2);

            solve.takeStep();
            expect(solve.desc).toEqual(
                "Left over: Filled cells 5, 6, 7, 12, 17.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.fill).toEqual([]);
            expect(game.spots[5].filled).toBeTruthy();
            expect(game.spots[6].filled).toBeTruthy();
            expect(game.spots[7].filled).toBeTruthy();
            expect(game.spots[12].filled).toBeTruthy();
            expect(game.spots[17].filled).toBeTruthy();
        });

        it("should fill in other if necessary with fills", () => {
            solve.steps = ["leftOver"];
            solve.row = 2;
            solve.column = 1;
            solve.takeStep();
            const spots = game.spots;
            spots[5].filled = true;
            spots[16].filled = true;
            spots[10].filled = false;
            expect(solve.neighbors).toEqual([
                spots[12], spots[15], spots[16], spots[17],
            ]);
            expect(solve.farNeighbors).toEqual([
                spots[1], spots[2],
            ]);
            expect(solve.related).toEqual([1, 2, 12, 15, 16, 17]);
            expect(solve.active).toEqual(11);

            expect(solve.desc).toEqual(
                `Left over: For cell 2, 1.`
                + ` Neighbors are 12, 15, 16, 17.`
                + ` Far neighbors are 1, 2.`
                + ` Attempting to find overlaps that indicate places that can be filled in.`,
            );
            expect(solve.phase).toEqual(1);

            solve.takeStep();
            expect(solve.fill).toEqual([6, 7, 12, 17]);
            expect(solve.related).toEqual([1, 2, 12, 15, 16, 17]);
            expect(solve.active).toEqual(11);

            expect(solve.desc).toEqual(
                "Left over: For cell 2, 1."
                + " Found meaningful overlap with 3, 0"
                + "(unshared: 6, 7, 12, 17). "
                + "Found meaningful overlap with 3, 1(unshared: 6, 7). "
                + "We can fill the unfilled & unshared cells.",
            );
            expect(solve.phase).toEqual(2);

            solve.takeStep();
            expect(solve.desc).toEqual(
                "Left over: Filled cells 6, 7, 12, 17.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.fill).toEqual([]);
            expect(game.spots[5].filled).toBeTruthy();
            expect(game.spots[6].filled).toBeTruthy();
            expect(game.spots[7].filled).toBeTruthy();
        });

        it("should not fill in other if necessary", () => {
            solve.steps = ["leftOver"];
            solve.row = 2;
            solve.column = 2;
            solve.takeStep();
            const spots = game.spots;
            expect(solve.neighbors).toEqual([
                spots[11], spots[16], spots[17],
            ]);
            expect(solve.farNeighbors).toEqual([
                spots[1], spots[2], spots[9], spots[14], spots[15], spots[19],
            ]);
            expect(solve.related).toEqual([1, 2, 9, 11, 14, 15, 16, 17, 19]);
            expect(solve.active).toEqual(12);

            expect(solve.desc).toEqual(
                `Left over: For cell 2, 2.`
                + ` Neighbors are 11, 16, 17.`
                + ` Far neighbors are 1, 2, 9, 14, 15, 19.`
                + ` Attempting to find overlaps that indicate places that can be filled in.`,
            );
            expect(solve.phase).toEqual(1);

            solve.takeStep();
            expect(solve.desc).toEqual(
                "Left over: For cell 2, 2."
                + " Found no meaningful overlap.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.fill).toEqual([]);
        });

        it("should handle with outer fill ins", () => {
            solve.steps = ["leftOver"];
            solve.row = 0;
            solve.column = 1;
            solve.takeStep();
            const spots = game.spots;
            spots[8].filled = true;
            expect(solve.neighbors).toEqual([
                spots[2],
            ]);
            expect(solve.farNeighbors).toEqual([
                spots[11], spots[12],
            ]);
            expect(solve.related).toEqual([2, 11, 12]);
            expect(solve.active).toEqual(1);

            expect(solve.desc).toEqual(
                `Left over: For cell 0, 1.`
                + ` Neighbors are 2. Far neighbors are 11, 12.`
                + ` Attempting to find overlaps that indicate places `
                + `that can be filled in.`,
            );

            expect(solve.phase).toEqual(1);

            solve.takeStep();
            expect(solve.fill).toEqual([0, 5]);
            expect(solve.related).toEqual([2, 11, 12]);
            expect(solve.active).toEqual(1);

            expect(solve.desc).toEqual(
                "Left over: For cell 0, 1. "
                + "Found meaningful overlap with 0, 2(unshared: 0, 5). "
                + "We can fill the unfilled & unshared cells.",
            );
            expect(solve.phase).toEqual(2);

            solve.takeStep();
            expect(solve.desc).toEqual(
                "Left over: Filled cells 0, 5.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.fill).toEqual([]);
            expect(game.spots[5].filled).toBeTruthy();
            expect(game.spots[0].filled).toBeTruthy();
        });

        it("should handle far neighbor overlap", () => {
            solve.steps = ["leftOver"];
            solve.row = 2;
            solve.column = 2;
            const spots = game.spots;
            spots[22].filled = true;
            solve.takeStep();
            expect(solve.neighbors).toEqual([
                spots[11],
                spots[16], spots[17],
            ]);
            expect(solve.farNeighbors).toEqual([
                spots[1], spots[2],
                spots[9],
                spots[14],
                spots[15], spots[19],
            ]);
            expect(solve.related).toEqual([1, 2, 9, 11, 14, 15, 16, 17, 19]);
            expect(solve.active).toEqual(12);

            expect(solve.desc).toEqual(
                "Left over: For cell 2, 2."
                + " Neighbors are 11, 16, 17. "
                + "Far neighbors are 1, 2, 9, 14, 15, 19. "
                + "Attempting to find overlaps that indicate places "
                + "that can be filled in.",
            );

            expect(solve.phase).toEqual(1);

            solve.takeStep();
            expect(solve.fill).toEqual([6, 7, 8, 13, 18]);
            expect(solve.related).toEqual([1, 2, 9, 11, 14, 15, 16, 17, 19]);
            expect(solve.active).toEqual(12);

            expect(solve.desc).toEqual(
                "Left over: For cell 2, 2. "
                + "Found meaningful overlap with 3, 1(unshared: 6, 7, 8, 13, 18). "
                + "We can fill the unfilled & unshared cells.",
            );
            expect(solve.phase).toEqual(2);

            solve.takeStep();
            expect(solve.desc).toEqual(
                "Left over: Filled cells 6, 7, 8, 13, 18.",
            );
            expect(solve.active).toEqual(undefined);
            expect(solve.related).toEqual([]);
            expect(solve.phase).toEqual(0);
            expect(solve.fill).toEqual([]);
            expect(game.spots[6].filled).toBeTruthy();
            expect(game.spots[7].filled).toBeTruthy();
            expect(game.spots[8].filled).toBeTruthy();
            expect(game.spots[13].filled).toBeTruthy();
            expect(game.spots[18].filled).toBeTruthy();
        });
    });
});

// what about the rest need to be removed.
