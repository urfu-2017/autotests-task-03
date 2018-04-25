function cellClick(x, y) {
    document.getElementById(x + '-' + y).parentNode.click();
}
const button = document.getElementById('restart');
const winCrossText = "Победил первый игрок! (крестики)";
const winZeroText = "Победил второй игрок! (нолики)"

var win = document.getElementById('winner');


describe('cross-zero', () => {
    it('should win cross when first player has won in horizontal', () => {
        button.click();
        cellClick(0, 0);
        cellClick(1, 0);
        cellClick(0, 1);
        cellClick(1, 1);
        cellClick(0, 2);
        chai.assert.equal(win.innerHTML, winCrossText);
    });
    it('should win zero when second player has won in vertical', () => {
        button.click();
        cellClick(1, 1);
        cellClick(0, 2);
        cellClick(0, 1);
        cellClick(2, 2);
        cellClick(1, 0);
        cellClick(1, 2);
        chai.assert.equal(win.innerHTML, winZeroText);
    });
    it('should win zero when second player has won in diagonal', () => {
        button.click();
        cellClick(0, 0);
        cellClick(0, 2);
        cellClick(0, 1);
        cellClick(1, 1);
        cellClick(1, 0);
        cellClick(2, 0);
        chai.assert.equal(win.innerHTML, winZeroText);
    });
    it('should win cross at the last possible stroke', () => {
        button.click();
        cellClick(1, 1);
        cellClick(0, 2);
        cellClick(1, 2);
        cellClick(1, 0);
        cellClick(2, 1);
        cellClick(0, 1);
        cellClick(0, 0);
        cellClick(2, 0);
        cellClick(2, 2);
        chai.assert.equal(win.innerHTML, winCrossText);
    });
    it('should win zero at the last possible stroke of second player', () => {
        button.click();
        cellClick(1, 0);
        cellClick(0, 2);
        cellClick(1, 2);
        cellClick(1, 1);
        cellClick(2, 1);
        cellClick(0, 1);
        cellClick(0, 0);
        cellClick(2, 0);
        chai.assert.equal(win.innerHTML, winZeroText);
    });
    it('should draw at the last possible stroke', () => {
        button.click();
        cellClick(1, 0);
        cellClick(0, 1);
        cellClick(0, 2);

        cellClick(1, 1);
        cellClick(2, 1);
        cellClick(1, 2);
        cellClick(0, 0);
        cellClick(2, 0);
        cellClick(2, 2);
        chai.assert.equal(win.innerHTML, 'Ничья! Победила дружба!');
    });
});
