describe('cross-zero game', () => {
    before(waitIFrameLoad);

    [
        {
            moves: [],
            expectedFinal: ''
        },
        {
            moves: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]],
            expectedFinal: 'x'
        },
        {
            moves: [[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]],
            expectedFinal: 'x'
        },
        {
            moves: [[0, 0], [0, 1], [1, 1], [0, 2], [2, 2]],
            expectedFinal: 'x'
        },
        {
            moves: [[0, 0], [1, 0], [0, 1], [2, 0], [1, 1], [0, 2], [1, 2], [2, 1], [2, 2]],
            expectedFinal: 'x'
        },
        {
            moves: [[1, 0], [0, 0], [2, 0], [0, 1], [2, 1], [0, 2]],
            expectedFinal: 'o'
        },
        {
            moves: [[2, 1], [0, 0], [0, 1], [1, 0], [1, 2], [2, 0]],
            expectedFinal: 'o'
        },
        {
            moves: [[2, 1], [0, 0], [1, 0], [1, 1], [2, 0], [2, 2]],
            expectedFinal: 'o'
        },
        {
            moves: [[0, 0], [0, 2], [0, 1], [1, 0], [1, 2], [1, 1], [2, 0], [2, 1], [2, 2]],
            expectedFinal: 'draw'
        }
    ].forEach(testCase =>
        it(`Should ends with "${testCase.expectedFinal}" for field "${movesToFieldString(testCase.moves)}"`, () => {
            testCase.moves.forEach(move => clickTo(...move));

            const actual = getFinalStatus();

            chai.assert(
                testCase.expectedFinal === actual,
                `${JSON.stringify(testCase.expectedFinal)} !== ${JSON.stringify(actual)}`
            );
        })
    );

    afterEach(restart);
});
