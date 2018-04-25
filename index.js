// Реализуй логику выбора победителя в этом файле
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

    var x = [0,0,0,0];
    var o = [0,0,0,0];
    for(var i = 0; i < 3 ; i++)
    {
        x[0]=0;
        x[1]=0;
        o[0]=0;
        o[1]=0;
        for(var j = 0; j < 3; j++)
        {
            if(getCellValue(i,j)=='x')
            {
                x[0]++;
            }
            if(getCellValue(i,j)=='o')
            {
                o[0]++;
            }
            if(getCellValue(j,i)=='x')
            {
                x[1]++;
            }
            if(getCellValue(j,i)=='o')
            {
                o[1]++;
            }
        }
        if(getCellValue(i,i)=='x')
        {
            x[2]++;
        }
        if(getCellValue(i,i)=='o')
        {
            o[2]++;
        }
        getWiner(x,o);
    }
    
});

function getWiner(x,o) {
    for(var j = 0; j < 4; j++)
    {
        if(x[j]==3)
        {
        alert("x wins");
        canChangePlayer = false;
        return 1;
        }
        if(o[j]==3)
        {
        alert("o wins");
        canChangePlayer = false;
        return 2;
        }
    }
    return 0;
}