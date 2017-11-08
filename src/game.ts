import { Spot } from "./spot";

interface IGameConfig {
    height: number;
    width: number;
    values: Array<number | undefined>;
}

export class Game {
    public height: number;
    public width: number;
    public spots: Spot[];

    constructor(config: IGameConfig) {
        this.height = config.height;
        this.width = config.width;
        this.spots = [];

        for (let i = 0; i < this.height * this.width; i++) {
            this.spots.push(new Spot(config.values[i]));
        }
    }
}
