import { useEffect, useState } from "react";
import Cell from "./Cell";

export default function GameOfLife() {
    // aspect ratio is around 16:10 - 80 cells x 128 cells for 10 x 10 cells
    const CANVAS_WIDTH = 1280; 
    const CANVAS_HEIGHT = 760; 
    const [gameboard, setGameboard] = useState([]);
    let numRows = CANVAS_HEIGHT / Cell.height;
    let numCols = CANVAS_WIDTH / Cell.width;

    // initialize cells
    useEffect(() => {
        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numCols; x++) {
                gameboard.push(new Cell(this.context, x, y));
            }
        }
    }, [])

    // draw the canvas
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        let newGameboard = []; 
        
        ctx.fillStyle = 'rgb(8,8,8)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // ctx.fillStyle = Cell.ALIVE_COLOR; 
        // ctx.fillRect(50, 50, 10, 10); 
        // let test = new Cell(ctx, 50, 50); 
        // ctx.fillStyle = Cell.ALIVE_COLOR; 
        // test.drawHexagonCell(ctx, 150, 150); 
        // ctx.fill(); 
        return ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }, [gameboard]); 


        
    return (
        <>
        {/* <h1>This is the gameboard. We&apos;re gonna do Canvas for this one...</h1> */}
        <canvas id='canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className=''></canvas>
        </>
    )
}