
const playingField = document.getElementById('playing-field');
let currentPlayer = 'x';
let canChangePlayer = true;

function getCellValue(row, column) {
    const input = document.getElementById(row + '-' + column);

    return input.value;
}

playingField.addEventListener('click', event => {
    if (!canChangePlayer) {
        return;
    }
    canChangePlayer = false;
    const cell = event.target;
    const hiddenInput = cell.getElementsByTagName('input')[0];
    if (!hiddenInput.value) {
        hiddenInput.setAttribute('value', currentPlayer);
        if (checkOnWinner(hiddenInput.id)) return;
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        playingField.setAttribute('class', 'current_' + currentPlayer);
    }
    canChangePlayer = true;
});


function checkOnWinner(id) {
    let row = Number(id[0]);
    let column = Number(id[2]);
    let rWin = checkRow(row);
    let cWin = checkColumn(column);
    let dWin = checkDiagonals();

    if (rWin || cWin || dWin) {
        let winner = currentPlayer === 'x'?'Победили крестики': 'Победили нолики';
        document.querySelector('.winner__p').innerHTML = winner;
        return true;
    }

    return false;
}

function checkRow(row) {
    for(let i=0; i<2; i++) {
        if(getCellValue(row,i) !== getCellValue(row,i+1)) {
            return false;
        }
    }

    return true;
}

function checkColumn(column) {
    for(let i=0; i<2; i++) {
        if(getCellValue(i, column) !== getCellValue(i+1, column)) {
            return false;
        }
    }

    return true;
}

function checkDiagonals() {
    let mainCounter = 0;
    for(let i=0; i<3; i++) {
        if(getCellValue(i, i) === currentPlayer) {
            mainCounter++;
        }
    }

    let last = 2;
    let secondaryCounter = 0;
    for(let i=0; i<3; i++) {
        if(getCellValue(i, last--) === currentPlayer) {
            secondaryCounter++;
        }
    }

    if(mainCounter === 3 || secondaryCounter === 3) {
        return true;
    }

    return false
}

function newGame() {
    let inputs =  document.querySelectorAll('input[value]');
    let arrayInputs = [].slice.call(inputs);
    arrayInputs.forEach(input => {
        input.removeAttribute('value');
    });
    canChangePlayer = true;
    currentPlayer = 'x';
    playingField.setAttribute('class', 'current_' + currentPlayer);
    document.querySelector('.winner__p').innerHTML = "";
}
