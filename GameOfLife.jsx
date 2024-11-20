import { useEffect, useState } from "react";
import Cell from "./Cell";

export default function GameOfLife() {
    // aspect ratio is around 16:10 - 76 cells x 128 cells for 20 x 20 cells - 2342 total cells
    const CANVAS_WIDTH = 1280; 
    const CANVAS_HEIGHT = 760; 
    const speed = 450; // ms
    // const speed = 1500; // ms for testing
    const [gameboard, setGameboard] = useState([]);
    const [canvasState, setCanvasState] = useState({ canvas: null, context: null, height: CANVAS_HEIGHT, width: CANVAS_WIDTH }); // why are we using state for canvas? I forgot...
    const numRows = CANVAS_HEIGHT / Cell.height;
    const numCols = CANVAS_WIDTH / Cell.width;
    // const canvas = document.getElementById('canvas'); 
    // const context = canvas.getContext('2d'); 
    
    // // setup and draw the blank canvas 
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        setCanvasState({ canvas: canvas, context: context})
        
        // context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
        let initialGameboard = []; 
            for (let y = 0; y < numRows; y++) {
                for (let x = 0; x < numCols; x++) {
                    initialGameboard.push(new Cell(canvasState.context, x, y));
                }
            }
            // console.log(gameboard); // []
            // console.log(canvasState); 
            setGameboard(initialGameboard); 
        // }, [canvasState]); // this was causing a rerender issue
        }, []); 

    function drawAllCells() { 
            let xPoint = 10;
            let yPoint = 10; 
            let step = 20; 
            gameboard.forEach((cell, index) => {
                // let xStep = 
                // let yStep = 20; 
                // modulo 128 step up y, set x to 0
                if ((index + 1) % 64 === 0) { // then we are at the last cell on the right side of the grid
                    cell.drawHexagonCell(canvasState.context, xPoint, yPoint);
                    // debugger; 
                    yPoint += step;
                    xPoint = 10; 
                } else {
                    cell.drawHexagonCell(canvasState.context, xPoint, yPoint);
                    xPoint += step; 
                }
            }); 
        }

        function gridToArrayIndex(x, y) { // quick access for the gameboard array - write your code to get the positions again
            return x + (y * numCols);
        }

        // function getCell(x, y) {
        //     return gameboard.filter((cell) => {
        //         return x === cell.xPos && y === cell.yPos; 
        //     })
        // }
        
       function lifecycleLoop() {
        // let nextLifeCycle = []; 
        // if (!canvasState.context) {return}

        // assess which cells will be alive next round - update state
            // determine which cells are alive and dead
        let updatedGameboard = gameboard.map(cell => cell); 
        updatedGameboard.forEach(cell => {
                    let neighborPositions = cell.getValidNeighborPositions(cell.xPos, cell.yPos); 
                    // console.log(neighborPositions); 
                    // how many alive neighbors do you have?
                    let numAliveNeighbors = neighborPositions.reduce((num, position) => {
                        let index = gridToArrayIndex(position[0], position[1]); 
                            return num + (updatedGameboard[index].isAlive() ? 1 : 0); 
                    }, 0); 
                    // does the cell live or die
                        // console.log(numAliveNeighbors); 
                        if (numAliveNeighbors === 2) {
                            // Do nothing, don't change state
                        } else if (numAliveNeighbors === 3){
                            // Make alive
                            cell.comeAlive();
                        } else {
                            // Make dead
                            cell.die(); 
                        }
                }); 

        // update the next gameboard
                updatedGameboard.forEach(cell => {
                    cell.status = cell.statusNextCycle; 
                }); 

        // // update the state
        setGameboard(updatedGameboard); 


        // clear the canvas then redraw the background color
            // canvasState.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            canvasState.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            canvasState.context.fillStyle = 'rgb(8,8,8)';
            canvasState.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // draw the new cells in
            drawAllCells(); 

            // loop this whole process on a timer
        //     setTimeout(() => {
        //        window.requestAnimationFrame(() => lifecycleLoop());
        //    }, speed) 
        }

        // initial state of the game ?? 
        //  window.requestAnimationFrame(() => lifecycleLoop()); 
        setTimeout(() => {
            window.requestAnimationFrame(() => lifecycleLoop());
        }, speed); 

        return (
            <>
        {/* <h1>This is the gameboard. We&apos;re gonna do Canvas for this one...</h1> */}
        <canvas id='canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className=''></canvas>
        </>
    )
}