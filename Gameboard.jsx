import { useEffect } from "react";
import Cell from "./Cell";

export default function Gameboard() {
    // aspect ratio is 16:10 - 80 cells x 128 cells for 10 x 10 cells
    const CANVAS_WIDTH = 1280; 
    const CANVAS_HEIGHT = 800; 

    // draw the canvas
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = 'rgb(8,8,8)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // ctx.fillStyle = Cell.ALIVE_COLOR; 
        // ctx.fillRect(50, 50, 10, 10); 
        let test = new Cell(ctx, 50, 50); 
        // ctx.fillStyle = Cell.ALIVE_COLOR; 
        test.drawHexagonCell(ctx, 150, 150); 
        // ctx.fill(); 
    })

    //fill the canvas with cells
        
    return (
        <>
        {/* <h1>This is the gameboard. We&apos;re gonna do Canvas for this one...</h1> */}
        <canvas id='canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className=''></canvas>
        </>
    )
}