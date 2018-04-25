const newGame = document.getElementById('new-game');
const areaForResult = document.getElementById('game-state');


function clickCell(row, column) {
    const input = document.getElementById(row + '-' + column);
    input.parentNode.click();
}

function setField(state) {
    const xs = [];
    const os = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === 'x') {
                xs.push([i, j]);
            } else if (state[i][j] === 'o') {
                os.push([i, j]);
            } else if (state[i][j] !== '') {
                throw new Error('Поле не может содержать символы, кроме "x", "o", ""');
            }
        }
    }
    if ([0, 1].indexOf(xs.length - os.length) === -1) {
        throw new Error('Крестиков и ноликов должно быть одинаковое количество или крестик на 1 больше');
    }
    while(os.length) {
        clickCell(...xs.pop());
        clickCell(...os.pop());
    }
    if (xs.length) {
        clickCell(...xs.pop());
    }
}


describe('cross-zero', () => {
    beforeEach(() => {
        newGame.click();
    });

    after(function() {
        newGame.click();
    });

    describe('Победа по горизонтале', () => {
        const testCases = [
            {
                state: [['x', 'x', 'o'], ['o', 'o', 'o'], ['x', 'x', '']],
                result: 'Победили o'
            },
            {
                state: [['o', '', 'o'], ['o', 'x', 'o'], ['x', 'x', 'x']],
                result: 'Победили x'
            },
            {
                state: [['x', 'x', 'x'], ['o', 'o', 'x'], ['o', '', '']],
                result: 'Победили x'
            }
        ];
        testCases.forEach(testCase => {
            const stringTable = testCase.state.map(row => row.join('|')).join('  |  ');
            it(`${stringTable}`, () => {
                setField(testCase.state);
                chai.assert.equal(areaForResult.textContent, testCase.result);
            })
        })
    });

    describe('Победа по вертикале', () => {
        const testCases = [
            {
                state: [['x', '', ''], ['x', 'o', 'o'], ['x', 'x', 'o']],
                result: 'Победили x'
            },
            {
                state: [['x', 'o', 'x'], ['x', 'o', ''], ['', 'o', '']],
                result: 'Победили o'
            },
            {
                state: [['o', '', 'x'], ['o', '', 'x'], ['', '', 'x']],
                result: 'Победили x'
            }
        ];
        testCases.forEach(testCase => {
            const stringTable = testCase.state.map(row => row.join('|')).join('  |  ');
            it(`${stringTable}`, () => {
                setField(testCase.state);
                chai.assert.equal(areaForResult.textContent, testCase.result);
            })
        })
    });

    describe('Победа по диагонале', () => {
        const testCases = [
            {
                state: [['x', 'o', ''], ['o', 'x', ''], ['o', '', 'x']],
                result: 'Победили x'
            },
            {
                state: [['x', '', 'o'], ['x', 'o', ''], ['o', 'x', '']],
                result: 'Победили o'
            }
        ];
        testCases.forEach(testCase => {
            const stringTable = testCase.state.map(row => row.join('|')).join('  |  ');
            it(`${stringTable}`, () => {
                setField(testCase.state);
                chai.assert.equal(areaForResult.textContent, testCase.result);
            })
        })
    });

    describe('Ничья', () => {
        const testCases = [
            {
                state: [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', 'x']],
                result: 'Ничья'
            },
            {
                state: [['o', 'x', 'o'], ['o', 'x', 'x'], ['x', 'o', 'x']],
                result: 'Ничья'
            }
        ];
        testCases.forEach(testCase => {
            const stringTable = testCase.state.map(row => row.join('|')).join('  |  ');
            it(`${stringTable}`, () => {
                setField(testCase.state);
                chai.assert.equal(areaForResult.textContent, testCase.result);
            })
        })
    });

    describe('Идёт игра', () => {
        const testCases = [
            {
                state: [['', '', ''], ['', '', ''], ['', '', '']],
                result: ''
            },
            {
                state: [['o', 'x', ''], ['', 'x', 'o'], ['', 'o', 'x']],
                result: ''
            }
        ];
        testCases.forEach(testCase => {
            const stringTable = testCase.state.map(row => row.join('|')).join('  |  ');
            it(`${stringTable}`, () => {
                setField(testCase.state);
                console.log(testCase.result, areaForResult.textContent);
                chai.assert.equal(areaForResult.textContent, testCase.result);
            })
        })
    });
});
