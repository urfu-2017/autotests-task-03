// Функция меняет счетчик следующего хода и возвращает его
const getNextMove = (mark1, mark2) => {
    const nextMove = document.querySelector('.next-move');
    const currentValue = nextMove.getAttribute('value');
    
    if (Number(currentValue) === Number(mark1)) {
        nextMove.setAttribute('value', mark2);
        return mark2;
    }
    nextMove.setAttribute('value', mark1);
    
    return mark1;
}

// Помечаем ячейку, изменяем массив, переключаем ход и проверяем победу
const markCell = e => {
    // Получаем метки текущих игроков
    const mark = [
        document.querySelectorAll('.picked-img')[0].getAttribute('value'),
        document.querySelectorAll('.picked-img')[1].getAttribute('value')
    ];
    
    // Переключаем тугл хода и узнаем, чей ход
    const newValue = getNextMove(mark[0], mark[1]);
    
    // Заполняем ячейку в объекте игры
    const cellSite = [];
    const cellClassNumbers = e.target.classList[1].split('_');
    cellSite.push(Number(cellClassNumbers[1]));
    cellSite.push(Number(cellClassNumbers[2]));
    game.fillCell(newValue, cellSite);
    
    // Вставляем в клетку картиночку
    const newImage = create('img', {
        'src': `./pictures/${newValue}.svg`
    });
    newImage.classList.add('cell__mark');
    e.target.appendChild(newImage);
    
    // Проверяем, не победил ли кто-то
    const description = document.querySelector('.description');
    if (game.checkWin(mark[0]) === 'ничья') {
        description.innerHTML = `Ничья. Попробуйте еще.`;
    } else if (game.checkWin(mark[0]) || game.checkWin(mark[1])) {
        description.innerHTML = `Победил игрок ${newValue === mark[0] ? 'слева' : 'справа'}`;
        const winnerImg = newImage.cloneNode();
        winnerImg.classList.remove('cell__mark');
        winnerImg.classList.add('winner');
        document.querySelector('.game').appendChild(winnerImg);
        document.querySelector('.board').classList.add('board_hidden');
    };
    
    // Отменяем обработчик клика
    e.target.removeEventListener('click', markCell);
}

// Создаём клетку с классами, стилями и обработчиком и возвращаем её
const createCell = (i, j) => {
    const cell = create('div');
    cell.classList.add('cell', `cell_${i + 1}_${j + 1}`);
    cell.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`;
    cell.addEventListener('click', markCell);
    
    return cell;
}

// Рисуем новую доску, создаем новый экземпляр игры
const createNewGame = () => {
    const board = document.querySelector('.board');
    
    // Убираем метку победителя, если она есть
    board.classList.remove('board_hidden');
    const winner = document.querySelector('.winner');
    if (winner) {
        winner.remove();
    }
    
    // Чистим доску
    board.innerHTML = '';
    
    // Создаем счетчик хода
    const queue = create('input', {
        'type': 'hidden',
        'class': 'next-move',
        'value': 0
    });
    board.appendChild(queue);

    // Создаем новый объект игрового поля
    const rows = Number(document.querySelector('.setting__rows').value);
    const columns = Number(document.querySelector('.setting__columns').value);
    const tableSize = Math.max(rows, columns);
    game = new Game(rows, columns);
    
    // Задаем стили для правильной отрисовки элементов
    let gridStyleRows = '';
    let gridStyleColumns = '';
    for (let i = 0; i < tableSize; ++i) {
        gridStyleRows += '1fr ';
        gridStyleColumns += '1fr ';
    }
    board.style.gridTemplateRows = gridStyleRows;
    board.style.gridTemplateColumns = gridStyleColumns;
    
    // Создаем клетки в поле
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            const cell = createCell(i, j);
            board.appendChild(cell);
        };
    };
    
    // Меняем описание игры
    const description = document.querySelector('.description');
    const num = game.getBoard().needToWin;
    description.innerHTML = `Для победы необходимо занять` +
        ` ${num} ${num > 4 ? 'ячеек' : 'ячейки'} подряд`;
};
