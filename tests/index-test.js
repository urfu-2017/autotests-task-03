describe('tic-tac-toe-testing', () => {
    describe('game-logic (factory`s methods & check winner methods)', () => {
        beforeEach(() => game = new Game(3, 3));
        it('should immediately create big game field', () => {
            const hardGame = new Game(10, 10);
            const sample = {
                rows: 10,
                columns: 10,
                needToWin: 5,
                board: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            };

            chai.expect(hardGame.getBoard()).deep.equal(sample);
        });
        
        it('should immediately create game field, where rows > columns', () => {
            const tallGame = new Game(10, 3);
            const sample = {
                rows: 10,
                columns: 3,
                needToWin: 3,
                board: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            };

            chai.expect(tallGame.getBoard()).deep.equal(sample);
        });
        
        it('should immediately create game field, where columns > rows', () => {
            const longGame = new Game(3, 10);
            const sample = {
                rows: 3,
                columns: 10,
                needToWin: 3,
                board: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            };

            chai.expect(longGame.getBoard()).deep.equal(sample);
        });

        it('should throw Error, if `rows` value less then 3', () => {
            const createBadGame = () => new Game(1, 3);

            chai.expect(createBadGame).to.throw(/rows value cannot be less then 3/);
        });

        it('should throw Error, if `columns` value less then 3', () => {
            const createBadGame = () => new Game(3, 1);

            chai.expect(createBadGame).to.throw(/columns value cannot be less then 3/);
        });

        it('should return updated board state after tic/tac move', () => {
            game.fillCell(1, [3, 3]);

            const boardWithFilledCell = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 1]
            ];

            chai.expect(game.getBoard().board).deep.equal(boardWithFilledCell);
        });

        it('shouldn\'t accept move to filled cell', () => {
            game.fillCell(1, [3, 3]);
            game.fillCell(2, [3, 3]);

            const rightFilledBoard = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 1]
            ];

            chai.expect(game.getBoard().board).deep.equal(rightFilledBoard);
        })

        describe('test winnerCheck', () => {
            describe('test sequenceTester', () => {
                const tests = [
                    {
                        sequence: [0, 1, 0, 1, 0],
                        playerMark: 1,
                        needToWin: 1,
                        expectedValue: true,
                        description: 'classic positive test'
                    },
                    {
                        sequence: [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: false,
                        description: 'classic negative test'
                    },
                    {
                        sequence: [],
                        playerMark: 5,
                        needToWin: 3,
                        expectedValue: false,
                        description: 'test with empty array'
                    },
                    {
                        sequence: [1, 2, 1, 1, 1, 6, 7],
                        playerMark: 5,
                        needToWin: 3,
                        expectedValue: false,
                        description: 'test with playerMark that not exist in array'
                    },
                    {
                        sequence: [1, 2, 5, 5, 5, 6, 7],
                        playerMark: 1,
                        needToWin: 0,
                        expectedValue: true,
                        description: 'test with needToWin equal 0'
                    },
                    {
                        sequence: [0, 1, '1', 1, 0],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: false,
                        description: 'test with playerMark that wrapped in string'
                    },
                    {
                        sequence: [[1], {1:1}, '1', 'privet', 5, 1],
                        playerMark: 1,
                        needToWin: 1,
                        expectedValue: true,
                        description: 'test with strange elements in array'
                    },
                    {
                        sequence: [1, 1, 1, 1],
                        playerMark: 1,
                        needToWin: 4,
                        expectedValue: true,
                        description: 'test without 0 in array'
                    }
                ];
                tests.forEach(({ sequence, playerMark, needToWin, expectedValue, description }) =>
                    it(description, () => {
                        const actual = checkSequence(sequence, playerMark, needToWin);

                        chai.expect(actual).to.equal(expectedValue);
                    })
                );
            });
            const commonTests = [
                {
                    array: [
                        [1]
                    ],
                    playerMark: 1,
                    needToWin: 1,
                    expectedValue: true,
                    description: 'unit-element matrix with 1'
                },
                {
                    array: [
                        [0]
                    ],
                    playerMark: 1,
                    needToWin: 1,
                    expectedValue: false,
                    description: 'unit-element matrix with 0'
                },
                {
                    array: [
                        [2]
                    ],
                    playerMark: 1,
                    needToWin: 1,
                    expectedValue: false,
                    description: 'unit-element matrix without playerMark nd 0'
                },
                {
                    array: [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                    ],
                    playerMark: 1,
                    needToWin: 0,
                    expectedValue: true,
                    description: '3x3 matrix with 0'
                },
                {
                    array: [
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    playerMark: 1,
                    needToWin: 1,
                    expectedValue: true,
                    description: 'big matrix with only 1 marker, when need 1'
                }
            ];
            describe('test checkRows', () => {
                const tests = [
                    {
                        array: [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: '3x3 matrix with filled row'
                    },
                    {
                        array: [
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'tall matrix with filled row'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [1, 1, 1, 1, 1, 1, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 8,
                        expectedValue: true,
                        description: 'long matrix with filled row'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 1, 1, 1, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: true,
                        description: 'big matrix with necessary cound consecutive marks in one row'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [1, 1, 1, 1, 0, 1],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: false,
                        description: 'matrix with 5 filled cells in one row, but not contract'
                    },
                    {
                        array: [
                            [0, 'wqfw', 0, 'qwfwfqwg'],
                            [0, 'wqfqwf', 0, {w: 1}],
                            [1, 1, 1, 1],
                            ['qwf', 'wef', 0, 0]
                            [0, [1], 'qwf', 0]
                        ],
                        playerMark: 1,
                        needToWin: 4,
                        expectedValue: true,
                        description: 'matrix with unexpected marks, besides playerMarks'
                    }
                ];
                const concatTests = [];
                commonTests.forEach(test => concatTests.push(test));
                tests.forEach(test => concatTests.push(test));
                concatTests.forEach(({ array, playerMark, needToWin, expectedValue, description }) =>
                    it(`should return ${expectedValue} for ${description}`, () => {
                        const actual = checkRows(array, playerMark, needToWin);

                        chai.expect(actual).to.equal(expectedValue);
                    })
                );
            });
            describe('test checkColumns', () => {
                const tests = [
                    {
                        array: [
                            [0, 1, 0],
                            [0, 1, 0],
                            [0, 1, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: '3x3 matrix with filled column'
                    },
                    {
                        array: [
                            [0, 0, 1],
                            [0, 0, 1],
                            [0, 0, 1],
                            [0, 0, 1],
                            [0, 0, 1],
                            [0, 0, 1],
                            [0, 0, 1]
                        ],
                        playerMark: 1,
                        needToWin: 7,
                        expectedValue: true,
                        description: 'tall matrix with filled column'
                    },
                    {
                        array: [
                            [0, 0, 1, 0, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'long matrix with filled column'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: true,
                        description: 'big matrix with necessary count consecutive marks in one column'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 1, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: false,
                        description: 'matrix with 5 filled cells in one column, but not contract'
                    },
                    {
                        array: [
                            [0, 'wqfw', 1, 'qwfwfqwg'],
                            [0, 'wqfqwf', 1, {w: 1}],
                            ['wqf', 8, 1, 0],
                            ['qwf', 'wef', 1, 0],
                            [0, [1], 1, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: true,
                        description: 'matrix with unexpected marks, besides playerMarks'
                    }
                ];
                const concatTests = [];
                commonTests.forEach(test => concatTests.push(test));
                tests.forEach(test => concatTests.push(test));
                concatTests.forEach(({ array, playerMark, needToWin, expectedValue, description }) =>
                    it(`should return ${expectedValue} for ${description}`, () => {
                        const actual = checkColumns(array, playerMark, needToWin);

                        chai.expect(actual).to.equal(expectedValue);
                    })
                );
            });
            describe('test checkMajorDiagonals', () => {
                const tests = [
                    {
                        array: [
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: '3x3 matrix with filled major diagonals'
                    },
                    {
                        array: [
                            [0, 0, 0],
                            [0, 0, 0],
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1],
                            [0, 0, 0],
                            [0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'tall matrix with filled major diagonals'
                    },
                    {
                        array: [
                            [0, 0, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 1, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'long matrix with filled major diagonals'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: true,
                        description: 'big matrix with necessary count' +
                        ' consecutive marks in one major diagonals'
                    },
                    {
                        array: [
                            [1, 0, 0, 0, 0, 0],
                            [0, 1, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 1]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: false,
                        description: 'matrix with 5 filled cells' +
                        ' in one major diagonals, but not contract'
                    },
                    {
                        array: [
                            [9, 'wqfw', 3, 'qwfwfqwg'],
                            [0, 'wqfqwf', 0, {w: 1}],
                            [1, 8, 'wege', 5],
                            ['qwf', 1, 'wef', 0],
                            [0, [1], 1, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix with unexpected marks, besides playerMarks'
                    }
                ];
                const concatTests = [];
                commonTests.forEach(test => concatTests.push(test));
                tests.forEach(test => concatTests.push(test));
                concatTests.forEach(({ array, playerMark, needToWin, expectedValue, description }) =>
                    it(`should return ${expectedValue} for ${description}`, () => {
                        const actual = checkMajorDiagonals(array, playerMark, needToWin);

                        chai.expect(actual).to.equal(expectedValue);
                    })
                );
            });
            describe('test checkMinorDiagonals', () => {
                const tests = [
                    {
                        array: [
                            [0, 0, 1],
                            [0, 1, 0],
                            [1, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: '3x3 matrix with filled minor diagonals'
                    },
                    {
                        array: [
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 1],
                            [0, 1, 0],
                            [1, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'tall matrix with filled minor diagonals'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 1, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'long matrix with filled minor diagonals'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 1, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: true,
                        description: 'big matrix with necessary count' +
                        ' consecutive marks in one minor diagonals'
                    },
                    {
                        array: [
                            [0, 0, 0, 0, 0, 0, 0, 1],
                            [0, 0, 0, 0, 0, 0, 1, 0],
                            [0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 5,
                        expectedValue: false,
                        description: 'matrix with 5 filled cells' +
                        ' in one minor diagonals, but not contract'
                    },
                    {
                        array: [
                            [9, 'wqfw', 3, 'qwfwfqwg'],
                            [0, 'wqfqwf', 0, {w: 1}],
                            ['qewe', 8, 1, 5],
                            ['qwf', 1, 'wef', 0],
                            [1, [1], 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix with unexpected marks, besides playerMarks'
                    }
                ];
                const concatTests = [];
                commonTests.forEach(test => concatTests.push(test));
                tests.forEach(test => concatTests.push(test));
                concatTests.forEach(({ array, playerMark, needToWin, expectedValue, description }) =>
                    it(`should return ${expectedValue} for ${description}`, () => {
                        const actual = checkMinorDiagonals(array, playerMark, needToWin);

                        chai.expect(actual).to.equal(expectedValue);
                    })
                );
            });
            describe('test checkWinner', () => {
                const tests = [
                    {
                        array: [
                            [1, 1, 1],
                            [0, 0, 0],
                            [0, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix that is returned true by checkRows function only'
                    },
                    {
                        array: [
                            [1, 0, 0],
                            [1, 0, 0],
                            [1, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix that is returned true by checkColumns function only'
                    },
                    {
                        array: [
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix that is returned true by checkMajorDiagonals function only'
                    },
                    {
                        array: [
                            [0, 0, 1],
                            [0, 1, 0],
                            [1, 0, 0]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix that is returned true by checkMinorDiagonals function only'
                    },
                    {
                        array: [
                            [1, 1, 1],
                            [1, 1, 0],
                            [1, 0, 1]
                        ],
                        playerMark: 1,
                        needToWin: 3,
                        expectedValue: true,
                        description: 'matrix that is returned true by all check function'
                    }
                ];
                tests.forEach(({ array, playerMark, needToWin, expectedValue, description }) =>
                    it(`should return ${expectedValue} for ${description}`, () => {
                        const actual = checkWinner(array, playerMark, needToWin);

                        chai.expect(actual).to.equal(expectedValue);
                    })
                );
            });
        });
        
        describe('testing game with winner method', () => {
            it('should return true for appropriate combinations for 1st palyer', () => {
                game.fillCell(1, [1, 1]);
                game.fillCell(1, [2, 2]);
                game.fillCell(1, [3, 3]);

                chai.expect(game.checkWin(1)).to.be.true;
            });
        });
    });
    chai.should();
    describe('testing creator\'s functions', () => {
        afterEach(() => {
            document.querySelector('.setting__rows').value = 3;
            document.querySelector('.setting__columns').value = 3;
            createNewGame();
        });
        it('createNewGame should call createCell', () => {
            const createCellSpy = sinon.spy(document, 'createElement');
            document.querySelector('.setting__rows').value = 3;
            document.querySelector('.setting__columns').value = 3;
            createNewGame();
            createCellSpy.should.have.been.callCount(10);
        })
        it('createNewGame should will be sensitive to inputs (rows, columns)', () => {
            document.querySelector('.setting__rows').value = 10;
            document.querySelector('.setting__columns').value = 10;
            createNewGame();
            const cells = document.querySelectorAll('.cell');
            chai.expect(cells.length).to.equal(100);
        });
        it('createNewGame should create handler for next move with value `0`', () => {
            createNewGame();
            const nextMove = document.querySelector('.next-move').value;
            chai.expect(Number(nextMove)).to.equal(0);
        });
        it('immediately after start new game document shouldn\'t `winner` class', () => {
            const event = new Event('click');
            document.querySelectorAll('.cell')[0].dispatchEvent(event);
            document.querySelectorAll('.cell')[3].dispatchEvent(event);
            document.querySelectorAll('.cell')[6].dispatchEvent(event);
            createNewGame();
            const winnerClassCount = document.querySelectorAll('.winner').length;
            chai.expect(Number(winnerClassCount)).to.equal(0);
        });
        it('createNewGame should give good classes (`cell_i_j` template) for cells', () => {
            const rows = Math.floor(Math.random() * 10 + 3);
            const columns = Math.floor(Math.random() * 10 + 3);
            document.querySelector('.setting__rows').value = rows;
            document.querySelector('.setting__columns').value = columns;
            createNewGame();
            for (let i = 0; i < rows; ++i) {
                for (let j = 0; j < columns; ++j) {
                    const cell = document.querySelectorAll('.cell')[i*columns+j];
                    const className = cell.classList[1];
                    chai.expect(className).to.equal(`cell_${i+1}_${j+1}`);
                };
            };
        });
        it('should create good description for game', () => {
            const description = document.querySelector('.description');
            const rows = document.querySelector('.setting__rows');
            const columns = document.querySelector('.setting__columns');
            rows.value = 3;
            columns.value = 3;
            createNewGame();
            chai.expect(description.firstChild.textContent)
                .to.equal('Для победы необходимо занять 3 ячейки подряд');
            rows.value = 5;
            columns.value = 5;
            createNewGame();
            chai.expect(description.firstChild.textContent)
                .to.equal('Для победы необходимо занять 5 ячеек подряд');
            rows.value = 15;
            columns.value = 15;
            createNewGame();
            chai.expect(description.firstChild.textContent)
                .to.equal('Для победы необходимо занять 5 ячеек подряд');
            rows.value = 4;
            columns.value = 4;
            createNewGame();
            chai.expect(description.firstChild.textContent)
                .to.equal('Для победы необходимо занять 4 ячейки подряд');
        });
        it('should create div, when called createCell', () => {
            const div = createCell();
            chai.expect(div.classList[0]).to.equal('cell');
            chai.expect(div.childNodes.length).to.equal(0);
        });
        it('markCell should call fillCell method from Game', () => {
            const spy = sinon.spy(game, 'fillCell');
            const event = new Event('click');
            document.querySelector('.cell').dispatchEvent(event);
            spy.should.have.been.calledOnce;
        });
        it('should return x for even count of calls getNextMove(x,y)', () => {
            getNextMove(1, 2);
            getNextMove(1, 2);
            chai.expect(getNextMove(1, 2)).to.be.equal(1);
        });
        it('should return y for odd count of calls getNextMove(x,y)', () => {
            getNextMove(1, 2);
            getNextMove(1, 2);
            getNextMove(1, 2);
            chai.expect(getNextMove(1, 2)).to.be.equal(2);
        });
        it('should give x value to `value` attribute for '
           + 'even count of calls getNextMove(x,y)', () => {
            getNextMove(1, 2);
            getNextMove(1, 2);
            getNextMove(1, 2);
            const value = document.querySelector('.next-move').getAttribute('value');
            chai.expect(value).to.be.equal('1');
        });
        it('should give y value to `value` attribute for '
           + 'odd count of calls getNextMove(x,y)', () => {
            getNextMove(1, 2);
            getNextMove(1, 2);
            const value = document.querySelector('.next-move').getAttribute('value');
            chai.expect(value).to.be.equal('2');
        });
    });

    describe('testing function in upgrade interface', () => {
        beforeEach(() => upgradeInterface());
        after(() => upgradeInterface());
        it('should create 7 icons for each player when call upgradeInterface', () => {
            const pickers = document.querySelectorAll('.picker');
            chai.expect(pickers[0].children.length).to.be.equal(7);
            chai.expect(pickers[1].children.length).to.be.equal(7);
        });
        it('player can pick any of 7 icons in upgradable interface', () => {
            const event = new Event('click');
            document.querySelectorAll('.picker__img')[4].dispatchEvent(event);
            document.querySelectorAll('.picker__img')[15].dispatchEvent(event);
            const icon2 = document.querySelector('.first-player__mark').children[0];
            const icon1 = document.querySelector('.first-player__mark').children[0];
            const firstCell = document.querySelector('.cell');
            firstCell.dispatchEvent(event);
            chai.expect(icon1.nodeName).to.be.equal('IMG');
            chai.expect(icon2.nodeName).to.be.equal('IMG');
            chai.expect(firstCell.children[0].nodeName).to.be.equal('IMG');
            chai.expect(firstCell.children[0].classList[0]).to.be.equal('cell__mark');
        });
        it('pickIcon should set `picker__label_hidden` class for checked label', () => {
            const event = new Event('click');
            const label = document.querySelectorAll('.picker__label')[4];
            label.children[1].dispatchEvent(event);
            chai.expect(label.classList[2]).to.be.equal('picker__label_hidden');
            
        });
        it('pickIcon should set hidden-input attribute checked to `true`', () => {
            const event = new Event('click');
            const label = document.querySelectorAll('.picker__label')[4];
            label.children[1].dispatchEvent(event);
            chai.expect(label.children[0].checked).to.be.true;
        });
        it('pickIcon should set `picker__label_hidden` class for opponent checked label', () => {
            const event = new Event('click');
            const label = document.querySelector('.label4');
            const opponentLabel = document.querySelectorAll('.label4')[1];
            label.children[1].dispatchEvent(event);
            chai.expect(opponentLabel.classList[2]).to.be.equal('picker__label_hidden');
        });
    });

    describe('final interface testing', () => {
        before(() => {
            document.querySelector('.setting__rows').value = 3;
            document.querySelector('.setting__columns').value = 3;
            upgradeInterface();
            createNewGame();
        });
        afterEach(() => {
            document.querySelector('.setting__rows').value = 3;
            document.querySelector('.setting__columns').value = 3;
            upgradeInterface();
            createNewGame();
        });
        it('should be call createNewGame on click to button `Новая игра`', () => {
            const board = document.querySelector('.board');
            board.innerHTML = '';
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            chai.expect(board.children.length).to.be.equal(9 + 1);
        });
        it('should be create game with 15+1 elements in `board` class,' +
           ' when input-rows is amended', () => {
            const board = document.querySelector('.board');
            board.innerHTML = '';
            document.querySelector('.setting__rows').value = 5;
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            chai.expect(board.children.length).to.be.equal(15 + 1);
        });
        it('should be create game with 15+1 elements in `board` class,' +
           ' when input-columns is amended', () => {
            const board = document.querySelector('.board');
            board.innerHTML = '';
            document.querySelector('.setting__columns').value = 5;
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            chai.expect(board.children.length).to.be.equal(15 + 1);
        });
        it(`should insert wanted image in cell on click`, () => {
            const cell = document.querySelector('.cell');
            const e = new Event('click');
            cell.dispatchEvent(e);
            const img = cell.children[0];
            chai.expect(img.nodeName).to.be.equal('IMG');
            chai.expect(img.classList[0]).to.be.equal('cell__mark');
            const srcIcon = document.querySelector('.first-player__mark')
                .children[0]
                .getAttribute('src');
            const srcMark = img.getAttribute('src');
            chai.expect(srcIcon).to.be.equal(srcMark);
        });
        it(`should insert wanted image in cell on reclick`, () => {
            const cell = document.querySelector('.cell');
            const e = new Event('click');
            cell.dispatchEvent(e);
            cell.dispatchEvent(e);
            const img = cell.children[0];
            const srcIcon = document.querySelector('.first-player__mark')
                .children[0]
                .getAttribute('src');
            const srcMark = img.getAttribute('src');
            chai.expect(srcIcon).to.be.equal(srcMark);
        });
        it('chains of markCell, that lead to create winner img', () => {
            const event = new Event('click');
            document.querySelectorAll('.cell')[0].dispatchEvent(event);
            document.querySelectorAll('.cell')[1].dispatchEvent(event);
            document.querySelectorAll('.cell')[3].dispatchEvent(event);
            document.querySelectorAll('.cell')[4].dispatchEvent(event);
            document.querySelectorAll('.cell')[6].dispatchEvent(event);
            const winner = document.querySelectorAll('.winner').length;
            chai.expect(winner).to.be.equal(1);
        });
        it('chains of markCell, that lead to set description', () => {
            const event = new Event('click');
            document.querySelectorAll('.cell')[0].dispatchEvent(event);
            document.querySelectorAll('.cell')[1].dispatchEvent(event);
            document.querySelectorAll('.cell')[3].dispatchEvent(event);
            document.querySelectorAll('.cell')[4].dispatchEvent(event);
            document.querySelectorAll('.cell')[6].dispatchEvent(event);
            const description = document
                .querySelector('.description')
                .firstChild
                .textContent;
            chai.expect(description).to.be.equal('Победил игрок слева');
        });
        it('chains of markCell, that lead to draw', () => {
            const event = new Event('click');
            document.querySelectorAll('.cell')[0].dispatchEvent(event);
            document.querySelectorAll('.cell')[1].dispatchEvent(event);
            document.querySelectorAll('.cell')[2].dispatchEvent(event);
            document.querySelectorAll('.cell')[4].dispatchEvent(event);
            document.querySelectorAll('.cell')[3].dispatchEvent(event);
            document.querySelectorAll('.cell')[6].dispatchEvent(event);
            document.querySelectorAll('.cell')[5].dispatchEvent(event);
            document.querySelectorAll('.cell')[8].dispatchEvent(event);
            document.querySelectorAll('.cell')[7].dispatchEvent(event);
            const isWinner = document.querySelectorAll('.winner').length;
            chai.expect(isWinner).to.be.equal(0);
        });
        it('should be call createNewGame on re-select label for player', () => {
            const board = document.querySelector('.board');
            board.innerHTML = '';
            const e = new Event('click');
            document
                .querySelector('.label3')
                .children[1]
                .dispatchEvent(e);
            chai.expect(board.children.length).to.be.equal(9 + 1);
        });
        it('should be call createNewGame on re-select label for player', () => {
            const board = document.querySelector('.board');
            board.innerHTML = '';
            const e = new Event('click');
            document
                .querySelector('.label3')
                .children[1]
                .dispatchEvent(e);
            chai.expect(board.children[0].getAttribute('value')).to.be.equal('0');
            document.querySelector('.cell').dispatchEvent(e);
            chai.expect(board.children[0].getAttribute('value')).to.be.equal('3');
        });
    });
    
    // ради чего все и затевалось
    describe('testing bundle interface and logic', () => {
        beforeEach(() => {
            document.querySelector('.setting__rows').value = 3;
            document.querySelector('.setting__columns').value = 3;
            createNewGame();
        });
        after(() => {
            document.querySelector('.setting__rows').value = 3;
            document.querySelector('.setting__columns').value = 3;
            createNewGame();
        });
        it('should create array 3*[3*`0`] after create new game', () => {
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const sample = {
                rows: 3,
                columns: 3,
                needToWin: 3,
                board: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            };
            chai.expect(game.getBoard()).to.be.deep.equal(sample);
        });
        it('should create array 3*[10*`0`] after create new game', () => {
            document.querySelector('.setting__columns').value = 10;
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const sample = {
                rows: 3,
                columns: 10,
                needToWin: 3,
                board: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            };
            chai.expect(game.getBoard()).to.be.deep.equal(sample);
        });
        it('should create array 10*[3*`0`] after create new game', () => {
            document.querySelector('.setting__rows').value = 10;
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const sample = {
                rows: 10,
                columns: 3,
                needToWin: 3,
                board: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            };
            chai.expect(game.getBoard()).to.be.deep.equal(sample);
        });
        it('shouldn`t set left playerMark in array on first move', () => {
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const cells = document.querySelectorAll('.cell');
            cells[0].dispatchEvent(e);
            const sample = {
                rows: 3,
                columns: 3,
                needToWin: 3,
                board: [
                    ['1', 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            };
            chai.expect(game.getBoard()).to.be.deep.equal(sample);
        });
        it('should set playerMark in array after cellClick', () => {
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const cells = document.querySelectorAll('.cell');
            cells[0].dispatchEvent(e);
            cells[2].dispatchEvent(e);
            cells[5].dispatchEvent(e);
            cells[3].dispatchEvent(e);
            const sample = {
                rows: 3,
                columns: 3,
                needToWin: 3,
                board: [
                    ['1', 0, '2'],
                    ['2', 0, '1'],
                    [0, 0, 0]
                ]
            };
            chai.expect(game.getBoard()).to.be.deep.equal(sample);
        });
        it('shouldn`t set playerMark in array, if cell isn`t empty', () => {
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const cells = document.querySelectorAll('.cell');
            cells[0].dispatchEvent(e);
            cells[2].dispatchEvent(e);
            cells[5].dispatchEvent(e);
            cells[3].dispatchEvent(e);
            const sample = {
                rows: 3,
                columns: 3,
                needToWin: 3,
                board: [
                    ['1', 0, '2'],
                    ['2', 0, '1'],
                    [0, 0, 0]
                ]
            };
            cells[3].dispatchEvent(e);
            chai.expect(game.getBoard()).to.be.deep.equal(sample);
        });
        it('checkWinner for left player', () => {
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const cells = document.querySelectorAll('.cell');
            cells[0].dispatchEvent(e);
            cells[2].dispatchEvent(e);
            cells[4].dispatchEvent(e);
            cells[3].dispatchEvent(e);
            cells[8].dispatchEvent(e);
            chai.expect(game.checkWin('1')).to.be.true;
        });
        it('check draw for full board', () => {
            const e = new Event('click');
            document.querySelector('.setting__new-game').dispatchEvent(e);
            const cells = document.querySelectorAll('.cell');
            cells[0].dispatchEvent(e);
            cells[1].dispatchEvent(e);
            cells[2].dispatchEvent(e);
            cells[4].dispatchEvent(e);
            cells[3].dispatchEvent(e);
            cells[6].dispatchEvent(e);
            cells[5].dispatchEvent(e);
            cells[8].dispatchEvent(e);
            cells[7].dispatchEvent(e);
            const sample = {
                rows: 3,
                columns: 3,
                needToWin: 3,
                board: [
                    ['1', '2', '1'],
                    ['1', '2', '1'],
                    ['2', '1', '2']
                ]
            };
            chai.expect(game.checkWin('1')).to.be.equal('ничья');
        });
    });
});
