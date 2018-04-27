const playingField = document.getElementById('playing-field');
const playAgain = document.getElementById('play-again');
const textByWinner = { 'x': 'Выйграл: X', 'o': 'Выйграл: O', '-': 'Ничья'};
const classByWinner = { 'x': 'winner-x', 'o': 'winner-o', '-': 'draw'};
let currentPlayer = 'x';
let canChangePlayer = true;
let winner;
let isGameOver = false;

function getCellValue(row, column) {
    const input = document.getElementById(row + '-' + column);

    return input.value;
}

playAgain.addEventListener('click', () => {
    currentPlayer = 'x';
    isGameOver = false;
    playingField.setAttribute('class', 'current_' + currentPlayer);
    document.getElementById('winner').textContent = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`${i}-${j}`).removeAttribute('value');
        }
    }
});

playingField.addEventListener('click', event => {
    if (!canChangePlayer) {
        return;
    }
    canChangePlayer = false;

    const cell = event.target;
    const hiddenInput = cell.getElementsByTagName('input')[0];

    if (!hiddenInput.value && !isGameOver) {
        hiddenInput.setAttribute('value', currentPlayer);
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        playingField.setAttribute('class', 'current_' + currentPlayer);
        isGameOver = getStatePlay();
        if (isGameOver) {
            let winnerElement = document.getElementById('winner');
            winnerElement.textContent = textByWinner[winner];
            winnerElement.setAttribute('class', classByWinner[winner]);
            playingField.setAttribute('class', 'current_');
        }
    }

    canChangePlayer = true;
});

function getStatePlay() {
    let lines = getLines();

    if (lines.indexOf('xxx') !== -1) {
        winner = 'x';
        return true;
    }

    if (lines.indexOf('ooo') !== -1) {
        winner = 'o';
        return true;
    }

    if (lines.every(line => line.length === 3)) {
        winner = '-';
        return true;
    }

    return false;
}

function getLines() {
    let lines = [];

    for (let i = 0; i < 3; i++) {
        lines.push(getCellValue(i, 0) + getCellValue(i, 1) + getCellValue(i, 2));
        lines.push(getCellValue(0, i) + getCellValue(1, i) + getCellValue(2, i));
    }

    lines.push(getCellValue(0, 0) + getCellValue(1, 1) + getCellValue(2, 2));
    lines.push(getCellValue(0, 2) + getCellValue(1, 1) + getCellValue(2, 0));

    return lines;
}
