export default class Cell {
    static height = 10;
    static width = 10;  
    static DEAD_COLOR = 'rgb(8,8,8)'; 
    static ALIVE_COLOR = '#F8F8FF'; 

    constructor(context, startX, startY) {
        this.status = 0; // 0 = dead, 1 = alive
        this.context = context; 
        this.startX = startX; 
        this.startX = startX; 
        this.startY = startY; 
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

    comeAlive() {
        this.status = 1; 
    }

    die() {
        this.status = 0; 
    }

    drawHexagonCell(context, centerX, centerY) {
        const a = 2 * Math.PI / 6;
        const r = Cell.height / 2;

        context.beginPath(); 
        for(let i = 0; i < 6; i++) { 
            if (i === 0) {
                context.moveTo(centerX + r * Math.cos(a * i), centerY + r * Math.sin(a * i)); 
            } else {
                context.lineTo(centerX + r * Math.cos(a * i), centerY + r * Math.sin(a * i)); 
            }
        }
        context.closePath(); 
        context.stroke();  
        context.fillStyle = Cell.ALIVE_COLOR; 
        // context.fill(); 
        console.log('Hexagon cell drawn'); 
    }
}