/* Определение подбедителя ведется путем формирования
последовательностей из символов и проверки needToWin
вхождений нужного символа подряд */
const checkSequence = (sequence, playerMark, needToWin) => {
    return sequence
        .map(elem => elem === playerMark ? playerMark : 0)
        .join('')
        .split('0')
        .some(elem => elem.length === needToWin);
};

// Проверка всех строк
const checkRows = (array, playerMark, needToWin) =>
    // Проверяем каждую строку
    /* хочется проверить:
        [
            [1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3, 3, 3],
            [4, 4, 4, 4, 4, 4, 4],
            [5, 5, 5, 5, 5, 5, 5],
            [6, 6, 6, 6, 6, 6, 6],
            [7, 7, 7, 7, 7, 7, 7],
            [8, 8, 8, 8, 8, 8, 8],
        ]
    */
    array.some(row => checkSequence(row, playerMark, needToWin));

// Проверка всех столбцов
const checkColumns = (array, playerMark, needToWin) => {
    // Массив столбцов
    /* хочется проверить:
        [
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
        ]
    */
    const columns = [];

    // Добавляем столбцы в цикле, беря i-ые элементы каждой строки
    for (let i = 0; i < array[0].length; ++i) {
        columns.push(array.map(elem => elem[i]));
    }

    return columns.some(column => checkSequence(column, playerMark, needToWin));
};

// Проверка всех главных диагоналей
const checkMajorDiagonals = (array, playerMark, needToWin) => {
    // Массив ячеек, с которых начинаются главные диагонали
    /* хочется проверить:
        [
            [1, 5, 6, 0, 0, 0, 0],
            [2, 1, 5, 6, 0, 0, 0],
            [3, 2, 1, 5, 6, 0, 0],
            [4, 3, 2, 1, 5, 6, 0],
            [0, 4, 3, 2, 1, 5, 6],
            [0, 0, 4, 3, 2, 1, 5],
            [0, 0, 0, 4, 3, 2, 1],
            [0, 0, 0, 0, 4, 3, 2],
        ]
    */
    const startCells = [];

    // Добавляем все первые ячейки из каждой строки,
    // где побочная диагональ НЕ короче needToWin
    for (let i = 0; i < array.length; ++i) {
        const seqLength = Math.min(array[0].length, array.length - i);
        if (seqLength >= needToWin) {
            startCells.push([i, 0]);
        }
    };

    // Добавляем все ячейки из первой строки, кроме первой,
    // где главная диагональ НЕ короче needToWin
    for (let i = 0; i < array[0].length; ++i) {
        const seqLength = Math.min(array.length, array[0].length - i);
        if (seqLength >= needToWin && i) {
            startCells.push([0, i]);
        }
    };

    // Формируем последовательности и проверяем каждую на победу игрока
    return startCells.some(cell => {
        const sequence = [];
        let row = cell[0];
        let column = cell[1];
        while (array.length > row && array[0].length > column) {
            sequence.push(array[row++][column++]);
        }

        return checkSequence(sequence, playerMark, needToWin);
    });
};

// Проверка всех побочных диагоналей
const checkMinorDiagonals = (array, playerMark, needToWin) => {
    // Массив ячеек, с которых начинаются побочные диагонали
    /* хочется проверить:
        [
            [0, 0, 0, 0, 1, 2, 3],
            [0, 0, 0, 1, 2, 3, 4],
            [0, 0, 1, 2, 3, 4, 5],
            [0, 1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6, 0],
            [2, 3, 4, 5, 6, 0, 0],
            [3, 4, 5, 6, 0, 0, 0],
            [4, 5, 6, 0, 0, 0, 0],
        ]
    */
    const startCells = [];

    // Добавляем все ячейки из первой строки,
    // где главная диагональ НЕ короче needToWin
    array[0].forEach((column, index) => {
        const seqLength = Math.min(array.length, 1 + index);
        if (seqLength >= needToWin) {
            startCells.push([0, index]);
        }
    });

    // Добавляем все последние ячейки из каждой строки,
    // кроме первой, где побочная диагональ НЕ короче needToWin
    array.forEach((row, index) => {
        const seqLength = Math.min(array[0].length, array.length - index);
        if (seqLength >= needToWin && index) {
            startCells.push([index, array[0].length - 1]);
        }
    });

    // Формируем последовательности и проверяем каждую на победу игрока
    return startCells.some(cell => {
        const sequence = [];
        let row = cell[0];
        let column = cell[1];
        while (array.length > row && column >= 0) {
            sequence.push(array[row++][column--]);
        }

        return checkSequence(sequence, playerMark, needToWin);
    });
};

// Проверяем, заполнены ли все клетки поля
const isFull = array => array.every(row => row.every(cell => cell !== 0));

const checkWinner = (array, playerMark, needToWin) => {
    // Партия выиграна, если хотя бы одна из проверок осей дает true
    const isWin = checkMinorDiagonals(array, playerMark, needToWin) ||
    checkMajorDiagonals(array, playerMark, needToWin) ||
    checkColumns(array, playerMark, needToWin) ||
    checkRows(array, playerMark, needToWin);

    // Если заполнены все ячейки и нет победителя, то партия ничейная
    if (isFull(array) && !isWin) {
        return 'ничья';
    }

    return isWin;
}
