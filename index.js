// Реализуй логику выбора победителя в этом файле
const playingField = document.getElementById('playing-field');
    let currentPlayer = 'x';
    let canChangePlayer = true;
    let counterClick = 0;
    var winDiv = document.getElementById('winer');

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
            counterClick++;
        }

        canChangePlayer = true;
        winner();
    });
    
    function newGame(){
        currentPlayer = 'x';
        canChangePlayer = true;    
        for(let i = 0; i < 9; i++){
            document.getElementsByTagName('input')[i].setAttribute('value', '');
        }	 
        counterClick = 0;
    }
function winner(){
    
        for(let i = 0; i < 3; i++){
            if(getCellValue(i,0)=='x' && getCellValue(i,1)=='x' && getCellValue(i,2)=='x'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили крестики";
                return 1;
            }
            else if(getCellValue(0,i)=='x' && getCellValue(1,i)=='x' && getCellValue(2,i)=='x'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили крестики";
                return 1;
            }
            else if(getCellValue(0,0)=='x' && getCellValue(1,1)=='x' && getCellValue(2,2)=='x'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили крестики";
                return 1;
            }
            else if(getCellValue(0,2)=='x' && getCellValue(1,1)=='x' && getCellValue(2,0)=='x'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили крестики";
                return 1;
            }
            else if(getCellValue(i,0)=='o' && getCellValue(i,1)=='o' && getCellValue(i,2)=='o'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили нолики";
                return 2;
            }
            else if(getCellValue(0,i)=='o' && getCellValue(1,i)=='o' && getCellValue(2,i)=='o'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили нолики";
                return 2;
            }
            else if(getCellValue(0,0)=='o' && getCellValue(1,1)=='o' && getCellValue(2,2)=='o'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили нолики";
                return 2;
            }
            else if(getCellValue(0,2)=='o' && getCellValue(1,1)=='o' && getCellValue(2,0)=='o'){
                canChangePlayer = false;
                winDiv.innerHTML = "Победили нолики";
                return 2;
            }      
        }
        if(counterClick == 9 && canChangePlayer) {
            winDiv.innerHTML = "Ничья";
            return 0;
    }
}