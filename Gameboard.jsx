import { useEffect } from "react";

export default function Gameboard() {
    // aspect ratio is 16:10 - 50 cells x 80 cells
    const CANVAS_WIDTH = 1280; 
    const CANVAS_HEIGHT = 800; 

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = "rgb(8,8,8)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    })
        
    return (
        <>
        {/* <h1>This is the gameboard. We&apos;re gonna do Canvas for this one...</h1> */}
        <canvas id='canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
        </>
    )
}