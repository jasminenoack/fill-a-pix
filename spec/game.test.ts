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
});
