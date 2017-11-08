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
});
