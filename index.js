const playingField = document.getElementById('playing-field');
let currentPlayer = 'x';
let canChangePlayer = true;
/* Инпуты игрового поля */
let playingFieldInputs = new Array(9);
for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
        playingFieldInputs[x * 3 + y] = document.getElementById(x + "-" + y)
    }
}

function getCellValue(row, column) {
    const input = document.getElementById(row + '-' + column);
    return input.value;
}

/* Очищаем игровое поле, устанавливаем текущего игрока и очищаем запись о победители*/
function startNewGame(fieldInputs) {
    playingFieldInputs.forEach(input => {
        input.removeAttribute('value');
    });
    currentPlayer = 'x'
    playingField.setAttribute('class', 'current_' + currentPlayer);
    document.getElementById("winmsg").innerText = ""
    canChangePlayer = true
}

// Логика определения победителя!!
/* Возвращает символ победителя либо пустую строку либо ничью */
function getWinMsg() {
    let winMsg = undefined;

    /* Возвращает элемент, содержащийся во всех ячейках, иначе пустую строку*/
    function getSomeValue(valuesToCheck) {
        const checkedValue = valuesToCheck[0];
        if (valuesToCheck.every(valueToCheck => valueToCheck == checkedValue)){
            return checkedValue;
        }
        else{
            return "";
        }
    }
    // Текущие состояние доски
    const gameValues = playingFieldInputs.map(inp => inp.value);
    // проверка горизонтальных линий
    winMsg = getSomeValue(gameValues.slice(0, 3)) + getSomeValue(gameValues.slice(3, 6)) + getSomeValue(gameValues.slice(6, 9))
        // проверка вертикальных линий
        + getSomeValue([gameValues[0], gameValues[3], gameValues[6]])
        + getSomeValue([gameValues[1], gameValues[4], gameValues[7]])
        + getSomeValue([gameValues[2], gameValues[5], gameValues[8]])
        // проверка диагоналей
        + getSomeValue([gameValues[0], gameValues[4], gameValues[8]])
        + getSomeValue([gameValues[2], gameValues[4], gameValues[6]])

    // если победитель не определён и все ячейки заполнены
    if (winMsg.length == 0 && !gameValues.some(value => value == "")){
        winMsg = "ничья"
    }
    return winMsg;
}

playingField.addEventListener('click', event => {
    if(!canChangePlayer){
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

    const winMsg = getWinMsg()
    if (winMsg.length > 0) {
        const winMsgDiv = document.getElementById("winmsg")
        winMsgDiv.innerText = winMsg
        canChangePlayer = false
    }
})
;