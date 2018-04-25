// Реализуй логику выбора победителя в этом файле
const playingField = document.getElementById('playing-field');
let currentPlayer = 'x';
let canChangePlayer = true;
let strokeNumber = 1;

function getCellValue(row, column) {
    const input = document.getElementById(row + '-' + column);

    return input.value;
}

function checkWin(row, column) {
    if (checkRow(row) || checkColumn(column)) {
        return true;
    }
    if ((row == column) && checkDescendingDiagonal()) {
        return true;
    }
    if ((row == 2 - column) && checkUpwardDiagonal()) {
        return true;
    }
    return false;
}

function checkRow(row) {
    for(var i = 0; i < 3; i++) {
        if (getCellValue(row, i) !== currentPlayer) {
            return false;
        }
    }
    return true;
}

function checkColumn(column) {
    for(var i = 0; i < 3; i++) {
        if (getCellValue(i, column) !== currentPlayer) {
            return false;
        }
    }
    return true;
}

function checkDescendingDiagonal() {
    for(var i = 0; i < 3; i++) {
        if (getCellValue(i, i) !== currentPlayer) {
            return false;
        }
    }
    return true;
}

function checkUpwardDiagonal() {
    for(var i = 0; i < 3; i++) {
        if (getCellValue(2 - i, i) !== currentPlayer) {
            return false;
        }
    }
    return true;
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
        if (strokeNumber >= 5) {
            let id = hiddenInput.getAttribute('id').split('-');
            if (checkWin(id[0], id[1])) {
                let winPlayer = currentPlayer === 'x' ? 'первый игрок! (крестики)' : 'второй игрок! (нолики)';
                alert('Победил ' + winPlayer);
                return;
            }
        }
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        playingField.setAttribute('class', 'current_' + currentPlayer);
        strokeNumber++;
    }

    if (strokeNumber == 10) {
        alert("Ничья! Победила дружба!");
    }
    canChangePlayer = true;
});

function restartGame() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            document.getElementById(i + '-' + j).removeAttribute('value');
        }
    }
    strokeNumber = 1;
    currentPlayer = 'x';
    playingField.setAttribute('class', 'current_' + currentPlayer);
    canChangePlayer = true;
}