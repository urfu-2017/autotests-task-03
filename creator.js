const getNextMove = (mark1, mark2) => {
    const nextMove = document.getElementsByClassName('next-move')[0];
    const currentValue = nextMove.getAttribute('value');
    
    if (Number(currentValue) === Number(mark1)) {
        nextMove.setAttribute('value', mark2);
        return mark2;
    }
    nextMove.setAttribute('value', mark1);
    
    return mark1;
}

const markCell = e => {
    const img1 = document.getElementsByClassName('picker__img')[0];
    const img2 = document.getElementsByClassName('picker__img')[8];
    const mark1 = img1.getAttribute('value');
    const mark2 = img2.getAttribute('value');
    
    const newValue = getNextMove(mark1, mark2);
    
    const cellSite = [];
    const cellClassNumbers = e.target.classList[1].split('_');
    cellSite.push(Number(cellClassNumbers[1]));
    cellSite.push(Number(cellClassNumbers[2]));
    game.fillCell(newValue, cellSite);
    
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `./pictures/${newValue}.svg`);
    newImage.classList.add('cell__mark');
    e.target.appendChild(newImage);
    
    if (game.checkWin(mark1) === 'ничья') {
        const description = document.getElementsByClassName('description')[0];
        description.innerHTML = `Ничья. Попробуйте еще.`;
    } else if (game.checkWin(mark1) || game.checkWin(mark2)) {
        const description = document.getElementsByClassName('description')[0];
        description.innerHTML = `Победил игрок ${newValue === mark1 ? 'слева' : 'справа'}`;
        const winnerImg = newImage.cloneNode();
        winnerImg.classList.remove('cell__mark');
        winnerImg.classList.add('winner');
        document.getElementsByClassName('game')[0].appendChild(winnerImg);
        document.getElementsByClassName('board')[0].classList.add('board_hidden');
    };
    
    e.target.removeEventListener('click', markCell);
}

const createCell = () => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', markCell);
    
    return cell;
}

const createNewGame = () => {
    const board = document.getElementsByClassName('board')[0];
    
    board.classList.remove('board_hidden');
    const winner = document.getElementsByClassName('winner')[0];
    if (winner) {
        winner.remove();
    }
    
    Array.prototype.slice.call(board.children).forEach(cell => cell.remove());
    
    const queue = document.createElement('input');
    queue.setAttribute('type', 'hidden');
    queue.setAttribute('class', 'next-move');
    queue.setAttribute('value', 0);
    board.appendChild(queue);
        
    const rows = document.getElementsByClassName('setting__rows')[0].value;
    const columns = document.getElementsByClassName('setting__columns')[0].value;
    const tableSize = Math.max(rows, columns);
    game = new Game(rows, columns);
    
    let gridStyleRows = '';
    let gridStyleColumns = '';
    for (let i = 0; i < tableSize; ++i) {
        gridStyleRows += '1fr ';
        gridStyleColumns += '1fr ';
    }

    board.style.gridTemplateRows = gridStyleRows;
    board.style.gridTemplateColumns = gridStyleColumns;
    
    const cells = rows * columns;
    const sizeCell = 450 / tableSize;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            const cell = createCell();
            cell.style.width = `${sizeCell}px`;
            cell.style.height = `${sizeCell}px`;
            cell.classList.add(`cell_${i + 1}_${j + 1}`);
            cell.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`;
            board.appendChild(cell);
        };
    };
    
    const description = document.getElementsByClassName('description')[0];
    const needToWin = Math.min(rows, columns, 5);
    description.innerHTML = `Для победы необходимо занять` +
        ` ${needToWin} ${needToWin > 4 ? 'ячеек' : 'ячейки'} подряд`;
};