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
            const coors = this.findCoors(i);
            this.spots.push(new Spot(config.values[i], i, coors[0], coors[1]));
        }
    }

    public findIndex(row: number, column: number) {
        return row * this.width + column;
    }

    public findCoors(index: number) {
        return [Math.floor(index / this.width), index % this.width];
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
        const indexes = this.getAssociatedIndexes(row, column);
        return this.spotsByIndex(indexes);
    }

    public spotsByIndex(indexes) {
        return indexes.map((id) => {
            return this.spots[id];
        });
    }

    public numberedSpotsByIndex(indexes) {
        return this.spotsByIndex(indexes).filter((spot) => spot.value !== undefined);
    }

    public neighborIndexes(row: number, column: number) {
        const currentIndex = this.findIndex(row, column);
        const indexes = this.getAssociatedIndexes(row, column);
        return indexes.filter((index) => index !== currentIndex);
    }

    public neighbors(row: number, column: number) {
        const indexes = this.neighborIndexes(row, column);
        return this.numberedSpotsByIndex(indexes);
    }

    public farNeighborIndexes(row: number, column: number) {
        const result = [];
        const currentIndex = this.findIndex(row, column);
        const neighbors = this.neighborIndexes(row, column);
        neighbors.forEach((neighbor) => {
            const coors = this.findCoors(neighbor);
            const newNeighbors = this.neighborIndexes(coors[0], coors[1]);
            newNeighbors.forEach((option) => {
                if (
                    option !== currentIndex &&
                    neighbors.indexOf(option) === -1 &&
                    result.indexOf(option) === -1
                ) {
                    result.push(option);
                }
            });
        });
        return result.sort((a, b) => a > b ? 1 : -1);
    }

    public farNeighbors(row: number, column: number) {
        const indexes = this.farNeighborIndexes(row, column);
        return this.numberedSpotsByIndex(indexes);
    }

    public shared(coors1, coors2) {
        const indexes1 = this.getAssociatedIndexes(coors1[0], coors1[1]);
        const indexes2 = this.getAssociatedIndexes(coors2[0], coors2[1]);
        const indexes = indexes1.filter((index) => indexes2.indexOf(index) !== -1);
        return this.spotsByIndex(indexes);
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

    public getUnknown() {
        return this.spots.filter((spot) => {
            return spot.filled === undefined;
        });
    }

    public done() {
        return !this.getUnknown().length;
    }
}
