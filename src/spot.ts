export class Spot {
    public filled?: boolean;

    constructor(public value: number, public index: number, public row?: number, public column?: number) { }

    public fill() {
        this.filled = true;
    }

    public unfill() {
        this.filled = false;
    }
}
