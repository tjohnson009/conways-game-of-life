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
    }
    // ctx.fillStyle = Cell.ALIVE_COLOR; 
    // ctx.fillRect(50, 50, 10, 10); 

    getStatus() {
        return this.status; 
    }

    handleClick() {
        // makes the cell alive during the simulation
        this.comeAlive(); 
    }

    checkNeighboringCells() {

    }

    comeAlive() {
        this.status = 1; 
    }

    die() {
        this.status = 0; 
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
        context.stroke();  // this might not be necessary... 

        context.fillStyle = this.status === 1 ? Cell.ALIVE_COLOR : Cell.DEAD_COLOR; 
        context.fill(); 
        // console.log('Hexagon cell drawn'); 
    }
}