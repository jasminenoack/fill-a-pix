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
});
