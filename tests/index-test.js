describe('cross-zero', () => {

    function clickCell(id) {
    	document.getElementById(id).parentNode.click();
    }
    function getWinnerMsg() {
        return document.getElementById("winmsg").innerText
    }
    function startNewGameByButtonClicking() {
        return document.getElementById("startGameButton").click()
    }
    // две линии по горизонтале, x просто первее закончит
    it('should win x - horizontal', () => {
        startNewGameByButtonClicking()
        clickCell("0-0");
        clickCell("1-0");
        clickCell("0-1");
        clickCell("1-1");
        clickCell("0-2");
        clickCell("1-2");
        chai.assert.equal(getWinnerMsg(), 'x');
    });
    // две линии по горизонтале, x на 2ом шаге ставит на другую линию, отдавая победу o
    it('should win o horizontal', () => {
        startNewGameByButtonClicking()
        clickCell("0-0");
        clickCell("1-0");
        clickCell("2-1");
        clickCell("1-1");
        clickCell("0-2");
        clickCell("1-2");
        chai.assert.equal(getWinnerMsg(), 'o');
    });

    it('should win x vertical', () => {
        startNewGameByButtonClicking()
        clickCell("0-0");
        clickCell("1-1");
        clickCell("2-0");
        clickCell("0-1");
        clickCell("1-0");
        clickCell("2-2");
        chai.assert.equal(getWinnerMsg(), 'x');
    });

    it('should win o vertical', () => {
        startNewGameByButtonClicking()
        clickCell("0-0");
        clickCell("1-0");
        clickCell("2-1");
        clickCell("1-1");
        clickCell("2-2");
        clickCell("1-2");
        chai.assert.equal(getWinnerMsg(), 'o');
    });

    it('should win x diagonal', () => {
        startNewGameByButtonClicking()
        clickCell("0-0");
        clickCell("0-1");
        clickCell("1-0");
        clickCell("1-1");
        clickCell("2-0");
        chai.assert.equal(getWinnerMsg(), 'x');
    });

    it('without winners', () => {
        startNewGameByButtonClicking()
        clickCell("0-0");
        clickCell("0-1");
        clickCell("0-2");
        clickCell("1-1");
        clickCell("1-0");
        clickCell("2-0");
        clickCell("2-1");
        clickCell("2-2");
        clickCell("1-2");
        chai.assert.equal(getWinnerMsg(), 'ничья');
    });
});
