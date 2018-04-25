function Game() {
    return {
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        nextMark: 'x',

        switchMark() {
            this.nextMark = this.nextMark === 'x' ? 'o': 'x';
        },

        getState() {
            return this.board;
        },

        acceptUserMove(x, y) {
            if (this.board[x][y]) {
                throw new Error('cell is marked');
            }
            this.board[x][y] = this.nextMark;
            this.switchMark();

            return this.board;
        },

        getMark() {
            return this.nextMark;
        },

        findWinner(board = this.board) {
            const win = isWinner(board);
            if(win) {
                return this.nextMark === 'x' ? 'o': 'x';
            }
        }
    }
}

