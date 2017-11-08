import { Spot } from "../src/spot";

describe("spot", () => {
    let spot;
    beforeEach(() => {
        spot = new Spot();
    });

    it("has a value", () => {
        expect(spot.value).toEqual(undefined);

        spot = new Spot(5);
        expect(spot.value).toEqual(5);
    });

    it("should initially be in no state", () => {
        expect(spot.filled).toEqual(undefined);
    });

    it("should be able to be filled", () => {
        spot.fill();
        expect(spot.filled).toEqual(true);
    });

    it("should be able to be unfilled", () => {
        spot.unfill();
        expect(spot.filled).toEqual(false);
    });
});
