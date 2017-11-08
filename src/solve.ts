import { Game } from "./game";

enum steps {
    checkIfFillAll = "checkIfFillAll",
    checkIfUnFillAll = "checkIfUnfillAll",
}

enum checkAllPhases {
    findAssociatedState = 0,
    findValues = 1,
    editGame = 2,
}

const STEPS = [steps.checkIfFillAll, steps.checkIfUnFillAll];

export class Solve {
    public coordinates: number[][];
    public steps: string[];
    public phase: number = 0;
    public desc: string = "";
    public data: { [key: string]: any } = {};
    public row: number;
    public column: number;
    public active: number;
    public related: number[];
    public fill: number[];
    public unfill: number[];

    constructor(public game: Game) {
        this.init(game);
    }

    public init(game: Game) {
        this.coordinates = [];
        for (let row = 0; row < game.height; row++) {
            for (let column = 0; column < game.width; column++) {
                if (game.get(row, column) !== undefined) {
                    this.coordinates.push([row, column]);
                }
            }
        }
        this.steps = STEPS.slice();
    }

    public takeStep() {
        this.desc = "";
        const step = this.steps[0];
        if (step === steps.checkIfFillAll) {
            this.fillAllStep();
        } else if (step === steps.checkIfUnFillAll) {
            this.unfillAllStep();
        }
    }

    public nextStep() {
        this.phase = 0;
        this.data = {};
        delete this.active;
        this.related = [];
        this.fill = [];
        this.unfill = [];
        this.steps.shift();

        if (!this.steps.length) {
            delete this.row;
            delete this.column;
            this.steps = STEPS.slice();
            // just loop for now.
            if (!this.coordinates.length) {
                this.init(this.game);
            }
        }
    }

    public fillCells() {
        this.fill.forEach((index) => {
            this.game.spots[index].filled = true;
        });
    }

    public unfillCells() {
        this.unfill.forEach((index) => {
            this.game.spots[index].filled = false;
        });
    }

    /**********************************************************
     * Fill All
     **********************************************************/

    public fillAllStep() {
        this.desc = "Fill all step: ";
        if (this.phase === checkAllPhases.findAssociatedState) {
            [this.row, this.column] = this.coordinates.shift();
            this.findAssociatedFillState();
        } else if (this.phase === checkAllPhases.findValues) {
            this.checkAllFill();
        } else {
            this.desc += `Filled cells ${this.fill.join(", ")}.`;
            this.fillCells();
            this.nextStep();
        }
    }

    public findAssociatedFillState(checkAllFill: boolean = true) {
        this.data.associatedState = this.game.associatedState(this.row, this.column);
        this.active = this.game.findIndex(this.row, this.column);
        this.related = this.game.getAssociatedIndexes(this.row, this.column).filter(
            (id) => id !== this.active,
        );

        if (checkAllFill && this.data.associatedState.filled === this.game.get(this.row, this.column)) {
            this.desc += `Skipping cell ${this.row}, ${this.column}. ` +
                `Already filled.`;
            this.nextStep();
        } else if (!this.data.associatedState.unknown) {
            this.desc += `Skipping cell ${this.row}, ${this.column}. ` +
                `No Unknown cells.`;
            this.nextStep();
        } else {
            this.desc += `For cell ${this.row}, ${this.column}.` +
                ` There are ${this.data.associatedState.filled} filled cells, ` +
                `${this.data.associatedState.unfilled} unfilled cells, ` +
                `and ${this.data.associatedState.unknown} unknown cells.`;
            this.phase++;
        }
    }

    public checkAllFill() {
        const state = this.data.associatedState;
        const filled = state.filled;
        const totalAvailable = state.unknown + state.filled;
        const value = this.game.get(this.row, this.column);

        if (totalAvailable === value) {
            this.desc += `For cell ${this.row}, ${this.column}. ` +
                `The number of filled + unknown cells(${totalAvailable})` +
                ` equals the value(${value})` +
                `, so we can fill all unknown cells.`;
            this.fill = this.game.getAssociatedUnknownIndexes(this.row, this.column);
            this.phase++;
        } else {
            this.desc += `For cell ${this.row}, ${this.column}. ` +
                `The number of filled + unknown cells(${totalAvailable})` +
                ` is not equal to the value(${value}).`;
            this.nextStep();
        }
    }

    /**********************************************************
     * Unfill All
     **********************************************************/

    public unfillAllStep() {
        this.desc = "Unfill all step: ";
        if (this.phase === checkAllPhases.findAssociatedState) {
            this.findAssociatedFillState(false);
        } else if (this.phase === checkAllPhases.findValues) {
            this.checkAllUnfill();
        } else {
            this.desc += `Unfilled cells ${this.unfill.join(", ")}.`;
            this.unfillCells();
            this.nextStep();
        }
    }

    public checkAllUnfill() {
        const state = this.data.associatedState;
        const filled = state.filled;
        const value = this.game.get(this.row, this.column);

        if (filled === value) {
            this.desc += `For cell ${this.row}, ${this.column}. ` +
                `All cells filled. Unfilling unknown cells.`;
            this.unfill = this.game.getAssociatedUnknownIndexes(this.row, this.column);
            this.phase++;
        } else {
            this.desc += `For cell ${this.row}, ${this.column}. ` +
                `The number of filled cells(${filled})` +
                ` is not equal to the value(${value}).`;
            this.nextStep();
        }
    }
}
