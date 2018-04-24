const playingField = document.getElementById('playing-field');
const result = document.getElementById('result');
let currentPlayer = 'x';
let canChangePlayer = true;
var winner ='';
var steps = 0;

	function getCellValue(row, column) {
        let input = document.getElementById(row + '-' + column);
        return input.value;
    }
	
	var listener = function listener (event){
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
			steps++;
        }
        canChangePlayer = true;
		winner = isWinnerRow();
		if (winner!=undefined) determineWinner();
		else if(steps == 9){
			result.innerHTML = "Ничья";
		}		
	}
	   
  playingField.addEventListener('click', listener);
    
	function determineWinner(){
		if (winner == 'x'){
			result.innerHTML = "Первый игрок победил";
		}
		if (winner == 'o') {
			result.innerHTML = "Второй игрок победил";
		}
		playingField.removeEventListener('click', listener);
	}
	
	function newGame(){
		currentPlayer = 'x';
		canChangePlayer = true;
		steps = 0;
		result.innerHTML = "Сделайте ход";
		for(var i=0; i<9; i++){
			document.getElementsByTagName('input')[i].setAttribute('value', '');
		}	 
		playingField.addEventListener('click', listener);
	}

	function isSameCells(cells){
		if ((getCellValue(cells[0], cells[1]) == getCellValue(cells[2], cells[3])) && 
			(getCellValue(cells[2], cells[3]) == getCellValue(cells[4], cells[5])) && 
			(getCellValue(cells[0], cells[1]) !='') && (getCellValue(cells[2], cells[3]) != ''))
			return true;
	}

	function isWinnerRow(){
		if (isSameCells([0,0, 0,1, 0,2])) return getCellValue(0,2);
		if (isSameCells([1,0, 1,1, 1,2])) return getCellValue(1,2);
		if (isSameCells([2,0, 2,1, 2,2])) return getCellValue(2,2);
		if (isSameCells([0,0, 1,0, 2,0])) return getCellValue(2,0);
		if (isSameCells([1,0, 1,1, 2,1])) return getCellValue(2,1);
		if (isSameCells([0,2, 1,2, 2,2])) return getCellValue(2,2);
		if (isSameCells([0,0, 1,1, 2,2])) return getCellValue(2,2);
		if (isSameCells([0,2, 1,1, 2,0])) return getCellValue(2,0);
	}
	
	
