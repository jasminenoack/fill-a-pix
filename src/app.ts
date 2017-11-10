import { Game } from "./game";
import * as puzzles from "./puzzles";
import { Solve } from "./solve";

const SPOT_DIMENSION = 40;

function drawBoard(wrapper: HTMLElement, currentGame: Game, currentSolve: Solve) {
    wrapper.style.width = currentGame.width * SPOT_DIMENSION + "px";
    const activeIndex = solve.active || (
        solve.row !== undefined && solve.column !== undefined &&
        game.findIndex(solve.row, solve.column)
    );
    const related = solve.related;
    for (let row = 0; row < currentGame.height; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("clear");
        rowDiv.classList.add("row");
        rowDiv.style.width = currentGame.width * SPOT_DIMENSION + "px";
        for (let column = 0; column < currentGame.width; column++) {
            const index = game.findIndex(row, column);
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.lineHeight = SPOT_DIMENSION - 2 + "px";
            if (activeIndex === index) {
                square.classList.add("active");
                square.style.lineHeight = SPOT_DIMENSION - 10 + "px";
            } else if (related && related.indexOf(index) !== -1) {
                square.classList.add("related");
                square.style.lineHeight = SPOT_DIMENSION - 10 + "px";
            }

            const spot = game.findSpot(row, column);
            if (spot.filled === true) {
                square.classList.add("filled");
            } else if (spot.filled === false) {
                square.classList.add("unfilled");
            }
            rowDiv.appendChild(square);

            const value = currentGame.get(row, column);
            square.innerText = value !== undefined ? value + "" : "";
            square.style.width = SPOT_DIMENSION + "px";
            square.style.height = SPOT_DIMENSION + "px";
        }
        wrapper.appendChild(rowDiv);
    }
}

const defaultPuzzle = puzzles.ultraEasy1;
const puzzleName = window.location.search.split("p=")[1].split("&")[0];
const puzzle = document.getElementById("puzzle");
const start = document.getElementById("start");
const step = document.getElementById("step");
const game = new Game(puzzles[puzzleName] || defaultPuzzle);
const solve = new Solve(game);
const boardWrapper = document.createElement("div");
boardWrapper.classList.add("wrapper");
drawBoard(boardWrapper, game, solve);
puzzle.innerHTML = "";
puzzle.appendChild(boardWrapper);

let interval;
start.addEventListener("click", () => {
    function makeStep() {
        solve.takeStep();
        step.innerText = solve.desc;
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        drawBoard(wrapper, game, solve);
        puzzle.innerHTML = "";
        puzzle.appendChild(wrapper);
        if (game.done()) {
            clearInterval(interval);
            console.log(JSON.stringify(game.spots.map((spot) => {
                return spot.filled;
            })));
        }
    }
    if (interval) {
        clearInterval(interval);
        interval = null;
        return;
    } else {
        makeStep();
        interval = setInterval(makeStep, 100);
    }
});
