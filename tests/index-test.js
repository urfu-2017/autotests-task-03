mocha.setup('bdd');
describe('tic-tac-toe', () => {
    var config = [
        // [x] по горизонтали
        { sequence: [ 0, 3, 1, 4, 2 ], name: 'Игрок 1' },
        { sequence: [ 3, 1, 4, 2, 5 ], name: 'Игрок 1' },
        { sequence: [ 6, 5, 7, 4, 8 ], name: 'Игрок 1' },
        { sequence: [ 5, 0, 4, 2, 8, 1 ], name: 'Игрок 2' },
        { sequence: [ 0, 3, 1, 4, 6, 5 ], name: 'Игрок 2' },
        { sequence: [ 4, 7, 0, 8, 2, 6 ], name: 'Игрок 2' },
        // [x] по вертикали
        { sequence: [ 0, 1, 3, 2, 6 ], name: 'Игрок 1' },
        { sequence: [ 1, 0, 4, 3, 7 ], name: 'Игрок 1' },
        { sequence: [ 2, 0, 5, 3, 8 ], name: 'Игрок 1' },
        { sequence: [ 4, 3, 8, 6, 5, 0 ], name: 'Игрок 2' },
        { sequence: [ 3, 7, 2, 1, 0, 4 ], name: 'Игрок 2' },
        { sequence: [ 7, 8, 0, 5, 6, 2 ], name: 'Игрок 2' },
        // [x] по диагонали
        { sequence: [ 0, 1, 4, 2, 8 ], name: 'Игрок 1' },
        { sequence: [ 2, 1, 4, 0, 6 ], name: 'Игрок 1' },
        { sequence: [ 1, 0, 2, 8, 7, 4 ], name: 'Игрок 2' },
        { sequence: [ 8, 4, 5, 2, 7, 6 ], name: 'Игрок 2' },
        // ничья
        { sequence: [ 2, 5, 4, 1, 8, 0, 7, 6, 3 ], name: 'Ничья' },
        // "холостые" клики [ 0, 2, 1, 4, 5, 3, 7 ]
        { sequence: [ 0, 2, 1, 4, 5, 3, 7, 0, 2, 1, 4, 5, 3, 7, 8 ], name: '' },
        // "холостые" клики [ 0, 2, 1 ] перед завершением игры
        { sequence: [ 0, 2, 1, 4, 5, 3, 7, 0, 2, 1, 8, 6 ], name: 'Ничья' },
        // не завершенная игра
        { sequence: [ ], name: '' },
        { sequence: [ 4 ], name: '' },
        { sequence: [ 4, 1, 0, 2 ], name: '' },
        { sequence: [ 4, 1, 0, 2, 3, 6, 7, 5 ], name: '' },
    ];
    // элементы управления
    var buttons = document.querySelectorAll('.field__cell-control');
    var restartButton = document.querySelector('.game-restart');
    var messageBlock = document.querySelector('.winner-popup__message');
    // clean-up
    beforeEach(restart);
    after(restart);

    config.forEach((testCase) => {
        it(`should print winner message: '` + expectedMessage(testCase.name) + `' for sequence: ${testCase.sequence}`, () => {
            initField(testCase.sequence);
            var actual = winnerMessage();
            var expected = expectedMessage(testCase.name);
            chai.assert.equal(actual, expected);
        });
    });

    /**
     * Очистка игрового поля
     * @return {undefined}
     */
    function restart() {
        restartButton.dispatchEvent(new Event('click'));
    }

    /**
     * Клик по ячейке игрового поля
     * @param {Array} sequence - последовательность индексов ячеек, по которым производится клик
     * @return {undefined}
     */
    function initField(sequence) {
        for (var i = 0; i < sequence.length; i++) {
            buttons[sequence[i]].dispatchEvent(new Event('click'));
        }
    }

    /**
     * Текст сообщения о победителе
     * @return {string}
     */
    function winnerMessage() {
        return messageBlock.innerText;
    }

    /**
     * Преобразовывает имя победителя в текст сообщения о победителе
     * @param {string} name - имя победителя
     * @return {string}
     */
    function expectedMessage(name) {
        if (name === 'Игрок 1' || name === 'Игрок 2') {
            return 'Победитель: ' + name;
        }
        if (name === 'Ничья') {
            return name;
        }

        return '';
    }

});
