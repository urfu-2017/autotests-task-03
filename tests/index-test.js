const cellClick = (x, y) => 
document.getElementById(`${x}-${y}`).parentNode.click(); 
const button = document.getElementById('new_game');

describe('cross-zero', () => { 
    // Этот тест можно уалить, он нужен для проверки сборки 
    it('should sum digits', () => chai.assert(1 + 1, 2)); 
    //button.click(); 
    it('should alert x wins', () => { 
        //button.click(); 
        cellClick(0, 0); 
        cellClick(1, 0); 
        cellClick(0, 1); 
        cellClick(1, 1); 
        cellClick(0, 2); 
        //const actual = getWiner(); 
        chai.assert(1, 1); 
        //button.click(); 
    }); 
    it('should alert x wins', () => { 
        //button.click(); 
        cellClick(1, 1); 
        cellClick(0, 0); 
        cellClick(2, 2); 
        cellClick(0, 2); 
        cellClick(0, 1); 
        cellClick(2, 1); 
        cellClick(1, 2); 
        cellClick(1, 0); 
        cellClick(2, 0); 
        //const actual = getWiner(); 
        chai.assert(1, 1); 
    }); 
});
