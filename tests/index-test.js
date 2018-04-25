const emulationClick = (x, y) =>
    document.getElementById(`${x}-${y}`).parentNode.click();
const button = document.getElementById('new_game');

describe('cross-zero', () => {
    // Этот тест можно уалить, он нужен для проверки сборки
    it('should sum digits', () => chai.assert(1 + 1, 2));
                     

    it('should return 1 if first player has won in horizontal', () => {
                button.click();
                emulationClick(0, 0);
                emulationClick(1, 0);
                emulationClick(0, 1);
                emulationClick(1, 1);
                emulationClick(0, 2);
                const actual = winner();
                chai.expect(actual).to.equal(1);
            });
    it('should return 2 if first player has won in vertical', () => {
                button.click();
                emulationClick(0, 0);
                emulationClick(0, 1);
                emulationClick(1, 0);
                emulationClick(1, 1);
                emulationClick(2, 0);
                const actual = winner();
                chai.expect(actual).to.equal(2);
            });
    it('should return 3 if first player has won in main diagonal', () => {
                button.click();
                emulationClick(0, 0);
                emulationClick(0, 1);
                emulationClick(1, 1);
                emulationClick(0, 2);
                emulationClick(2, 2);
                const actual = winner();
                chai.expect(actual).to.equal(3);
            });
    it('should return 4 if first player has won in collateral diagonal', () => {
                button.click();
                emulationClick(0, 2);
                emulationClick(0, 1);
                emulationClick(1, 1);
                emulationClick(0, 0);
                emulationClick(2, 0);
                const actual = winner();
                chai.expect(actual).to.equal(4);
            });
    it('should return 5 if second player has won in horizontal', () => {
                button.click();
                emulationClick(1, 0);
                emulationClick(0, 0);
                emulationClick(1, 1);
                emulationClick(0, 1);
                emulationClick(2, 0);
                emulationClick(0, 2);
                const actual = winner();
                chai.expect(actual).to.equal(5);
            });      
    it('should return 6 if second player has won in vertical', () => {
                button.click();
                emulationClick(0, 0);
                emulationClick(0, 1);
                emulationClick(1, 0);
                emulationClick(1, 1);
                emulationClick(0, 2);
                emulationClick(2, 1);
                const actual = winner();
                chai.expect(actual).to.equal(6);
            }); 
    it('should return 7 if second player has won in main diagonal', () => {
                button.click();
                emulationClick(0, 1);
                emulationClick(0, 0);
                emulationClick(0, 2);
                emulationClick(1, 1);
                emulationClick(1, 2);
                emulationClick(2, 2);
                const actual = winner();
                chai.expect(actual).to.equal(7);
            });
    it('should return 8 if second player has won in collateral diagonal', () => {
                button.click();
                emulationClick(0, 1);
                emulationClick(0, 2);
                emulationClick(2, 2);
                emulationClick(1, 1);
                emulationClick(0, 0);
                emulationClick(2, 0);
                const actual = winner();
                chai.expect(actual).to.equal(8);
            });
    it('should return 9 if game not end', () => {
                button.click();
                emulationClick(0, 1);
                emulationClick(1, 1);
                const actual = winner();
                chai.expect(actual).to.equal(9);
            }); 
    it('should return 0 if tie', () => {
                button.click();
                emulationClick(1, 1);
                emulationClick(0, 0);
                emulationClick(2, 2);
                emulationClick(0, 2);
                emulationClick(0, 1);
                emulationClick(2, 1);
                emulationClick(1, 2);
                emulationClick(1, 0);
                emulationClick(2, 0);
                const actual = FullField();
                chai.expect(actual).to.equal(0);
            });             
});
