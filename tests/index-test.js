const assert = chai.assert;

describe('cross-zero', function () {
    describe('button new game', function () {
        it('should clear table', function () {
            const cell = document.querySelectorAll('.cell');
            for (let index = 0; index < cell.length; index++) {
                cell[index].innerHTML = 'X';
            }
            const button = document.querySelector('.game__start');
            button.onclick();
            let actual = '';
            for (let index = 0; index < cell.length; index++) {
                actual += cell[index].innerHTML;
            }
            assert.equal(actual, '');
        });
        it('should hiden result', function () {
            const result = document.getElementsByClassName('result');
            result[0].classList.add('result-show');
            const button = document.querySelector('.game__start');            
            button.onclick();
            assert.equal(result[0].classList.length, 1);
        });
    });
    describe('click on cell', function () {
        it('should show `X` in cell (1; 1)', function () {
            newGame();
            const cell = document.getElementById('1');
            cell.click();
            assert.equal(cell.innerHTML, 'X');
        });
    });
    describe('action computer', function () {
        it('should show `O` in one cell random', function () {
            newGame();
            const cellX = document.getElementById('1');
            cellX.click();
            const cell = document.querySelectorAll('.cell');
            let actual = '';
            for (let index = 0; index < cell.length; index++) {
                if (cell[index].innerHTML === 'O') {
                    actual += cell[index].innerHTML;
                }
            }
            assert.equal(actual, 'O');
        });
        it('should show `O` in properly cell ((1; 3) or (3; 1))', function () {
            newGame();
            const cellX1 = document.getElementById('1');
            cellX1.click();          
            if (document.getElementById('2').innerHTML === '') {
                const cellX2 = document.getElementById('2');
                cellX2.click();
                const cellO = document.getElementById('3');
                assert.equal(cellO.innerHTML, 'O');
            } else {
                const cellX2 = document.getElementById('4');
                cellX2.click();
                const cellO = document.getElementById('7');
                assert.equal(cellO.innerHTML, 'O');
            }
        });
    });
});
