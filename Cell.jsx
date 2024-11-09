export default class Cell {
    constructor() {
        this.status = 0; // 0 = dead, 1 = alive
        this.height = 10;
        this.width = this.height;  
    }

    handleClick() {
        // makes the cell alive during the simulation
    }

    comeAlive() {
        this.status = 1; 
    }

    die() {
        this.status = 0; 
    }
}