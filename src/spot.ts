export class Spot {
    public filled?: boolean;

    constructor(public value?: number) { }

    public fill() {
        this.filled = true;
    }

    public unfill() {
        this.filled = false;
    }
}
