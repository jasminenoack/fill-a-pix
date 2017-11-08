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

    public getAssociatedIndexes(row: number, column: number) {
        const ids = [];
        if (row > 0 && column > 0) {
            ids.push(this.findIndex(row - 1, column - 1));
        }
        if (row > 0) {
            ids.push(this.findIndex(row - 1, column));
        }
        if (row > 0 && column + 1 < this.width) {
            ids.push(this.findIndex(row - 1, column + 1));
        }

        if (column > 0) {
            ids.push(this.findIndex(row, column - 1));
        }
        ids.push(this.findIndex(row, column));
        if (column + 1 < this.width) {
            ids.push(this.findIndex(row, column + 1));
        }

        if (row + 1 < this.height && column > 0) {
            ids.push(this.findIndex(row + 1, column - 1));
        }
        if (row + 1 < this.height) {
            ids.push(this.findIndex(row + 1, column));
        }
        if (row + 1 < this.height && column + 1 < this.width) {
            ids.push(this.findIndex(row + 1, column + 1));
        }

        return ids;
    }

    public getAssociatedUnknownIndexes(row: number, column: number) {
        return this.getAssociatedIndexes(row, column).filter((index) => {
            return this.spots[index].filled === undefined;
        });
    }

    public associated(row: number, column: number) {
        const ids = this.getAssociatedIndexes(row, column);
        return ids.map((id) => {
            return this.spots[id];
        });
    }

    public currentState(spots: Spot[]) {
        const result = {
            filled: 0,
            unfilled: 0,
            unknown: 0,
        };
        spots.forEach((spot) => {
            if (spot.filled === true) {
                result.filled++;
            } else if (spot.filled === false) {
                result.unfilled++;
            } else {
                result.unknown++;
            }
        });
        return result;
    }

    public associatedState(row: number, column: number) {
        return this.currentState(this.associated(row, column));
    }
}
