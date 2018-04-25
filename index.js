// Реализуй логику выбора победителя в этом файле
const busyCells = [];
let table = {};
let isWinner = 0;
const cell = document.querySelectorAll('.cell');
newGame();

function newGame() {
    hideResult();
    busyCells.length = 0;
    table = {
        row1: {
            count: 0,
            position: [1, 2, 3]
        },
        row2: {
            count: 0,
            position: [4, 5, 6]
        },
        row3: {
            count: 0,
            position: [7, 8, 9]
        },
        column1: {
            count: 0,
            position: [1, 4, 7]
        },
        column2: {
            count: 0,
            position: [2, 5, 8]
        },
        column3: {
            count: 0,
            position: [3, 6, 9]
        },
        d1: {
            count: 0,
            position: [1, 5, 9]
        },
        d2: {
            count: 0,
            position: [3, 5, 7]
        },
    };
    isWinner = 0;
}

for (let index = 0; index < cell.length; index++) {
    clickOnCell(index);
}

function clickOnCell(index) {
    cell[index].addEventListener('click', (event) => {
        if (event.target.innerHTML !== '') {
            alert('Занято!');

            return;
        }
        event.target.innerHTML = 'X';
        const idCell = parseInt(event.target.id);
        busyCells.push(idCell);
        isWinner = winner(idCell, 'Игрок');
        if(isWinner !== 1 && busyCells.length < 8)
            computer();
        if(busyCells.length === 9 && isWinner !== 1)
            noneWinner();
    });
}

function winner(id, user) {
    saveWinner(id, user);
    for (let elements in table) {
        if (table[elements].count === 3) {
            showResult('Вы победили!', user);
            winnerBegin();
            return 1;
        }
        if (table[elements].count === -3) {
            showResult('Победил компютер', user);
            winnerBegin();
            return 1;
        }
    }
    return 0;
}

function saveWinner(id, user) {
    for (let elements in table) {
        let index = table[elements].position.indexOf(id);
        if (index !== -1) {
            table[elements].count += user === 'Игрок' ? 1 :  -1;
            table[elements].position.splice(index, 1);
        }
    }
}

function showResult(text, user) {
    const result = document.getElementsByClassName('result');
    result[0].innerHTML = text;
    let color = user === 'Игрок' ? 'result-green' :  'result-red';
    result[0].classList.add(color);
    result[0].classList.add('result-show');
}

function hideResult() {
    const result = document.getElementsByClassName('result');
    result[0].classList.remove('result-show');
    result[0].classList.remove('result-green');
    result[0].classList.remove('result-red');
    for (let index = 0; index < cell.length; index++) {
        cell[index].innerHTML = '';
    }
}

function winnerBegin() {
    setTimeout(function(){
        newGame();
    }, 1000);
}

function noneWinner() {
    setTimeout(function(){
        showResult('Ничья!', 'Ничья');
    }, 500);

    setTimeout(function(){
        newGame();
    }, 1000);
}

function computer() {
    let number;
    let optimal = [];
    for (let elements in table) {
        if (table[elements].count === -2) {
            optimal.unshift(table[elements].position[0]);
        }
        if (table[elements].count === 2) {
            optimal.push(table[elements].position[0]);
        }
    }
    let str = '';
    optimal.forEach(item => {
        str += item;
    });
    if (optimal.length !== 0) {
        number = optimal[0];
        cell[number-1].innerHTML = 'O';
        busyCells.push(number);
        winner(number, 'Компьютер');
        return;
    }

    $flag = false;
    busyCells.sort();
    while(true) {
        if(busyCells.length === 9)
        {
            noneWinner();
        }

        number = getRandomInRange(1, 9);

        for (let i = 0; i < busyCells.length; i++) {
            if(number === busyCells[i])
                $flag = true;
        }

        if($flag === false)
            break;
        else
        {
            $flag = false;
            continue;
        }
    }
    cell[number-1].innerHTML = 'O';

    busyCells.push(number);
    winner(number, 'Компьютер');
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
