const playingField = document.getElementById('playing-field');
const result = document.getElementById('result');

	function newGame()
	{
		currentPlayer = 'x';
		canChangePlayer = true;
		steps = 0;
		result.innerHTML = "Сделайте ход";
		for(var i=0; i<9; i++){
			document.getElementsByTagName('input')[i].setAttribute('value', '');
		}	 
		playingField.addEventListener('click', listener);
	}
	
	function listener (event)
	{
        const cell = event.target;
        const hiddenInput = cell.getElementsByTagName('input')[0];
		
		if (!hiddenInput.value) 
		{
            hiddenInput.setAttribute('value', currentPlayer);
            currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
            playingField.setAttribute('class', 'current_' + currentPlayer);
			steps++;
        }
		winner = DidUWin();
		if (winner!=undefined) 
		{
			winnerIs();
			return
		}
		if(steps == 9)
		{
			result.innerHTML = "Ничья";
		}		
	}

	function getCellValue(row, column) 
	{
        let input = document.getElementById(row + '-' + column);
        return input.value;
	}
	

	function DidUWin(){
		winCord = {a:[0,0, 0,1, 0,2],b:[1,0, 1,1, 1,2],c:[2,0, 2,1, 2,2],d:[0,0, 1,0, 2,0],
		e:[0,1, 1,1, 2,1],f:[0,2, 1,2, 2,2],g:[0,0, 1,1, 2,2],h:[0,2, 1,1, 2,0]};
		for (var prop in winCord){
			if ((getCellValue(winCord[prop][0], winCord[prop][1]) == getCellValue(winCord[prop][2], winCord[prop][3])) && 
			(getCellValue(winCord[prop][2], winCord[prop][3]) == getCellValue(winCord[prop][4], winCord[prop][5])) && 
			(getCellValue(winCord[prop][0], winCord[prop][1]) !='') && (getCellValue(winCord[prop][2], winCord[prop][3]) != ''))
			return getCellValue(winCord[prop][0], winCord[prop][1]);
		}
	}
	
	function winnerIs(){
		if (winner == 'x')
		{
			result.innerHTML = "Первый игрок победил";
		}
		if (winner == 'o')
		{
			result.innerHTML = "Второй игрок победил";
		}
	}