class Gridfield {
    constructor(element) {
        this.element = element; 
        this.gameStatus = false; // in play vs. not in play
    }
    numCellgroups = 5; // default size for our game - one side
    totalNumOfCycles = 0;

    startLife() {
        this.gameStatus = true; 
        // assess size of grid
        // randomize which cells are alive are dead
        return console.log('Life is in motion.'); 
    }

    pauseLife() {
        this.gameStatus = false; 
        return console.log('Life is now paused.'); 
    }

    setGridfieldSize(num) {
        this.numCellgroups = num; 
        return console.log('Cell groups: ' + num)
    }

    getNumAliveCells() {
        return 'This many cells'; 
    }

    getTotalNumOfCycles() {
        return this.totalNumOfCycles; 
    }

    clearGridfield() {
        //takes all the content except the container and removes it from the DOM
    }

    resetGridfield() {
        //take the old gridfield away
        // assess size requirements
        // render the new gridfield
        return `Gridfield size updated! Size = ${this.numCellgroups}`; 
    }
}

class CellGroup { // contains 100 cells
    constructor(element) {
        this.element = element; 
    }
}

class Cell { // event listeners on each cell or loop through all the cells to determine the next stage of life?
    constructor(element) {
        this.element = element; 
    }

    status = 0; // 0 is dead, 1 is alive - truthy / falsy

    handleClick() {

    }

    toggleStatus() {
        if (this.status === 1) {
            this.classList.add('.alive'); 
        }
    }

    getNumAliveNeighbors() {
        let num; 
        // determine neighbors
        // check status of neighbors
        // determine number of alive
        return num;
    }

    determineAliveOrDead() {
        if (this.status === 1) {

        } else {

        }

        if (numAliveNeighbors <= 2) {

        }
        return console.log('Am I alive or dead?'); 
    }
}

let gridfield = new Gridfield(document.getElementById('gridfield')); 
