mocha.setup('bdd');
const cellClick = (coords) =>
    document.getElementById(coords).parentNode.click();

describe('cross-zero', () => {
    var config = [
        // по горизонтали
        { sequence: ["0-0", "1-0", "0-1", "1-1", "0-2"], result: "x" },
        { sequence: ["1-1", "2-2", "0-2", "2-0", "1-0", "2-1"], result: "o" },
        // вертикали
        { sequence: ["0-0", "1-0", "0-1", "1-1", "0-2"], result: "x" },
        { sequence: ["0-0", "1-1", "0-2", "0-1", "1-2", "2-1"], result: "o" },
        // по диагонали
        { sequence: ["0-0", "0-1", "1-1", "0-2", "2-2"], result: "x" },
        { sequence: ["2-2", "0-2", "1-2", "1-1", "2-1", "2-0"], result: "o" },
        // ничья
        { sequence: ["0-0", "0-1", "0-2", "2-0", "2-1", "2-2", "1-0", "1-1", "1-2"], result: "ничья" },
        // клики по уже занятым клеткам
        { sequence: ["0-0", "0-1", "0-0", "1-1", "0-2", "0-0", "0-1", "2-2"], result: "x" },
        { sequence: ["0-0", "0-1", "0-2", "0-0", "0-2", "2-0", "2-1", "2-0", "2-2", "1-0", "1-1", "1-2"], result: "ничья" },
        // незавершенная игра
        { sequence: ["0-0"], result: "" },
        { sequence: ["0-0", "1-1", "2-2"], result: "" },
    ];
    var clearButton = document.getElementById("clear");
    var winnerElement = document.getElementById("winner");
    beforeEach(clear);
    after(clear);

    config.forEach((_case) => {
        it(`should be: '${_case.result}${`' for sequence: ${_case.sequence}`}`, () => {
            initField(_case.sequence);
            var actual = winnerMessage();
            var expected = _case.result;
            chai.assert.equal(actual, expected);
        });
    });

    function clear() {
        clearButton.dispatchEvent(new Event("click"));
    }

    function initField(sequence) {
        for (var i = 0; i < sequence.length; i++) {
            cellClick(sequence[i]);
        }
    }

    function winnerMessage() {
        return winnerElement.innerText;
    }
});