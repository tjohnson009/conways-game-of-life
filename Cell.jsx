export default class Cell {
    static height = 20;
    static width = 20;  
    static DEAD_COLOR = 'rgb(8,8,8)'; 
    static ALIVE_COLOR = '#F8F8FF'; 

    constructor(context, xPos, yPos) {
        this.status = Math.random() > .45 ? 1 : 0; // 0 = dead, 1 = alive / slightly higher chance of being alive at the start
        this.context = context; 
        this.xPos = xPos; 
        this.yPos = yPos; 
        this.statusNextCycle = null; 
    }
    // ctx.fillStyle = Cell.ALIVE_COLOR; 
    // ctx.fillRect(50, 50, 10, 10); 

    isAlive() {
        return this.status === 1 ? true: false; 
    }

    handleClick() {
        // makes the cell alive during the simulation
        this.status = 1; 
    }

    // getNumOfAliveNeighbors(xPos, yPos) {
    getValidNeighborPositions(xPos, yPos, canvas) {
    // getNumOfAliveNeighbors() {
        // return gameboard[gridToArrayIndex(xPos, yPos)].reduce((totalAliveNeighbors, cell) => {
        // }, 0); 
    let validPositions = []
    // console.log(this.context.canvas.width); 
        for (let y = this.yPos - 1; y <= this.yPos + 1; y++) {
            for (let x = this.xPos - 1; x <= this.xPos +1; x++) {
        // for (let y = this.yPos - 1; y <= this.yPos + 1; y++) {
        //     for (let x = this.xPos - 1; x <= this.xPos +1; x++) {
                if (x < 0 || x >= (canvas.width / Cell.width) || y < 0 || y >= (canvas.height / Cell.height)) {
                // if (x < 0 || x >= (canvasRef.current.width / Cell.width) || y < 0 || y >= (canvasRef.current.height / Cell.height)) {
                    continue; 
                } else if (x === xPos && y === yPos) {
                // } else if (x === this.xPos && y === this.yPos) {
                    continue; 
                }
                // return gameboard[gridToArrayIndex(xPos, yPos)].isAlive()
                validPositions.push([x, y]); 
            }
        }
        // return validPositions.reduce((num, cell) => {
        //     return num + (cell.isAlive() ? 1 : 0)
        // }, 0); 
        // console.log(validNeighbors.length); 
        return validPositions; 
    }
    

    comeAlive() {
        // this.status = 1; 
        this.statusNextCycle = 1; 
    }

    die() {
        // this.status = 0; 
        this.statusNextCycle = 0; 
    }

    drawHexagonCell(context, xCenter, yCenter) {
        const a = 2 * Math.PI / 6;
        const r = Cell.height / 2;

        // context.strokeStyle = this.status === 1 ? Cell.ALIVE_COLOR : Cell.DEAD_COLOR; // react is running twice - so these show the first iterations borders
        context.strokeStyle = Cell.DEAD_COLOR; // 
        context.beginPath(); 
        for(let i = 0; i < 6; i++) { 
            if (i === 0) {
                context.moveTo(xCenter + r * Math.cos(a * i), yCenter + r * Math.sin(a * i)); 
            } else {
                context.lineTo(xCenter + r * Math.cos(a * i), yCenter + r * Math.sin(a * i)); 
            }
        }
        context.closePath(); 
        context.lineWidth = 0; 
        
        context.fillStyle = this.status === 1 ? Cell.ALIVE_COLOR : Cell.DEAD_COLOR; 
        context.fill(); 
        context.stroke();  
        // console.log('Hexagon cell drawn'); 
    }
}