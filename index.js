function getWinner() {
    const winner = checkWinner(0, 0, 1, 0)
            || checkWinner(0, 1, 1, 0)
            || checkWinner(0, 2, 1, 0)
            || checkWinner(0, 0, 0, 1)
            || checkWinner(1, 0, 0, 1)
            || checkWinner(2, 0, 0, 1)
            || checkWinner(0, 0, 1, 1)
            || checkWinner(0, 2, 1, -1);

if (!winner) {
    if (fieldIsFull()) return 'Ничья';
    return null;
} else return winner;
}

function checkWinner(x, y, dx, dy) {
    const player = getCellValue(x, y);
    if (player === '') return false;

    for (let i = 0; i < 2; i++) {
        x += dx;
        y += dy;
        if (getCellValue(x, y) !== player) return false;
    }

    return player;
}

function fieldIsFull() {
    for (let x = 0; x < 3; x++)
        for(let y = 0; y < 3; y++)
            if (getCellValue(x, y) === '') return false;

    return true;
}
