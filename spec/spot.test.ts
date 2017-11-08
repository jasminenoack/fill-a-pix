import { Spot } from "../src/spot";

describe("spot", () => {
    it("has a value", () => {
        let spot = new Spot();
        expect(spot.value).toEqual(undefined);

        spot = new Spot(5);
        expect(spot.value).toEqual(5);
    });
});
