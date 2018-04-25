function Game(rows, columns) {
    if (rows < 3) {
        throw new Error('rows value cannot be less then 3');
    }
    
    if (columns < 3) {
        throw new Error('columns value cannot be less then 3');
    }
//    const row = new Array(columns).fill(0);
    const row = [];
    for (let i = 0; i < columns; ++i) {
        row.push(0);
    }
    const board = [];
    for (let i = 0; i < rows; ++i) {
        board.push(row.slice());
    };
    const needToWin = Math.min(rows, columns, 5);

    return {
        boardDescribe: {
            rows,
            columns,
            needToWin,
            board
        },
        getBoard() {
            return this.boardDescribe;
        },
        fillCell(playerMark, cellSite) {
            const x = cellSite[0] - 1;
            const y = cellSite[1] - 1;
            this.pickCell(playerMark, x, y);
        },
        pickCell(mark, x, y) {
            if (!this.boardDescribe.board[x][y]) {
                this.boardDescribe.board[x][y] = mark;                
            }
        },
        checkWin(playerMark) {
            return checkWinner(
                this.boardDescribe.board, 
                playerMark, 
                this.boardDescribe.needToWin
            );
        }
    };
};