describe('cross-zero', () => {
    beforeEach(() => createGame());
    chai.should();
    describe('testing logic', () => {
        it('Should return empty board', () => {
            const board = game.getState()
            chai.expect(board).to.deep.equal([
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]);
        });

        it('should write `x` in the first cell', () => {
            const x = 0, y = 0;
            game.acceptUserMove(x, y);
            const board = game.getState();
            chai.expect(board[x][y]).to.equal('x')
        });

        it('should write symbol `o` in the middle cell in the second step', () => {
            game.acceptUserMove(0, 0);
            const x = 1, y = 1;
            game.acceptUserMove(x, y);
            const board = game.getState();
            chai.expect(board[x][y]).to.equal('o')
        });

        it('should throw an exception if cell is already marked', () => {
            const x = 2, y = 2
            game.acceptUserMove(x, y);
            chai.expect(game.acceptUserMove.bind(game, x, y)).to.throw('cell is marked')
        });

        it('should return `x` if x won',() => {
            let board = [ ['x','o',''],
                ['x','o',''],
                ['x','','']
            ];

            game.switchMark();
            chai.expect(game.findWinner(board)).to.equal('x');
        });

        it('should returns `o` if o won',() => {
            let board = [ ['x','o',''],
                ['x','o','x'],
                ['','o','']
            ];

            chai.expect(game.findWinner(board)).to.equal('o');
        });
    })

    describe('testing interface', () => {
        it("should have nine div squares", () => {
            const board = document.querySelector('.board');
            chai.expect(board.childNodes.length).to.equal(9);
        });

        it('should check if clicked cell is marked', () => {
            const mark = sinon.spy(game, 'acceptUserMove');
            document.querySelector('.cell').click();
            mark.should.have.been.called;
        });

        it('should check if it`s new game after pressing the button', () => {
            const newGame = sinon.spy(document, 'createElement');
            document.querySelector('button').click();
            newGame.should.have.been.called;
        });
    })


    describe('integration', ()=> {

        it('should return empty board in browser', () => {
            document.querySelector('.button').click();
            const board = game.getState()
            chai.expect(board).to.deep.equal([
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]);
        });

        it('should write `x` in the first cell in browser', () => {
            document.querySelector('.cell').click();
            const board = game.getState();
            chai.expect(board[0][0]).to.equal('x');
        });

        it('should write symbol `o` in the middle cell in browser', () => {
            document.querySelector('.cell').click();
            document.getElementsByClassName('cell')[4].click();
            const board = game.getState();
            chai.expect(board[1][1]).to.equal('o')
        });

        it('should return `x` if x won',() => {
            document.getElementsByClassName('cell')[0].click();
            document.getElementsByClassName('cell')[1].click();
            document.getElementsByClassName('cell')[3].click();
            document.getElementsByClassName('cell')[4].click();
            document.getElementsByClassName('cell')[6].click();
            const board = game.getState();
            chai.expect(game.findWinner(board)).to.equal('x');
        });

        it('should returns `o` if o won',() => {
            document.getElementsByClassName('cell')[0].click();
            document.getElementsByClassName('cell')[1].click();
            document.getElementsByClassName('cell')[3].click();
            document.getElementsByClassName('cell')[4].click();
            document.getElementsByClassName('cell')[2].click();
            document.getElementsByClassName('cell')[7].click();
            const board = game.getState();

            chai.expect(game.findWinner(board)).to.equal('o');
        });

        it('should have nine div squares', () => {
            const board = document.querySelector('.board');
            const boardArray = game.getState();
            let sum = 0;
            for(let i = 0; i < boardArray.length; i++) {
                for(let j = 0; j < boardArray.length; j++) {
                    sum++;
                }
            }
            chai.expect(sum).to.equal(9);
        });

        it('should check that marked cell can`t be remarked', () => {
            document.querySelector('.cell').click();
            document.querySelector('.cell').click();
            const boardArray = game.getState();
            chai.expect(boardArray[0][0]).to.equal('x');
        });
    })
});
