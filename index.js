// Реализуй логику выбора победителя в этом файле
const win = document.getElementById('win');
const playingField = document.getElementById('playing-field');
    let currentPlayer = 'x';
    let canChangePlayer = true;

    function getCellValue(row, column) {
        const input = document.getElementById(row + '-' + column);

        return input.value;
    }

    playingField.addEventListener('click', event => {
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
        winner();
        FullField(); 
    });
    
function winner(){
    
    for(let i=0; i<3; i++){
        
        if(getCellValue(i,0)=='x' && getCellValue(i,1)=='x' && getCellValue(i,2)=='x'){
            canChangePlayer = false;
            win.innerHTML = "Крестики выиграли";
            return 1;
        }
        else if(getCellValue(0,i)=='x' && getCellValue(1,i)=='x' && getCellValue(2,i)=='x'){
            canChangePlayer = false;
            win.innerHTML = "Крестики выиграли";
            return 2;
        }
        else if(getCellValue(0,0)=='x' && getCellValue(1,1)=='x' && getCellValue(2,2)=='x'){
            canChangePlayer = false;
            win.innerHTML = "Крестики выиграли";
            return 3;
        }
        else if(getCellValue(0,2)=='x' && getCellValue(1,1)=='x' && getCellValue(2,0)=='x'){
            canChangePlayer = false;
            win.innerHTML = "Крестики выиграли";
            return 4;
        }
        else if(getCellValue(i,0)=='o' && getCellValue(i,1)=='o' && getCellValue(i,2)=='o'){
            canChangePlayer = false;
            win.innerHTML = "Нолики выиграли";
            return 5;
        }
        else if(getCellValue(0,i)=='o' && getCellValue(1,i)=='o' && getCellValue(2,i)=='o'){
            canChangePlayer = false;
            win.innerHTML = "Нолики выиграли";
            return 6;
        }
        else if(getCellValue(0,0)=='o' && getCellValue(1,1)=='o' && getCellValue(2,2)=='o'){
            canChangePlayer = false;
            win.innerHTML = "Нолики выиграли";
            return 7;
        }
        else if(getCellValue(0,2)=='o' && getCellValue(1,1)=='o' && getCellValue(2,0)=='o'){
            canChangePlayer = false;
            win.innerHTML = "Нолики выиграли";
            return 8;
        }
    } 
    win.innerHTML = "Игра не закончена"; 
    return 9;    
}
function FullField() {
        for (let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if (getCellValue(i, j) == '') return false;
               
            win.innerHTML = "Ничья";
        return 0
}

function Refresh(){
    currentPlayer = 'x';
    canChangePlayer = true;    
    for(var i=0; i<9; i++){
        document.getElementsByTagName('input')[i].setAttribute('value', '');
    }	 
}
