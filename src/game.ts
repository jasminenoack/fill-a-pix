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

    public findIndex(row: number, column: number) {
        return row * this.width + column;
    }

    public findSpot(row: number, column: number) {
        return this.spots[this.findIndex(row, column)];
    }

    public get(row: number, column: number) {
        return this.findSpot(row, column).value;
    }

    public associated(row: number, column: number) {
        const spots = [];
        if (row > 0 && column > 0) {
            spots.push(this.findSpot(row - 1, column - 1));
        }
        if (row > 0) {
            spots.push(this.findSpot(row - 1, column));
        }
        if (row > 0 && column + 1 < this.width) {
            spots.push(this.findSpot(row - 1, column + 1));
        }

        if (column > 0) {
            spots.push(this.findSpot(row, column - 1));
        }
        spots.push(this.findSpot(row, column));
        if (column + 1 < this.width) {
            spots.push(this.findSpot(row, column + 1));
        }

        if (row + 1 < this.height && column > 0) {
            spots.push(this.findSpot(row + 1, column - 1));
        }
        if (row + 1 < this.height) {
            spots.push(this.findSpot(row + 1, column));
        }
        if (row + 1 < this.height && column + 1 < this.width) {
            spots.push(this.findSpot(row + 1, column + 1));
        }

        return spots;
    }
}
