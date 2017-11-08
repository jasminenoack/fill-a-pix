import { Game } from "./game";
import * as puzzles from "./puzzles";

const SPOT_DIMENSION = 40;

function drawBoard(wrapper: HTMLElement, currentGame: Game) {
    wrapper.style.width = currentGame.width * SPOT_DIMENSION + "px";
    for (let row = 0; row < currentGame.height; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("clear");
        rowDiv.classList.add("row");
        rowDiv.style.width = currentGame.width * SPOT_DIMENSION + "px";
        for (let column = 0; column < currentGame.width; column++) {
            const square = document.createElement("div");
            square.classList.add("square");
            rowDiv.appendChild(square);

            const value = currentGame.get(row, column);
            square.innerText = value !== undefined ? value + "" : "";
            square.style.width = SPOT_DIMENSION + "px";
            square.style.height = SPOT_DIMENSION + "px";
            square.style.lineHeight = SPOT_DIMENSION - 2 + "px";
        }
        wrapper.appendChild(rowDiv);
    }
}

const puzzle = document.getElementById("puzzle");
const game = new Game(puzzles.ultraEasy1);
const boardWrapper = document.createElement("div");
boardWrapper.classList.add("wrapper");
drawBoard(boardWrapper, game);
puzzle.innerHTML = "";
puzzle.appendChild(boardWrapper);
