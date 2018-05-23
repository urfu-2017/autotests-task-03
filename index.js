// Реализуй логику выбора победителя в этом файле
const playingField = document.getElementById('playing-field');
const winer = document.getElementById('winer');
let currentPlayer = 'x';
let canChangePlayer = true;
let counteOfPick = 0;
var x;
var o;

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
    counteOfPick++;
    if (counteOfPick > 4)
    {
    counter();
    }
    
    
});

function counter() {
    for(var i = 0; i < 3 ; i++)
    {
        x = Array(2).fill(0);
        o = Array(2).fill(0);
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
        if(x[0]==3 || x[1]==3)
        {
            winer.innerHTML = "x wins";
            canChangePlayer = false;
            return 1;
        }
        if(o[0]==3 || o[1]==3)
        {
            winer.innerHTML = "o wins";
            canChangePlayer = false;
            return 2;
        }
    }
    x = Array(2).fill(0);
    o = Array(2).fill(0);
    for(var i = 0; i < 3 ; i++)
    {
        if(getCellValue(i,i)=='x')
        {
            x[0]++;
        }
        if(getCellValue(i,i)=='o')
        {
            o[0]++;
        }
        if(getCellValue(2-i,i)=='x')
        {
            x[1]++;
        }
        if(getCellValue(2-i,i)=='o')
        {
            o[1]++;
        }
    } 
    if(x[0]==3 || x[1]==3)
    {
        winer.innerHTML = "x wins";
        canChangePlayer = false;
        return 1;
    }
    if(o[0]==3 || o[1]==3)
    {
        winer.innerHTML = "o wins";
        canChangePlayer = false;
        return 2;
    }
    if (counteOfPick == 9)
    {
        winer.innerHTML = "no winers";
        return 0;
    }
}

function cleargame()
{
    currentPlayer = 'x';
    canChangePlayer = true;
    counteOfPick=0;
    winer.innerHTML = "";
    for(var i=0; i<9; i++)
        document.getElementsByTagName('input')[i].removeAttribute('value');
    playingField.setAttribute('class', 'current_' + currentPlayer);
}

