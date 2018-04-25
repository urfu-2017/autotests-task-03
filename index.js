// Реализуй логику выбора победителя в этом файле
function winner(){

    for(let i = 0; i < 3; i++){

        if(getCellValue(i,0)=='x' && getCellValue(i,1)=='x' && getCellValue(i,2)=='x'){
            canChangePlayer = false;
            return alert("Крестики выиграли");
        }
        else if(getCellValue(0,i)=='x' && getCellValue(1,i)=='x' && getCellValue(2,i)=='x'){
            canChangePlayer = false;
            return alert("Крестики выиграли");
        }
        else if(getCellValue(0,0)=='x' && getCellValue(1,1)=='x' && getCellValue(2,2)=='x'){
            canChangePlayer = false;
            return alert("Крестики выиграли");
        }
        else if(getCellValue(0,2)=='x' && getCellValue(1,1)=='x' && getCellValue(2,0)=='x'){
            canChangePlayer = false;
            return alert("Крестики выиграли");
        }
        else if(getCellValue(i,0)=='o' && getCellValue(i,1)=='o' && getCellValue(i,2)=='o'){
            canChangePlayer = false;
            return alert("Нолики выиграли");
        }
        else if(getCellValue(0,i)=='o' && getCellValue(1,i)=='o' && getCellValue(2,i)=='o'){
            canChangePlayer = false;
            return alert("Нолики выиграли");
        }
        else if(getCellValue(0,0)=='o' && getCellValue(1,1)=='o' && getCellValue(2,2)=='o'){
            canChangePlayer = false;
            return alert("Нолики выиграли");
        }
        else if(getCellValue(0,2)=='o' && getCellValue(1,1)=='o' && getCellValue(2,0)=='o'){
            canChangePlayer = false;
            return alert("Нолики выиграли");
        }      
    }
}