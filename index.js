const playingField = document.getElementById('playing-field');
let currentPlayer = 'x';
let canChangePlayer = true;

const buttonNewGame = document.getElementById('new-game');
const areaResult = document.getElementById('game-state');

playingField.addEventListener('click', handleClickOnField);
buttonNewGame.addEventListener('click', startNewGame);

function getCellValue(row, column) {
    const input = document.getElementById(row + '-' + column);

    return input.value;
}

function handleClickOnField(event) {
    if (!canChangePlayer) {
        return;
    }
    canChangePlayer = false;
    const cell = event.target;
    const hiddenInput = cell.getElementsByTagName('input')[0];
    if (!hiddenInput.value) {
        hiddenInput.setAttribute('value', currentPlayer);
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        playingField.setAttribute('class', 'current_' + currentPlayer);
    }
    canChangePlayer = true;
    checkResult();
}

function checkResult() {
    const state = getState();
    const result = getResult(state);
    if (result) {
        areaResult.textContent = result;
        playingField.removeEventListener('click', handleClickOnField);
        playingField.removeAttribute('class');
    }
}

function getState() {
    const state = [];
    for (let i = 0; i < 3; i++) {
        state.push(new Array(3));
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            state[i][j] = getCellValue(i, j);
        }
    }

    return state;
}

function getResult(state) {
    let result = getResultByRows(state);
    if (result) {
        return `Победили ${result}`;
    }
    result = getResultByColumns(state);
    if (result) {
        return `Победили ${result}`;
    }
    result = getResultByDiagonals(state);
    if (result) {
        return `Победили ${result}`;
    }
    if (fieldIsFull(state)) {
        return 'Ничья';
    }
}

function getResultByRows(state) {
    for (let i = 0; i < 3; i++) {
        const mark = state[i][0];
        if (!mark) {
            continue;
        }
        let isSame = true;
        for (let j = 1; j < 3; j++) {
            if (mark !== state[i][j]) {
                isSame = false;
                break;
            }
        }
        if (isSame) {
            return mark;
        }
    }
}

function getResultByColumns(state) {
    for (let i = 0; i < 3; i++) {
        const mark = state[0][i];
        if (!mark) {
            continue;
        }
        let isSame = true;
        for (let j = 1; j < 3; j++) {
            if (mark !== state[j][i]) {
                isSame = false;
                break;
            }
        }
        if (isSame) {
            return mark;
        }
    }
}

function getResultByDiagonals(state) {
    if (state[0][0] === state[1][1] && state[0][0] === state[2][2] && state[0][0]) {
        return state[0][0];
    }
    if (state[2][0] === state[1][1] && state[2][0] === state[0][2] && state[2][0]) {
        return state[2][0];
    }
}

function fieldIsFull(state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!state[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function startNewGame() {
    currentPlayer = 'x';
    canChangePlayer = true;
    playingField.addEventListener('click', handleClickOnField);
    const inputs = playingField.getElementsByTagName('input');
    Array.from(inputs).forEach(input => {
        input.removeAttribute('value');
        playingField.removeAttribute('class');
        playingField.setAttribute('class', 'current_' + currentPlayer);
        areaResult.textContent = '';
    })
}
