const btnNewGame = document.getElementById('new-game');

function clickT(num) {
        let cell = document.getElementsByTagName('td');
        num.forEach(element => {
            cell[element - 1].click();
        });        
    }

describe('cross-zero', () => {
    beforeEach(() => {
        btnNewGame.click();
    });
    it('should return 1 if "X" player has won in horizontal', () => {
        clickT([1, 5, 2, 4, 6, 7, 8 , 9, 3]);
        var actual = winner();
        chai.expect(actual).to.equal(1);        
    });
    it('should return 1 if "X" player has won in vertical', () => {
        clickT([2, 1, 5, 4, 8]);
        var actual = winner();
        chai.expect(actual).to.equal(1);
    });
    it('should return 1 if "X" player has won in diagonal', () => {
        clickT([1, 6, 5, 7, 9 ]);
        var actual = winner();
        chai.expect(actual).to.equal(1);
    });
    it('should return 2 if "O" player has won in horizontal', () => {
        clickT([1, 4, 7, 5, 2, 6 ]);
        var actual = winner();
        chai.expect(actual).to.equal(2);
    });
    it('should return 2 if "O" player has won in vertical', () => {
        clickT([7, 5, 1, 2, 3, 4, 6, 8 ]);
        var actual = winner();
        chai.expect(actual).to.equal(2);
    });
    it('should return 2 if "O" player has won in diagonal', () => {
        clickT([3, 1, 2, 5, 6, 9]);
        var actual = winner();
        chai.expect(actual).to.equal(2);
    });
    it('should return 0 if no one won', () => {
        clickT([1, 2, 4, 5, 3, 6, 8, 7, 9]);
        var actual = winner();
        chai.expect(actual).to.equal(0);
    });
});
