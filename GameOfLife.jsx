import { useEffect, useState } from "react";
import Cell from "./Cell";

export default function GameOfLife() {
    // aspect ratio is around 16:10 - 76 cells x 128 cells for 20 x 20 cells - 2342 total cells
    const CANVAS_WIDTH = 1280; 
    const CANVAS_HEIGHT = 760; 
    const [gameboard, setGameboard] = useState([]);
    const [canvasState, setCanvasState] = useState({ canvas:null, context: null }); 
    // const canvas = document.getElementById('canvas'); 
    // const context = canvas.getContext('2d'); 
    
    // // setup and draw the blank canvas 
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        setCanvasState({ canvas: canvas, context: context})
        
        context.fillStyle = 'rgb(8,8,8)';
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // ctx.fillStyle = Cell.ALIVE_COLOR; 
        // ctx.fillRect(50, 50, 10, 10); 

        // let test = new Cell(ctx, 50, 50); 
        // test.drawHexagonCell(ctx, 150, 150); 
        // ctx.fill(); 

        // setGameboard(newGameboard);
        // return ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }, []); // ensure this function only runs once - only draw the canvas once
        
        // initialize cells and the gameboard
        useEffect(() => {
        let numRows = CANVAS_HEIGHT / Cell.height;
        let numCols = CANVAS_WIDTH / Cell.width;
        let nextLifecycle = []; 
            for (let y = 0; y < numRows; y++) {
                for (let x = 0; x < numCols; x++) {
                    nextLifecycle.push(new Cell(canvasState.context, x, y));
                }
            }
            console.log(gameboard); 
            // console.log(canvasState); 
            setGameboard(nextLifecycle); 
        }, [canvasState]); 
        
        
        return (
            <>
        {/* <h1>This is the gameboard. We&apos;re gonna do Canvas for this one...</h1> */}
        <canvas id='canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className=''></canvas>
        </>
    )
}