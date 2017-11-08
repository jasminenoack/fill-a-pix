import { Game } from "../src/game";
import { ultraEasy1 } from "../src/puzzles";
import { Spot } from "../src/spot";

describe("game", () => {
    let game;

    beforeEach(() => {
        game = new Game(ultraEasy1);
    });

    it("should have a height", () => {
        expect(game.height).toEqual(5);
    });

    it("should have a width", () => {
        expect(game.width).toEqual(5);
    });

    it("should have a board", () => {
        expect(game.spots).toEqual([
            new Spot(),
            new Spot(5),
            new Spot(4),
            new Spot(),
            new Spot(),

            new Spot(),
            new Spot(),
            new Spot(),
            new Spot(),
            new Spot(3),

            new Spot(),
            new Spot(5),
            new Spot(6),
            new Spot(),
            new Spot(5),

            new Spot(0),
            new Spot(2),
            new Spot(5),
            new Spot(),
            new Spot(5),

            new Spot(),
            new Spot(),
            new Spot(),
            new Spot(),
            new Spot(),
        ]);
    });

    it("should have a get method", () => {
        expect(game.get(0, 0)).toEqual(undefined);
        expect(game.get(0, 1)).toEqual(5);
        expect(game.get(0, 2)).toEqual(4);
        expect(game.get(0, 3)).toEqual(undefined);
        expect(game.get(0, 4)).toEqual(undefined);

        expect(game.get(1, 0)).toEqual(undefined);
        expect(game.get(1, 1)).toEqual(undefined);
        expect(game.get(1, 2)).toEqual(undefined);
        expect(game.get(1, 3)).toEqual(undefined);
        expect(game.get(1, 4)).toEqual(3);

        expect(game.get(2, 0)).toEqual(undefined);
        expect(game.get(2, 1)).toEqual(5);
        expect(game.get(2, 2)).toEqual(6);
        expect(game.get(2, 3)).toEqual(undefined);
        expect(game.get(2, 4)).toEqual(5);

        expect(game.get(3, 0)).toEqual(0);
        expect(game.get(3, 1)).toEqual(2);
        expect(game.get(3, 2)).toEqual(5);
        expect(game.get(3, 3)).toEqual(undefined);
        expect(game.get(3, 4)).toEqual(5);

        expect(game.get(4, 0)).toEqual(undefined);
        expect(game.get(4, 1)).toEqual(undefined);
        expect(game.get(4, 2)).toEqual(undefined);
        expect(game.get(4, 3)).toEqual(undefined);
        expect(game.get(4, 4)).toEqual(undefined);
    });

    describe("associated", () => {
        it("top", () => {
            const spots = game.spots;
            expect(game.associated(0, 2)).toEqual([
                spots[1], spots[2], spots[3],
                spots[6], spots[7], spots[8],
            ]);
        });

        it("bottom", () => {
            const spots = game.spots;
            expect(game.associated(4, 2)).toEqual([
                spots[16], spots[17], spots[18],
                spots[21], spots[22], spots[23],
            ]);
        });

        it("left", () => {
            const spots = game.spots;
            expect(game.associated(2, 0)).toEqual([
                spots[5], spots[6],
                spots[10], spots[11],
                spots[15], spots[16],
            ]);
        });

        it("right", () => {
            const spots = game.spots;
            expect(game.associated(2, 4)).toEqual([
                spots[8], spots[9],
                spots[13], spots[14],
                spots[18], spots[19],
            ]);
        });

        it("top left", () => {
            const spots = game.spots;
            expect(game.associated(0, 0)).toEqual([
                spots[0], spots[1],
                spots[5], spots[6],
            ]);
        });

        it("top right", () => {
            const spots = game.spots;
            expect(game.associated(0, 4)).toEqual([
                spots[3], spots[4],
                spots[8], spots[9],
            ]);
        });

        it("bottom left", () => {
            const spots = game.spots;
            expect(game.associated(4, 0)).toEqual([
                spots[15], spots[16],
                spots[20], spots[21],
            ]);
        });

        it("bottom right", () => {
            const spots = game.spots;
            expect(game.associated(4, 4)).toEqual([
                spots[18], spots[19],
                spots[23], spots[24],
            ]);
        });

        it("middle", () => {
            const spots = game.spots;
            expect(game.associated(2, 2)).toEqual([
                spots[6], spots[7], spots[8],
                spots[11], spots[12], spots[13],
                spots[16], spots[17], spots[18],
            ]);
        });
    });

    describe("current state", () => {
        it("should return the state of a set of spots", () => {
            const spot1 = game.spots[0];
            const spot2 = game.spots[1];
            const spot3 = game.spots[2];
            const spot4 = game.spots[3];
            const spot5 = game.spots[4];
            const spot6 = game.spots[5];
            const spots = [
                spot1, spot2, spot3, spot4, spot5, spot6,
            ];
            expect(game.currentState(spots)).toEqual({
                filled: 0,
                unfilled: 0,
                unknown: 6,
            });

            spot1.filled = true;
            expect(game.currentState(spots)).toEqual({
                filled: 1,
                unfilled: 0,
                unknown: 5,
            });

            spot3.filled = false;
            expect(game.currentState(spots)).toEqual({
                filled: 1,
                unfilled: 1,
                unknown: 4,
            });

            spot2.filled = true;
            expect(game.currentState(spots)).toEqual({
                filled: 2,
                unfilled: 1,
                unknown: 3,
            });
        });
    });

    it("should return the state of associated cells", () => {
        expect(game.associatedState(0, 0)).toEqual({
            filled: 0,
            unfilled: 0,
            unknown: 4,
        });
        game.spots[0].filled = true;
        game.spots[5].filled = true;
        expect(game.associatedState(0, 0)).toEqual({
            filled: 2,
            unfilled: 0,
            unknown: 2,
        });
    });

    describe("associated ids", () => {
        it("top", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(0, 2)).toEqual([
                1, 2, 3, 6, 7, 8,
            ]);
        });

        it("bottom", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(4, 2)).toEqual([
                16, 17, 18, 21, 22, 23,
            ]);
        });

        it("left", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(2, 0)).toEqual([
                5, 6, 10, 11, 15, 16,
            ]);
        });

        it("right", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(2, 4)).toEqual([
                8, 9, 13, 14, 18, 19,
            ]);
        });

        it("top left", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(0, 0)).toEqual([
                0, 1, 5, 6,
            ]);
        });

        it("top right", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(0, 4)).toEqual([
                3, 4, 8, 9,
            ]);
        });

        it("bottom left", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(4, 0)).toEqual([
                15, 16, 20, 21,
            ]);
        });

        it("bottom right", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(4, 4)).toEqual([
                18, 19, 23, 24,
            ]);
        });

        it("middle", () => {
            const spots = game.spots;
            expect(game.getAssociatedIndexes(2, 2)).toEqual([
                6, 7, 8, 11, 12, 13, 16, 17, 18,
            ]);
        });
    });

    it("should return ids of unknown cells", () => {
        const spots = game.spots;
        expect(game.getAssociatedUnknownIndexes(2, 0)).toEqual([
            5, 6, 10, 11, 15, 16,
        ]);
        spots[6].filled = true;
        spots[11].filled = false;
        expect(game.getAssociatedUnknownIndexes(2, 0)).toEqual([
            5, 10, 15, 16,
        ]);
    });

    it("should return all unknown", () => {
        const spots = game.spots;
        expect(game.getUnknown().length).toEqual(25);
        spots[6].filled = true;
        spots[11].filled = false;
        expect(game.getUnknown().length).toEqual(23);
    });
});
