import { useEffect, useRef } from "react";
import Cell from "./Cell";

export default function GameOfLife() {
    // debugger; 
    // aspect ratio is around 16:10 - 76 cells x 128 cells for 20 x 20 cells - 2342 total cells
    const CANVAS_WIDTH = 1280; 
    const CANVAS_HEIGHT = 760; 
    const speed = 250; // ms
    // let lastTimeframeRef.current = 0; 
    const lastTimeframeRef = useRef(0); 
    // const speed = 1500; // ms for testing
    // const [gameboard, setGameboard] = useState([]);
    const gameboardRef = useRef([]);
    // const [canvasRef.current, setcanvasRef.current] = useState({ canvas: null, context: null, height: CANVAS_HEIGHT, width: CANVAS_WIDTH }); // why are we using state for canvas? I forgot...
    const canvasRef = useRef(null); 
    const contextRef = useRef(null); 
    // const numRows = CANVAS_HEIGHT / Cell.height;
    const numCols = CANVAS_WIDTH / Cell.width;

    
    // // setup and draw the blank canvas 
    useEffect(() => {
        const canvas = canvasRef.current; 
        const context = canvas?.getContext('2d'); 
        contextRef.current = context; 

        if (!canvas || !context) {
            console.log(context ? canvas : context); 
        } else {
            console.log(context, canvas); 
        }

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
        const context = contextRef.current;  
        if (!context) {
            console.error('Context failed!'); 
            return
        } else {
            console.log('Successful initialization'); 
        }; 
            for (let y = 0; y < numRows; y++) {
                for (let x = 0; x < numCols; x++) {
                    initialGameboard.push(new Cell(context, x, y));
                }
            }
            // debugger;  
            // console.log(gameboard); // []
            // console.log(canvasRef.current); 
            console.log('initial gameboard', initialGameboard); 
            // setGameboard(initialGameboard); 
            gameboardRef.current = initialGameboard;
            // console.log(gameboard.length === 0 ? 'Gameboard initialization failed.' : 'Successfully initialized successful.'); 
            // console.log(gameboard); 
        // }, [canvasRef.current]); // this was causing a rerender issue
        }, []); 

        // console.log(gameboard); 

    function drawAllCells() { 
            // clearCanvas(); 
            let xPoint = 10;
            let yPoint = 10; 
            let CELL_SIZE_STEP = 20; // 20 x 20
            // const context = canvasRef.current.getContext('2d'); 
            const context = contextRef.current; 
            // console.log('Drawing cells. Gameboard length:', gameboard.length); // 0
            // if (!context) {
            //      console.error('Context is null during drawAllCells.');
            //         return;
            //     } else {
            //         // console.log('No error found ind drawing cells'); 
            //     }
            // console.log('before drawing', gameboard); // []
            gameboardRef.current.forEach((cell, index) => {
                // let xStep = 
                // let yStep = 20; 
                // modulo 128 step up y, set x to 0
                if ((index + 1) % 64 === 0) { // then we are at the last cell on the right side of the grid
                    cell.drawHexagonCell(context, xPoint, yPoint);
                    // debugger; 
                    yPoint += CELL_SIZE_STEP;
                    xPoint = 10; 
                } else {
                    cell.drawHexagonCell(context, xPoint, yPoint);
                    xPoint += CELL_SIZE_STEP; 
                }
            }); 
        }

    function clearCanvas() {
        const context = contextRef.current;
        if (context) {
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears everything on the canvas
            context.fillStyle = 'rgb(8,8,8)'; // Resets the background color
            context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }

        function gridToArrayIndex(x, y) { // quick access for the gameboard array - write your code to get the positions again
            return x + (y * numCols);
        }

        // function getCell(x, y) {
        //     return gameboard.filter((cell) => {
        //         return x === cell.xPos && y === cell.yPos; 
        //     })
        // }
        
       function lifecycleLoop(timestamp) {
        // debugger; 
        if (!lastTimeframeRef.current) {
            lastTimeframeRef.current = timestamp; 
        }

        const elapsedTime = Math.floor(timestamp - lastTimeframeRef.current); 
        
        if (elapsedTime >= speed) {
            lastTimeframeRef.current = timestamp; 
        // }
            // console.log(gameboard, contextRef, canvasRef); 

       let updatedGameboard = gameboardRef.current.map(cell => {
                    let neighborPositions = cell.getValidNeighborPositions(cell.xPos, cell.yPos, canvasRef.current); 
                    // console.log(neighborPositions); 
                    // how many alive neighbors do you have?
                    let numAliveNeighbors = neighborPositions.reduce((num, position) => {
                        let index = gridToArrayIndex(position[0], position[1]); 
                            return num + (gameboardRef.current[index].isAlive() ? 1 : 0); 
                    }, 0); 

                    // let newCell = new Cell(contextRef.current, cell.xPos, cell.yPos); 
                        // console.log(numAliveNeighbors); 
                        if (numAliveNeighbors === 2) {
                            // Do nothing, don't change state
                            // newCell.status = cell.status; 
                        } else if (numAliveNeighbors === 3) {
                            // Make alive
                            cell.comeAlive();
                            // newCell.comeAlive();
                            // newCell.status = 1; 
                        } else {
                            // Make dead
                            cell.die(); 
                            // newCell.die(); 
                            // newCell.status = 0; 
                        }

                        return cell; 
                        // return newCell; 
                }); 
                // console.log(updatedGameboard); 
        // update the next gameboard
                updatedGameboard.forEach(cell => {
                    cell.status = cell.statusNextCycle; 
                }); 

        // // update the state
        // setGameboard(updatedGameboard); // [] ?
        gameboardRef.current = updatedGameboard; 

        // clear the canvas then redraw the background color
            // contextRef.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            // contextRef.current.fillStyle = 'rgb(8,8,8)';
            // contextRef.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            

        // draw the new cells in
        // debugger; 
        drawAllCells(); 
    }
    
        // drawAllCells(); 
            window.requestAnimationFrame(lifecycleLoop); 
            // window.requestAnimationFrame(() => lifecycleLoop());
        }
            

            window.requestAnimationFrame(() => lifecycleLoop());

        return (
            <>
        <canvas id='canvas' ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className=''></canvas>
        </>
    )
}