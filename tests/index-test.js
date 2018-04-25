const cellClick = (x, y) =>
    document.getElementById(`${x}-${y}`).parentNode.click();


describe('getWinner', () => {
    beforeEach(() => {
        newGameButton.click();
    });

    it('should return null if the game is not over', () => {
        cellClick(0, 0);
        cellClick(0, 1);

        const actual = getWinner();

        chai.expect(actual).to.equal(null);
    });

    it('should return null if the field is empty', () => {
        const actual = getWinner();
        chai.expect(actual).to.equal(null);
    });

    it('should return `x` if first player has won in vertical case', () => {
        cellClick(0, 0);
        cellClick(1, 0);
        cellClick(0, 1);
        cellClick(1, 1);
        cellClick(0, 2);
        const actual = getWinner();
        chai.expect(actual).to.equal('x');
    });

    it('should return `x` if first player has won in horizontal case', () => {
        cellClick(0, 0);
        cellClick(0, 1);
        cellClick(1, 0);
        cellClick(1, 1);
        cellClick(2, 0);
        const actual = getWinner();
        chai.expect(actual).to.equal('x');
    });

    it('should return `x` if first player has won in diagonal case', () => {
        cellClick(0, 0);
        cellClick(1, 0);
        cellClick(1, 1);
        cellClick(2, 1);
        cellClick(2, 2);
        const actual = getWinner();
        chai.expect(actual).to.equal('x');
    });

    it('should return `o` if second player has won in vertical case', () => {
        cellClick(0, 0);
        cellClick(1, 0);
        cellClick(0, 1);
        cellClick(1, 1);
        cellClick(2, 2);
        cellClick(1, 2);
        const actual = getWinner();
        chai.expect(actual).to.equal('o');
    });

    it('should return `o` if second player has won in horizontal case', () => {
        cellClick(0, 1);
        cellClick(0, 2);
        cellClick(1, 1);
        cellClick(1, 2);
        cellClick(2, 0);
        cellClick(2, 2);
        const actual = getWinner();
        chai.expect(actual).to.equal('o');
    });

    it('should return `o` if second player has won in diagonal case', () => {
        cellClick(0, 1);
        cellClick(2, 0);
        cellClick(0, 0);
        cellClick(1, 1);
        cellClick(2, 2);
        cellClick(0, 2);
        const actual = getWinner();
        chai.expect(actual).to.equal('o');
    });

    after(() => {
        newGameButton.click();
    })
});
