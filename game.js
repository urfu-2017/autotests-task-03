function Game(rows, columns) {
    if (rows < 3) {
        throw new Error('rows value cannot be less then 3');
    };
    
    if (columns < 3) {
        throw new Error('columns value cannot be less then 3');
    };

    const board = new Array(rows).fill(new Array(columns).fill(0))
        .map(array => array.slice());

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
            this._pickCell(playerMark, x, y);
        },
        _pickCell(mark, x, y) {
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
