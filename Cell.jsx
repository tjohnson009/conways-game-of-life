export default class Cell {
    static height = 10;
    static width = 10;  
    static DEAD_COLOR = 'rgb(8,8,8)'; 
    static ALIVE_COLOR = '#F8F8FF'; 

    constructor() {
        this.status = 0; // 0 = dead, 1 = alive
    }

    handleClick() {
        // makes the cell alive during the simulation
        this.comeAlive(); 
    }

    comeAlive() {
        this.status = 1; 
    }

    die() {
        this.status = 0; 
    }
}