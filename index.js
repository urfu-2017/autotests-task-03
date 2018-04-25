var field = document.querySelector('.field');
var controls = document.querySelectorAll('.field__cell input');
var buttons = document.querySelectorAll('.field__cell-control');
var restartButton = document.querySelector('.game-restart');
var turnOrder = document.querySelector('.turn-order');
var winner = document.querySelector('.winner-popup');
var ready = false;

var turnValues = {
    cross: {
        value: 'cross', // значения полей - значения, вставляемые в input[type=hidden] в ячейках поля и модификаторы классов
        name: '<span class="winner-icon winner-icon_cross">Игрок 1</span>' // имя в блоке победителя в случае победы
    },
    zero: {
        value: 'zero',
        name: '<span class="winner-icon winner-icon_zero">Игрок 2</span>'
    },
    current: null
};

initControls();
restart();

/**
 * Инициализирует поведение элементов на странице
 * @return {undefined}
 */
function initControls() {
    restartButton.addEventListener('click', restart);
    winner.addEventListener('click', function() {
        winner.classList.remove('visible');
    });
    for (var i = 0; i < buttons.length; i++) {
        (function(button, index) {
            button.addEventListener('click', function() {
                if (!ready) {
                    return;
                }
                if (markCell(index) && hasWinner()) {
                    ready = false;
                    winner.children[0].innerHTML = getWinnerName();
                    winner.classList.add('visible');
                }
            });
        })(buttons[i], i);
    }
}

/**
 * Очищает игровое поле и инициализирует новую игру
 * @return {undefined}
 */
function restart() {
    for (var i = 0; i < controls.length; i++) {
        controls[i].value = '';
        controls[i].setAttribute('value', '');
    }
    if (field.classList.contains('field_zero-placeholder')) {
        field.classList.remove('field_zero-placeholder');
    }
    if (turnOrder.classList.contains('turn-order_zero')) {
        turnOrder.classList.remove('turn-order_zero');
    }
    turnValues.current = turnValues.cross;
    winner.children[0].innerHTML = '';
    ready = true;
}

/**
 * Выполняет проверку, занята ли ячейка по указанному индексу
 * @param {number} index - индекс ячейки в диапазоне [0, 8]
 * @return {boolean}
 */
function cellUsed(index) {
    if (typeof index !== 'number') {
        throw new Error('cell index should be a number');
    }
    if (index < 0 || index > 8) {
        throw new Error('cell index should be in range from 0 to 8');
    }
    if (index % 1 !== 0) {
        throw new Error('cell index should be an integer number');
    }

    return controls[index].value !== '';
}

/**
 * Отмечает ячейку по указанному индексу
 * @param {number} index - индекс ячейки в диапазоне [0, 8]
 * @return {boolean}
 */
function markCell(index) {
    if (cellUsed(index)) {
        return false;
    }
    controls[index].value = turnValues.current.value;
    field.classList.toggle('field_zero-placeholder');
    turnOrder.classList.toggle('turn-order_zero');
    turnValues.current = turnValues.current === turnValues.cross ? turnValues.zero : turnValues.cross;

    return true;
}

/**
 * Проверяет наличие победителя
 * @return {boolean}
 */
function hasWinner() {
    if (getWinnerValue() !== '') {
        return true;
    }
    for (var i = 0; i < controls.length; i++) {
        if (!cellUsed(i)) {
            return false;
        }
    }

    return true;
}

/**
 * Возвращает имя победителя
 * @return {string}
 */
function getWinnerName() {
    var winnerValue = getWinnerValue();
    if (turnValues.cross.value === winnerValue) {
        return 'Победитель: ' + turnValues.cross.name;
    }
    if (turnValues.zero.value === winnerValue) {
        return 'Победитель: ' + turnValues.zero.name;
    }

    return 'Ничья';
}

/**
 * Возвращает значение input[type='hidden'] победителя
 * @return {string}
 */
function getWinnerValue() {
    var winnerValue = '';
    for (var i = 0; i < 3; i++) {
        // проверка по горизонтали
        if (controls[i * 3].value !== '' && controls[i * 3].value === controls[i * 3 + 1].value && controls[i * 3 + 1].value === controls[i * 3 + 2].value) {
            winnerValue = controls[i * 3].value;
            break;
        }
        // проверка по вертикали
        if (controls[i].value !== '' && controls[i].value === controls[i + 3].value && controls[i].value === controls[i + 6].value) {
            winnerValue = controls[i].value;
            break;
        }
    }
    // проверка по диагонали
    if (winnerValue === '') {
        if (controls[0].value !== '' && controls[0].value === controls[4].value && controls[4].value === controls[8].value) {
            winnerValue = controls[0].value;
        } else if (controls[2].value !== '' && controls[2].value === controls[4].value && controls[4].value === controls[6].value) {
            winnerValue = controls[2].value;
        }
    }

    return winnerValue;
}