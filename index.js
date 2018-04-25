const checkSequence = (sequence, playerMark, needToWin) => {
    return sequence
        .map(elem => elem === playerMark ? playerMark : 0)
        .join('')
        .split('0')
        .some(elem => elem.length === needToWin);
};

const checkRows = (array, playerMark, needToWin) => array.some(row => checkSequence(row, playerMark, needToWin));

const checkColumns = (array, playerMark, needToWin) => {
    const columns = [];
    for (let i = 0; i < array[0].length; ++i) {
        columns.push(array.map(elem => elem[i]));
    }

    return columns.some(column => checkSequence(column, playerMark, needToWin));
};

const checkMajorDiagonals = (array, playerMark, needToWin) => {
    const startCells = [];
    array.forEach((row, index) => {
        const seqLength = Math.min(array[0].length, array.length - index);
        if (seqLength >= needToWin) {
            startCells.push([index, 0]);
        }
    });
    array[0].forEach((column, index) => {
        const seqLength = Math.min(array.length, array[0].length - index);
        if (seqLength >= needToWin && index) {
            startCells.push([0, index]);
        }
    });

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

const checkMinorDiagonals = (array, playerMark, needToWin) => {
    const startCells = [];
    array[0].forEach((column, index) => {
        const seqLength = Math.min(array.length, 1 + index);
        if (seqLength >= needToWin) {
            startCells.push([0, index]);
        }
    });
    array.forEach((row, index) => {
        const seqLength = Math.min(array[0].length, array.length - index);
        if (seqLength >= needToWin && index) {
            startCells.push([index, array[0].length - 1]);
        }
    });

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

const isDraw = array => array.every(row => row.every(cell => cell !== 0));

const checkWinner = (array, playerMark, needToWin) => {
    if (isDraw(array)) {
        return 'ничья';
    }
    return checkMinorDiagonals(array, playerMark, needToWin) ||
    checkMajorDiagonals(array, playerMark, needToWin) ||
    checkColumns(array, playerMark, needToWin) ||
    checkRows(array, playerMark, needToWin);
}
